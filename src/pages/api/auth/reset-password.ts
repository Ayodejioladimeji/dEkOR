import connectDB from "../utils/connectDB";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await resetpassword(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const resetpassword = async (req, res) => {
  try {
    const { activation_token, auth_code, password } = req.body;

    if (!activation_token) {
      return res
        .status(401)
        .json({ message: "You are not authorized to continue" });
    }

    // validate the activation token received
    const user = jwt.verify(
      activation_token,
      process.env.NEXT_PUBLIC_ACTIVATION_TOKEN_SECRET
    );

    const { id, code } = user;

    // Check the code provided by the user
    if (Number(auth_code) !== Number(code)) {
      return res.status(401).json({ message: "Invalid code" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.findOneAndUpdate(
      { _id: id },
      {
        password: passwordHash,
      },
      { new: true }
    );

    res.json({ message: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
