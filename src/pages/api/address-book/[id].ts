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
    case "PUT":
      await updateAddress(req, res);
      break;
    case "PATCH":
      await updateDefault(req, res);
      break;
    case "DELETE":
      await deleteAddress(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const updateAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // add auth
    await auth(req, res);

    const { name, address, region, city, phone } = req.body;

    const { id } = req.query;

    await Address.findOneAndUpdate(
      { _id: id },
      {
        name,
        address,
        region,
        city,
        phone,
      }
    );

    res.json({ message: "Address updated successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateDefault = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth(req, res);

    const { id } = req.query;

    await Address.updateMany({ user: user.id }, { isDefault: false });

    // Then, set the selected address to `isDefault: true`
    await Address.findOneAndUpdate({ _id: id }, { isDefault: true });

    res.json({ message: "Default address updated successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // add auth
    await auth(req, res);

    const { id } = req.query;

    await Address.findByIdAndDelete(id);
    res.json({ message: "Address deleted successfully!" });
  } catch (error) {
    return res?.status(500).json({ message: error.message });
  }
};
