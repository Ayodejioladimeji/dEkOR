import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
    authorization: {
      type: Object,
      required: true,
    },
    paidAt: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Dataset =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);
export default Dataset;
