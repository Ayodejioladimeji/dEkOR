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
      await addToFavourite(req, res);
      break;
    case "POST":
      await removeFavouriteItem(req, res);
      break;
    case "GET":
      await fetchFavourite(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const addToFavourite = async (req, res) => {
  try {
    const userAuth = await auth(req, res);

    const user = await User.findById(userAuth.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { favItems } = req.body;

    // Update user's cart in the database
    user.favourite = [...favItems];
    await user.save();

    res.json({
      message: "Favourite updated successfully",
      favourite: user.favourite,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchFavourite = async (req, res) => {
  try {
    // Authenticate the user
    const loggedInUser = await auth(req, res);

    // Fetch the user's favourite
    const user = await User.findById(loggedInUser._id).select("favourite");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ favourite: user.favourite });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeFavouriteItem = async (req, res) => {
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
    user.favourite = user.favourite.filter((item) => item._id !== productId);

    // Save the updated cart in the database
    await user.save();

    res.json({
      message: "Item removed from favourite successfully",
      favourite: user.favourite,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
