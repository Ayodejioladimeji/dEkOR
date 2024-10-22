import connectDB from "../utils/connectDB";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/generateToken";
import { LoginEmail } from "../mails/loginMail";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const login = async (req, res) => {
  try {
    // Ensure email and password are provided
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ err: "Please provide both email and password." });
    }

    // Check if the user exists
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "This user does not exist." });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password." });

    // Create tokens
    const token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    // Set refresh token in cookies (for security)
    res.setHeader("Set-Cookie", [
      `refresh_token=${refresh_token}; HttpOnly; Path=/api/auth/accessToken; Max-Age=604800;`,
    ]);

    LoginEmail(process.env.GMAIL_USER, user?.name);

    // Send response with user and access token
    res.json({
      message: "Login Success!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
        cart: user.cart,
        favourite: user.favourite,
      },
    });
  } catch (err) {
    // Catch server errors
    return res.status(500).json({ message: err.message });
  }
};
