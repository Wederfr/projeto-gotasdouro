import nodemailer from "nodemailer";

export function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP não configurado no .env (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS).");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });
}

export async function sendTestEmail() {
  const transporter = createTransport();

  const fromName = process.env.EMAIL_FROM_NAME || "Loja";
  const fromAddress = process.env.EMAIL_FROM_ADDRESS;
  const to = process.env.SHOP_OWNER_EMAIL;

  if (!fromAddress) throw new Error("EMAIL_FROM_ADDRESS não definido no .env");
  if (!to) throw new Error("SHOP_OWNER_EMAIL não definido no .env");

  await transporter.sendMail({
    from: `${fromName} <${fromAddress}>`,
    to,
    subject: "Confirmação do seu pedido",
    text: "Teste de e-mail do backend (Brevo SMTP) ✅",
  });

  return true;
}