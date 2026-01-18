import { createTransport } from "./email.js";

function formatBRL(value) {
  const n = Number(value || 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export async function sendOrderEmails(orderDoc) {
  const transporter = createTransport();

  const fromName = process.env.EMAIL_FROM_NAME || "Loja";
  const fromAddress = process.env.EMAIL_FROM_ADDRESS;
  const ownerEmail = process.env.SHOP_OWNER_EMAIL;

  if (!fromAddress) throw new Error("EMAIL_FROM_ADDRESS não definido no .env");
  if (!ownerEmail) throw new Error("SHOP_OWNER_EMAIL não definido no .env");

  const orderId = String(orderDoc._id);
  const createdAt = orderDoc.createdAt ? new Date(orderDoc.createdAt) : new Date();

  const itemsText = (orderDoc.items || [])
    .map((i) => `- ${i.quantity}x ${i.name} (${formatBRL(i.unitPrice)}) = ${formatBRL(i.subtotal)}`)
    .join("\n");

  const addressText =
    `${orderDoc.deliveryAddress.street}, ${orderDoc.deliveryAddress.number} - ` +
    `${orderDoc.deliveryAddress.neighborhood} - ${orderDoc.deliveryAddress.city}` +
    (orderDoc.deliveryAddress.complement ? ` (${orderDoc.deliveryAddress.complement})` : "");

  const subjectClient = "Confirmação do seu pedido";

  const textClient =
`Olá, ${orderDoc.customer.name}!

Recebemos seu pedido ✅

Pedido: ${orderId}
Data: ${createdAt.toLocaleString("pt-BR")}
Endereço: ${addressText}

Itens:
${itemsText}

Total: ${formatBRL(orderDoc.totals?.totalPrice)}

Obrigado!`;

  const textOwner =
`NOVO PEDIDO ✅

Pedido: ${orderId}
Cliente: ${orderDoc.customer.name} - ${orderDoc.customer.email} - ${orderDoc.customer.phone}
Endereço: ${addressText}

Itens:
${itemsText}

Total: ${formatBRL(orderDoc.totals?.totalPrice)}
Pagamento: ${orderDoc.payment?.method} (${orderDoc.payment?.status || "pending"})
Status: ${orderDoc.status || "new"}`;

  // 1) Envia para o cliente
  console.log("📧 Enviando e-mail para cliente:", orderDoc.customer?.email);
  await transporter.sendMail({
    from: `${fromName} <${fromAddress}>`,
    to: orderDoc.customer.email,
    subject: subjectClient,
    text: textClient,
  });
  console.log("✅ E-mail do cliente enviado");

  // 2) Envia para o dono
  console.log("📧 Enviando e-mail para dono:", ownerEmail);
  await transporter.sendMail({
    from: `${fromName} <${fromAddress}>`,
    to: ownerEmail,
    subject: `NOVO PEDIDO - ${orderId}`,
    text: textOwner,
  });
  console.log("✅ E-mail do dono enviado");

  return true;
}