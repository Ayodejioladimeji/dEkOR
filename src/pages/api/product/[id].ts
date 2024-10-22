import connectDB from "../utils/connectDB";
import Product from "../models/productModel";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getSingleProduct(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const getSingleProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    // Find product by ID
    const product = await Product.findOne({ _id: id, isActive: true }).select(
      "-buyingPrice"
    );
    if (!product) {
      return res.json({});
    }

    res.json(product);
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};
