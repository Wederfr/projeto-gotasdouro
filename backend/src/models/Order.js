import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, default: null },
    name: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },

    deliveryAddress: {
      street: { type: String, required: true },
      number: { type: String, required: true },
      neighborhood: { type: String, required: true },
      city: { type: String, required: true },
      complement: { type: String, default: "" },
    },

    items: { type: [orderItemSchema], required: true },

    totals: {
      totalItems: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },

    payment: {
      method: { type: String, required: true }, // pix | mercadopago | creditcard
      status: { type: String, default: "pending" }, // pending | paid | failed
    },

    status: { type: String, default: "new" }, // new | preparing | out_for_delivery | delivered | canceled
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);