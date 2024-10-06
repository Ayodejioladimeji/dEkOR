import connectDB from "../utils/connectDB";
import Address from "../models/addressModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await createAddress(req, res);
      break;
    case "GET":
      await fetchAddress(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const createAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the user is authenticated and has an admin role
    const check = await auth(req, res);
    if (check?.role !== "admin")
      return res.status(401).json({ message: "Authentication is not valid" });

    const { name, address, region, city, phone } = req.body;

    // check if the user already created an address
    const prevAddress = await Address.find().sort("-updatedAt");

    const newAddress = new Address({
      name,
      address,
      region,
      city,
      phone,
      isDefault: prevAddress?.length === 0 ? true : false,
    });

    await newAddress.save();
    res.json({ message: "Address added successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const address = await Address.find().sort("-updatedAt");
    res.json(address);
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};
