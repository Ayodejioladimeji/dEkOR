import connectDB from "../../utils/connectDB";
import Product from "../../models/productModel";
import auth from "../../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await fetchProduct(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const fetchProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the user is authenticated and has an admin role
    const check = await auth(req, res);
    if (check?.role !== "admin")
      return res.status(401).json({ message: "Authentication is not valid" });

    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    // Fetch total count of active products
    const totalCount = await Product.countDocuments();

    // Fetch paginated products where isActive is true
    const products = await Product.find()
      .select("-buyingPrice")
      .sort("-updatedAt")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ products, totalCount, page, pageSize });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
