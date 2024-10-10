import connectDB from "../utils/connectDB";
import Order from "../models/orderModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await verifyPayment(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const verifyPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth(req, res); // authenticate user
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { reference } = req.query;

    // Verify payment with Paystack
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_PAYSTACK_VERIFY_URL}/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      // Find the order and update payment status
      const order = await Order.findOne({ paymentReference: reference });

      if (order) {
        order.paymentStatus = "paid";
        await order.save();
        res.status(200).json({ message: "Payment verified successfully" });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
