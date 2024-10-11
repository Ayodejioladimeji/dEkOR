import connectDB from "../utils/connectDB";
import Order from "../models/orderModel";
import User from "../models/userModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await fetchOrders(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userAuth = await auth(req, res);

    const user = await User.findById(userAuth.id);

    const { products, totalAmount, shippingAddress } = req.body;

    // Validate order data
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    if (!totalAmount || !shippingAddress) {
      return res
        .status(400)
        .json({ message: "Total amount or shipping address is missing" });
    }

    //Initiate Paystack Payment
    const paymentData = {
      email: user.email,
      amount: totalAmount * 100,
      callback_url: `${process.env.NEXT_PUBLIC_REDIRECTION_URL}/checkout/payment`,
    };

    const paystackResponse = await axios.post(
      process.env.NEXT_PUBLIC_PAYSTACK_INITIALIZE_URL,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (paystackResponse.data.status !== true) {
      return res.status(400).json({ message: "Payment initialization failed" });
    }

    // Extract reference to use in payment verification
    const { reference, authorization_url } = paystackResponse.data.data;

    //Save the order in the database
    const newOrder = new Order({
      user: user._id,
      products,
      totalAmount,
      shippingAddress,
      paymentStatus: "pending",
      paymentReference: reference,
    });

    await newOrder.save();

    // Return Paystack authorization URL to the frontend
    res.status(200).json({
      message: "Order created successfully",
      paymentUrl: authorization_url,
      orderId: newOrder._id,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth(req, res);
    // Fetch only products where isActive is true
    const orders = await Order.find({ user: user.id }).sort("-updatedAt");
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
