import connectDB from "../utils/connectDB";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import valid from "../utils/valid";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const errMsg = valid(name, email, password);
    if (errMsg) return res.status(400).json({ message: errMsg });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ message: "This email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      name,
      email,
      password: passwordHash,
    });

    await newUser.save();
    res.json({ message: "Register Success!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
