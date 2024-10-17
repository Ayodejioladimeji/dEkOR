import connectDB from "../utils/connectDB";
import Category from "../models/categoryModel";
import auth from "../middleware/auth";

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

const fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort("-updatedAt");
    res.json(categories);
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};
