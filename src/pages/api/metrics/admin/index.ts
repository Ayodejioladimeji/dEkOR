import connectDB from "../../utils/connectDB";
import Order from "../../models/orderModel";
import Transaction from "../../models/transactionModel";
import Address from "../../models/addressModel";
import auth from "../../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getDashboardMetrics(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const getDashboardMetrics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await auth(req, res);

    // Fetch all orders for the user
    const allOrders = await Order.find();

    let totalOrders = 0;
    let pendingOrders = 0;
    let deliveredOrders = 0;

    // Loop through each order
    allOrders.forEach((order: any) => {
      totalOrders += order.products.length;
      order.products.forEach((product: { orderStatus: string }) => {
        if (product.orderStatus === "pending-delivery") {
          pendingOrders++;
        } else if (product.orderStatus === "delivered") {
          deliveredOrders++;
        }
      });
    });

    const userAddress = await Address.countDocuments();

    const pendingPayment = await Order.countDocuments({
      paymentStatus: "pending",
    });

    // Fetch user transactions count
    const transactions = await Transaction.countDocuments();

    // Response object
    const metrics = {
      totalOrders,
      pendingOrders,
      deliveredOrders,
      userAddress,
      transactions,
      pendingPayment,
    };

    // Return the metrics response
    res.status(200).json(metrics);
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};
