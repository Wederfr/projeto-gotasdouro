import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { Resend } from "resend"; // Importamos o Resend
import { ordersRouter } from "./src/routes/orders.js";

const app = express();

// Inicializamos o Resend com a sua chave que está no Render
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRouter);

// Função universal para enviar e-mail que vamos usar em outros arquivos
// Agora aceita o parâmetro 'text' opcional (como você estava usando)
export async function sendEmail(to, subject, html, text = "") {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gotas Douro <onboarding@resend.dev>", // Remetente obrigatório do Resend
      to: [to], // Para quem vai o e-mail
      subject: subject,
      html: html,
      text: text, // Adicionamos o texto simples (opcional)
    });

    if (error) {
      console.error("Erro no Resend:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
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