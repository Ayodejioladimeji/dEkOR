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
    case "PUT":
      await updateUser(req, res);
      break;
    case "PATCH":
      await updateImage(req, res);
      break;
    case "GET":
      await fetchUser(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the user is authenticated and has an admin role
    const user = await auth(req, res);

    const { name } = req.body;

    await User.findOneAndUpdate({ _id: user?.id }, { name });

    res.json({ message: "Information saved successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Authenticate the user
    const loggedInUser = await auth(req, res);

    const user = await User.findById(loggedInUser.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth(req, res);

    const { avatar } = req.body;

    const response = await User.findOneAndUpdate({ _id: user?.id }, { avatar });

    res.json({ data: response, message: "Image uploaded successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
