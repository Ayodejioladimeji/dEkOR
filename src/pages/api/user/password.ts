import connectDB from "../utils/connectDB";
import User from "../models/userModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      await updatePassword(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const updatePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the user is authenticated and has an admin role
    const loggedInUser = await auth(req, res);

    const user = await User.findById(loggedInUser.id);

    const { currentPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect current password." });

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await User.findOneAndUpdate({ _id: user?.id }, { password: passwordHash });

    res.json({ message: "Information saved successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
