import connectDB from "../utils/connectDB";
import Category from "../models/categoryModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await fetchCategory(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = await Category.findOne({ name });
    if (category)
      return res.status(400).json({ err: "This category already exists." });

    // check if its the admin that is creating the category
    const check = await auth(req, res);
    if (check?.role === "user")
      return res.status(401).json({ message: "Authentication is not valid" });

    const newCategory = new Category({
      name,
      image,
    });

    await newCategory.save();
    res.json({ message: "Category created successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    // Fetch total count of active products
    const totalCount = await Category.countDocuments();

    const data = await Category.find()
      .sort("-updatedAt")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ data, totalCount, page, pageSize });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
