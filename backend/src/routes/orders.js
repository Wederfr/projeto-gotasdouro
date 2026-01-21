import express from "express";
import { Order } from "../models/Order.js";
import { sendOrderEmails } from "../services/orderEmails.js";

export const ordersRouter = express.Router();

// GET /api/orders - Listar todos os pedidos
ordersRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // mais recentes primeiro
    res.json({
      ok: true,
      data: orders,
      count: orders.length,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: "Erro ao buscar pedidos",
    });
  }
});

// GET /api/orders/:id - Buscar um pedido específico
ordersRouter.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        ok: false,
        error: "Pedido não encontrado",
      });
    }
    res.json({
      ok: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: "Erro ao buscar pedido",
    });
  }
});

// POST /api/orders - Criar novo pedido
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