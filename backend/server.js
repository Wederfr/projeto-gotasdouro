import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import fetch from "node-fetch";
import { ordersRouter } from "./src/routes/orders.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRouter);

// Função para enviar e-mail via API BREVO
export async function sendEmail(to, subject, html, text = "") {
  try {
    console.log("📨 DEBUG - Enviando e-mail para:", to);
    console.log("📨 DEBUG - text recebido:", text);
    
    const payload = {
      sender: {
        name: "Gotas Douro",
        email: "wederfr@hotmail.com"
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: html,
      textContent: text || " "
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
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
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado ao MongoDB");
    
    app.listen(PORT, () => {
      console.log(`✅ API rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar:", err);
    process.exit(1);
  }
}

start();