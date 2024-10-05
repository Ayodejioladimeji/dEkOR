import connectDB from "../utils/connectDB";
import Product from "../models/productModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await updateProduct(req, res);
      break;
    case "GET":
      await getSingleProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check if its the admin that is creating the category
    const check = await auth(req, res);
    if (check?.role === "user")
      return res.status(401).json({ message: "Authentication is not valid" });

    const { title, buyingPrice, sellingPrice, category, description } =
      req.body;
    const { id } = req.query;

    await Product.findOneAndUpdate(
      { _id: id },
      { title, buyingPrice, sellingPrice, category, description }
    );

    res.json({ message: "Product updated successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSingleProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    // Find product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // check if its the admin that is creating the category
    const check = await auth(req, res);
    if (check?.role === "user")
      return res.status(401).json({ message: "Authentication is not valid" });

    const { id } = req.query;

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};