import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import fetch from "node-fetch"; // ADICIONE ESTA LINHA
import { ordersRouter } from "./src/routes/orders.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRouter);

// Função para enviar e-mail via API BREVO
export async function sendEmail(to, subject, html, text = "") {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: "Gotas Douro",
          email: "wederfr@hotmail.com"
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
        textContent: text || " " // Texto vazio se não fornecido
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log("✅ E-mail enviado via Brevo API:", data.messageId);
      return true;
    } else {
      console.error("❌ Erro Brevo API:", data.message);
      return false;
    }
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err.message);
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