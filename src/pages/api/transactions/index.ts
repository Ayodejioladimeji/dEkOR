import connectDB from "../utils/connectDB";
import Transaction from "../models/transactionModel";
import auth from "../middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await fetchTransactions(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const fetchTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth(req, res);

    const transaction = await Transaction.find({ user: user.id }).sort(
      "-updatedAt"
    );
    res.json(transaction);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
