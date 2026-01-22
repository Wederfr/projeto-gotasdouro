// src/services/orderEmails.js
import { createTransport } from "./email.js";

function formatBRL(value) {
  const n = Number(value || 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatPaymentInfo(payment) {
  if (!payment) return "Não informado";
  
  const method = payment.method || "unknown";
  const status = payment.status || "pending";
  
  // Formatação específica para cada método
  switch (method) {
    case "dinheiro":
      const amountPaid = payment.amountPaid ? formatBRL(payment.amountPaid) : "Não informado";
      const change = payment.change ? formatBRL(payment.change) : "Sem troco";
      return `Dinheiro (${status}) - Valor pago: ${amountPaid} - Troco: ${change}`;
    
    case "cartao_credito":
      return `Cartão de Crédito (${status})`;
    
    case "cartao_debito":
      return `Cartão de Débito (${status})`;
    
    case "pix":
      return `PIX (${status})`;
    
    default:
      return `${method} (${status})`;
  }
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

  const paymentInfo = formatPaymentInfo(orderDoc.payment);

  // E-mail para o CLIENTE
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
Forma de pagamento: ${paymentInfo}

Obrigado pela sua compra!`;

  // E-mail para o DONO
  const textOwner =
`NOVO PEDIDO ✅

Pedido: ${orderId}
Cliente: ${orderDoc.customer.name}
E-mail: ${orderDoc.customer.email}
Telefone: ${orderDoc.customer.phone}
Endereço: ${addressText}

Itens:
${itemsText}

Total: ${formatBRL(orderDoc.totals?.totalPrice)}
Forma de pagamento: ${paymentInfo}
Status do pedido: ${orderDoc.status || "new"}

--- DETALHES DO PAGAMENTO ---
Método: ${orderDoc.payment?.method || "Não informado"}
Status: ${orderDoc.payment?.status || "pending"}
${orderDoc.payment?.method === "dinheiro" ? 
  `Valor pago: ${orderDoc.payment?.amountPaid ? formatBRL(orderDoc.payment.amountPaid) : "Não informado"}
Troco: ${orderDoc.payment?.change ? formatBRL(orderDoc.payment.change) : "Sem troco"}` : 
  ""}
${orderDoc.payment?.method === "cartao_credito" ? "Tipo: Cartão de Crédito" : ""}
${orderDoc.payment?.method === "cartao_debito" ? "Tipo: Cartão de Débito" : ""}`;

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