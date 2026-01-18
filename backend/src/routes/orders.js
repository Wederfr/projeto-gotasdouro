import express from "express";
import { Order } from "../models/Order.js";
import { sendOrderEmails } from "../services/orderEmails.js";

export const ordersRouter = express.Router();

ordersRouter.post("/", async (req, res) => {
  try {
    const payload = req.body;

    const created = await Order.create(payload);

    sendOrderEmails(created).catch((e) => {
  console.error("Falha ao enviar e-mails do pedido:", e.message);
});

    res.status(201).json({
      ok: true,
      orderId: created._id,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err.message,
    });
  }
});