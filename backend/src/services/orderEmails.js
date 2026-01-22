import { sendEmail } from "../../server.js"; // Era "../server.js" - agora correto

export async function sendOrderEmails(order) {
  try {
    console.log(`📧 Enviando e-mails para pedido ${order._id}`);

    // E-mail para o cliente
    const clientEmailSent = await sendEmail(
      order.customerEmail,
      `Pedido Confirmado - ${order.orderNumber}`,
      `
        <h1>Seu pedido foi confirmado!</h1>
        <p><strong>Número do pedido:</strong> ${order.orderNumber}</p>
        <p><strong>Data:</strong> ${new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
        <p><strong>Total:</strong> R$ ${(order.totalAmount || 0).toFixed(2)}</p>
        <p><strong>Forma de pagamento:</strong> ${order.paymentMethod}</p>
        <p><strong>Itens:</strong></p>
        <ul>
          ${order.items.map(item => `<li>${item.quantity}x ${item.name} - R$ ${(item.price || 0).toFixed(2)}</li>`).join('')}
        </ul>
        <p>Acompanhe seu pedido pelo WhatsApp: (11) 99999-9999</p>
        <p>Atenciosamente,<br>Equipe Gotas Douro</p>
      `,
      `Seu pedido ${order.orderNumber} foi confirmado. Total: R$ ${(order.totalAmount || 0).toFixed(2)}. Itens: ${order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}.`
    );

    // E-mail para o dono (você)
    const ownerEmailSent = await sendEmail(
      "wederfr@hotmail.com", // Seu e-mail
      `Novo Pedido - ${order.orderNumber}`,
      `
        <h1>Novo pedido recebido!</h1>
        <p><strong>Número:</strong> ${order.orderNumber}</p>
        <p><strong>Cliente:</strong> ${order.customerName}</p>
        <p><strong>E-mail:</strong> ${order.customerEmail}</p>
        <p><strong>Telefone:</strong> ${order.customerPhone}</p>
        <p><strong>Total:</strong> R$ ${(order.totalAmount || 0).toFixed(2)}</p>
        <p><strong>Itens:</strong></p>
        <ul>
          ${order.items.map(item => `<li>${item.quantity}x ${item.name} - R$ ${(item.price || 0).toFixed(2)}</li>`).join('')}
        </ul>
        <p><strong>Endereço:</strong> ${order.shippingAddress}</p>
        <p><strong>Observações:</strong> ${order.notes || 'Nenhuma'}</p>
      `,
      `Novo pedido ${order.orderNumber} de ${order.customerName}. Total: R$ ${(order.totalAmount || 0).toFixed(2)}.`
    );

    if (clientEmailSent && ownerEmailSent) {
      console.log(`✅ E-mails enviados para pedido ${order._id}`);
      return true;
    } else {
      console.error(`❌ Falha parcial no envio de e-mails para pedido ${order._id}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erro ao enviar e-mails para pedido ${order._id}:`, error.message);
    return false;
  }
}