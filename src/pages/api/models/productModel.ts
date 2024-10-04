import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    buyingPrice: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images:{
      type:Array,
      default:[]
    }
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;
