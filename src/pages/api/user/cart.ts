import connectDB from "../utils/connectDB";
import User from "../models/userModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PATCH":
      await addToCart(req, res);
      break;
    case "POST":
      await removeCartItem(req, res);
      break;
    case "GET":
      await fetchCart(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const addToCart = async (req, res) => {
  try {
    const userAuth = await auth(req, res);

    const user = await User.findById(userAuth.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { cartItems } = req.body;

    // Update user's cart in the database
    user.cart = [...cartItems];
    await user.save();

    res.json({ message: "Cart updated successfully", cart: user.cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchCart = async (req, res) => {
  try {
    // Authenticate the user
    const loggedInUser = await auth(req, res);

    // Fetch the user's cart
    const user = await User.findById(loggedInUser._id).select("cart");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userAuth = await auth(req, res);

    const user = await User.findById(userAuth.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Remove the item from the user's cart
    user.cart = user.cart.filter((item) => item._id !== productId);

    // Save the updated cart in the database
    await user.save();

    res.json({
      message: "Item removed from cart successfully",
      cart: user.cart,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
