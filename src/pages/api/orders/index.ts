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
    case "PATCH":
      await completeOrder(req, res);
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

    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is missing" });
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

    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    // Fetch total count of active products
    const totalCount = await Order.countDocuments({ user: user.id });

    const data = await Order.find({ user: user.id })
      .sort("-updatedAt")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ data, totalCount, page, pageSize });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const completeOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userAuth = await auth(req, res);

    const user = await User.findById(userAuth.id);

    const { orderId } = req.body;

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Find the order by ID
    const existingOrder = await Order.findById(orderId);

    // Check if order exists
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the payment status is pending
    if (existingOrder.paymentStatus !== "pending") {
      return res
        .status(400)
        .json({ message: "Order has already been completed or canceled" });
    }

    const paymentData = {
      email: user.email,
      amount: existingOrder.totalAmount * 100,
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

    // Update the existing order with the new payment reference
    existingOrder.paymentReference = reference;
    await existingOrder.save();

    // Return Paystack authorization URL to the frontend
    res.status(200).json({
      message: "Payment re-initialized successfully",
      paymentUrl: authorization_url,
      orderId: existingOrder._id,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
