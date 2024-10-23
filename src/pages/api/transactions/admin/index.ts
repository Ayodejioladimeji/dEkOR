import connectDB from "../../utils/connectDB";
import Transaction from "../../models/transactionModel";
import auth from "../../middleware/auth";
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
    if (user?.role !== "admin") {
      return res.status(401).json({ message: "Authentication is not valid" });
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    const totalCount = await Transaction.countDocuments();

    const data = await Transaction.find()
      .sort("-updatedAt")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ data, totalCount, page, pageSize });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
