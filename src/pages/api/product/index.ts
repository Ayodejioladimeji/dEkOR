import connectDB from "../utils/connectDB";
import Product from "../models/productModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await createProduct(req, res);
      break;
    case "GET":
      // Choose the appropriate handler based on the presence of `categoryId`
      if (req.query.categoryId) {
        await fetchSimilarProduct(req, res);
      } else {
        await fetchProduct(req, res);
      }
      break;
    case "PATCH":
      await addProductImages(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the user is authenticated and has an admin role
    const check = await auth(req, res);
    if (check?.role !== "admin")
      return res.status(401).json({ message: "Authentication is not valid" });

    const { title, buyingPrice, sellingPrice, category, description } =
      req.body;

    const product = await Product.findOne({ title });
    if (product)
      return res.status(400).json({ err: "This product already exists." });

    const newProduct = new Product({
      title,
      buyingPrice,
      category,
      sellingPrice,
      description,
    });

    await newProduct.save();
    res.json({ message: "Product added successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch only products where isActive is true
    const products = await Product.find({ isActive: true })
      .select("-buyingPrice")
      .sort("-updatedAt");
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addProductImages = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the user has an admin role
    const check = await auth(req, res);
    if (check?.role !== "admin")
      return res.status(401).json({ message: "Authentication is not valid" });

    const { productId, images } = req.body;

    // Ensure images array is provided
    if (!Array.isArray(images) || images.length === 0)
      return res.status(400).json({ message: "Images array is required" });

    // Find the product and update its images
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.images = images;
    await product.save();

    res.json({ message: "Images updated successfully!", product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchSimilarProduct = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const products = await Product.find({
      category: categoryId,
      isActive: true,
    }).sort("-updatedAt");

    if (products.length === 0) {
      return res.json([]);
    }

    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
