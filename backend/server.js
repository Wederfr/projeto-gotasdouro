import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { Resend } from "resend";
import { ordersRouter } from "./src/routes/orders.js";
import { emailTestRouter } from "./src/routes/emailTest.js";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRouter);
app.use("/api/email-test", emailTestRouter);

// Função para enviar e-mails via Resend
export async function sendEmail(to, subject, html, text = "") {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gotas Douro <onboarding@resend.dev>", // Mude para seu domínio depois
      to: [to],
      subject: subject,
      html: html,
      text: text
    });

    if (error) {
      console.error("❌ Erro Resend:", error);
      return false;
    }

    console.log("✅ E-mail enviado via Resend:", data.id);
    return true;
  } catch (error) {
    console.error("❌ Erro Resend:", error);
    return false;
  }
}

app.get("/health", async (req, res) => {
  const mongoState = mongoose.connection.readyState; // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  res.json({
    ok: true,
    service: "backend",
    mongo: mongoState === 1 ? "connected" : `state_${mongoState}`,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3001;

async function start() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI não definido no .env");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
}

start().catch((err) => {
  console.error("Falha ao iniciar a API:", err.message);
  process.exit(1);
});