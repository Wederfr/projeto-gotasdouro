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
      method: { 
        type: String, 
        required: true, 
        enum: ["dinheiro", "cartao_credito", "cartao_debito", "pix"] 
      },
      status: { 
        type: String, 
        default: "pending", 
        enum: ["pending", "paid", "failed"] 
      },
      amountPaid: { type: Number }, 
      change: { type: Number }, 
      installments: { type: Number, default: 1 }, 
    },

    status: { 
      type: String, 
      default: "new", 
      enum: ["new", "preparing", "out_for_delivery", "delivered", "canceled"] 
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);