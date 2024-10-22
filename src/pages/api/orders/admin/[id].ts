import connectDB from "../../utils/connectDB";
import Order from "../../models/orderModel";
import User from "../../models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../middleware/auth";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PATCH":
      await deliverOrder(req, res);
      break;
    case "GET":
      await getSingleOrder(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const deliverOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the admin is making the request
    const check = await auth(req, res);
    if (check?.role !== "admin") {
      return res.status(401).json({ message: "Authentication is not valid" });
    }

    const { id, productId } = req.query;

    // Find the order and the product
    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the product in the order
    const productIndex = order.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in the order" });
    }

    // Update the orderStatus of the found product to 'delivered'
    order.products[productIndex].orderStatus = "delivered";

    // Save the updated order
    await order.save();

    res.json({ message: "Order product delivered successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSingleOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth(req, res);
    if (user?.role !== "admin") {
      return res.status(401).json({ message: "Authentication is not valid" });
    }

    const { id, productId } = req.query;

    // Find order by ID
    const order = await Order.findOne({ _id: id });
    const orderUser = await User.findById({ _id: order.user });

    if (!order) {
      return res.json({});
    }
    const product = order.products.find((p) => p._id.toString() === productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found in the order" });
    }

    const userData = {
      name: orderUser?.name,
      email: orderUser?.email,
      avatar: orderUser?.avatar,
    };

    const data = {
      product,
      shippingAddress: order?.shippingAddress,
      totalAmount: order?.totalAmount,
      paymentStatus: order?.paymentStatus,
      paymentMethod: order?.paymentMethod,
      paymentReference: order?.paymentReference,
      orderDate: order?.createdAt,
      orderCount: order?.products?.length,
      user: userData,
    };

    return res.json(data);
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};
