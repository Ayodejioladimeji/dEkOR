import connectDB from "../utils/connectDB";
import Category from "../models/categoryModel";
import bcrypt from "bcrypt";
import valid from "../utils/valid";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const createCategory = async (req, res) => {
  try {
    const { name, image, } = req.body;

    const category = await Category.findOne({ name });
    if (category)
      return res.status(400).json({ err: "This email already exists." });

    const newCategory = new Category({
      name,
      image,
    });

    await newCategory.save();
    res.json({ message: "Category created successfully!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
