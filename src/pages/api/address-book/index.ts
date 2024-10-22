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
    // Authenticate user
    const user = await auth(req, res);

    if (!user) {
      return res.status(401).json({ message: "Authentication is not valid" });
    }

    const { name, address, region, city, phone } = req.body;

    // Check if the user already has an address
    const prevAddresses = await Address.find({ user: user.id }).sort(
      "-updatedAt"
    );

    // Create new address and set isDefault to true if it's the first address
    const newAddress = new Address({
      user: user.id,
      name,
      address,
      region,
      city,
      phone,
      isDefault: prevAddresses.length === 0 ? true : false,
    });

    await newAddress.save();
    res.json({ message: "Address added successfully!", address: newAddress });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const fetchAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Authenticate the user
    const user = await auth(req, res);

    if (!user) {
      return res.status(401).json({ message: "Authentication is not valid" });
    }

    // Fetch addresses specific to the logged-in user
    const addresses = await Address.find({ user: user.id }).sort("-createdAt");

    // Return the user's addresses
    res.json(addresses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
