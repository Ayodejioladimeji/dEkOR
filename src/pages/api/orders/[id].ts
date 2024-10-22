import connectDB from "../utils/connectDB";
import Order from "../models/orderModel";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "../middleware/auth";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getSingleOrder(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const getSingleOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth(req, res);

    const { id, productId } = req.query;

    // Find order by ID
    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res.json({});
    }

    const product = order.products.find((p) => p._id.toString() === productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found in the order" });
    }

    const data = {
      product,
      shippingAddress: order?.shippingAddress,
      totalAmount: order?.totalAmount,
      paymentStatus: order?.paymentStatus,
      paymentMethod: order?.paymentMethod,
      paymentReference: order?.paymentReference,
      orderDate: order?.createdAt,
    };

    return res.json(data);
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};
