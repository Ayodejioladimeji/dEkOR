import connectDB from "../utils/connectDB";
import Product from "../models/productModel";
import auth from "../middleware/auth";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createProduct(req, res);
      break;
    case "GET":
      await fetchProduct(req, res);
      break;
    case "PATCH":
      await addProductImages(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const createProduct = async (req, res) => {
  try {

    // check if its the admin that is creating the category
    const check = await auth(req, res);
    if (check?.role === "user")
      return res.status(401).json({ message: "Authentication is not valid" });
    const { title, buyingPrice, sellingPrice, category, description } = req.body;

    const product = await Product.findOne({ title });
    if (product)
      return res.status(400).json({ err: "This product already exists." });

    const newProduct = new Product({ title, buyingPrice, category, sellingPrice, description });

    await newProduct.save();
    res.json({ message: "Product added successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchProduct = async (req, res) => {
  try {
    const products = await Product.find().sort("-updatedAt");
    res.json(products);
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};


// New endpoint to handle adding images to a product
const addProductImages = async (req, res) => {
  try {
    // Check for admin role
    const check = await auth(req, res);
    if (check?.role !== "admin")
      return res.status(401).json({ message: "Authentication is not valid" });

    const { productId, images } = req.body;

    // Ensure images array is provided
    if (!Array.isArray(images) || images.length === 0)
      return res.status(400).json({ message: "Images array is required" });

    // Find the product and update its images
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.images = [...product.images, ...images];
    await product.save();

    res.json({ message: "Images added successfully!", product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};