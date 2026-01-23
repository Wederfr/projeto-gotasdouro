import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import nodemailer from "nodemailer"; // VOLTAR AO NODEMAILER
import { ordersRouter } from "./src/routes/orders.js";

const app = express();

// CONFIGURAÇÃO DO BREVO
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRouter);

// Função para enviar e-mail com BREVO
export async function sendEmail(to, subject, html, text = "") {
  try {
    const info = await transporter.sendMail({
      from: '"Gotas Douro" <wederfr@hotmail.com>',
      to: to,
      subject: subject,
      html: html,
      text: text
    });
    
    console.log("✅ E-mail enviado via Brevo:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Erro Brevo:", err.message);
    return false;
  }
}

app.get("/health", async (req, res) => {
  const mongoState = mongoose.connection.readyState;
  res.json({ ok: true, mongo: mongoState === 1 ? "connected" : "error" });
});

const PORT = process.env.PORT || 3001;

async function start() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
}

start().catch(err => console.error(err));