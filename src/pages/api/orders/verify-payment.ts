import connectDB from "../utils/connectDB";
import Order from "../models/orderModel";
import Transaction from "../models/transactionModel";
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
    const user = await auth(req, res);
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
        user: user.id,
        amount: response?.data?.data?.amount / 100,
        status: response?.data?.data?.status,
        reference: response?.data?.data?.reference,
        channel: response?.data?.data?.channel,
        authorization: response?.data?.data?.authorization,
        paidAt: response?.data?.data?.paidAt,
      });

      newTransaction.save();

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

// const verifyPayment = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { reference } = req.query;

//     if (!reference) {
//       return res.status(400).json({ message: "Transaction reference is required" });
//     }

//     // Log the reference and Paystack URL for debugging
//     console.log("Transaction reference:", reference);
//     console.log("Paystack Verify URL:", `${process.env.NEXT_PUBLIC_PAYSTACK_VERIFY_URL}/${reference}`);

//     // Verify payment with Paystack
//     const response = await axios.get(
//       `https://api.paystack.co/transaction/verify/${reference}`, // Directly using the correct Paystack URL
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`, // Ensure this secret key is correct
//         },
//       }
//     );

//     console.log("Paystack Response:", response.data); // Log the full response for debugging

//     if (response.data?.data?.status === "success") {
//       // Find the order and update payment status
//       const order = await Order.findOne({ paymentReference: reference });

//       if (order) {
//         order.paymentStatus = "paid";
//         await order.save();
//         return res.status(200).json({ message: "Payment verified successfully" });
//       } else {
//         return res.status(404).json({ message: "Order not found" });
//       }
//     } else {
//       return res.status(400).json({ message: "Payment verification failed" });
//     }
//   } catch (error) {
//     console.error("Error during payment verification:", error.message);
//     return res.status(500).json({ message: error.message });
//   }
// };