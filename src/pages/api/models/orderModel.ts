import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        title: {
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
        images: {
          type: Array,
          default: [],
        },
        orderStatus: {
          type: String,
          default: "pending-delivery",
        },
        selectedColor: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentReference: String,
    paymentMethod: {
      type: String,
      default: "Paystack",
    },
    shippingAddress: {
      name: String,
      address: String,
      city: String,
      region: String,
      phone: String,
      isDefault: Boolean,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
