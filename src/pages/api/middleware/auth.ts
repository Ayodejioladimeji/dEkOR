import jwt from "jsonwebtoken";
import Users from "../models/userModel";

const auth = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) return res.status(400).json({ err: "Invalid Authentication." });

  const decoded = jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
  );
  if (!decoded) return res.status(400).json({ err: "Invalid Authentication." });

  const user = await Users.findOne({ _id: decoded.id });

  return { id: user._id, role: user.role, root: user.root };
};

export default auth;
