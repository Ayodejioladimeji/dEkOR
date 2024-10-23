import connectDB from "../utils/connectDB";
import Order from "../models/orderModel";
import User from "../models/userModel";
import Transaction from "../models/transactionModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NewOrderEmail } from "../mails/NewOrderMail";
import { UserNewOrderEmail } from "../mails/UserNewOrderMail";
import moment from "moment";

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
    const userAuth = await auth(req, res);

    const user = await User.findById(userAuth.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { reference } = req.query;

    // Verify payment with Paystack
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_PAYSTACK_VERIFY_URL}/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      // Find the order and update payment status
      const order = await Order.findOne({ paymentReference: reference });
      const transact = await Transaction.findOne({ reference: reference });

      if (transact?.status === "success") {
        return res
          .status(400)
          .json({ message: "Payment has already been processed." });
      }

      // save transactions
      const newTransaction = new Transaction({
        user: user._id,
        amount: response?.data?.data?.amount / 100,
        status: response?.data?.data?.status,
        reference: response?.data?.data?.reference,
        channel: response?.data?.data?.channel,
        authorization: response?.data?.data?.authorization,
        paidAt: response?.data?.data?.paidAt,
      });

      newTransaction.save();

      const { status, amount, paidAt } = response.data.data;

      NewOrderEmail({
        email: process.env.GMAIL_USER,
        name: user?.name,
        orderId: response?.data?.data?.reference,
        orderDate: moment(paidAt).format("lll"),
        orderAmount: Number(amount) / 100,
        status,
      });

      UserNewOrderEmail({
        email: user?.email,
        name: user?.name,
        orderId: response?.data?.data?.reference,
        orderDate: moment(paidAt).format("lll"),
        orderAmount: Number(amount) / 100,
        status,
      });

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
