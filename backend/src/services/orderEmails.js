import { sendEmail } from "../../server.js";

export async function sendOrderEmails(orderDoc) {
  try {
    // Converter o documento do Mongoose para um objeto comum
    const order = orderDoc.toObject ? orderDoc.toObject() : orderDoc;

    console.log(`📧 Processando e-mails para pedido: ${order.orderNumber || order._id}`);
    
    // DEBUG: Mostrar todos os dados que chegam
    console.log("=== DADOS DO PEDIDO RECEBIDOS ===");
    console.log("ID:", order._id);
    console.log("orderNumber:", order.orderNumber);
    console.log("customerName:", order.customerName);
    console.log("customerEmail:", order.customerEmail);
    console.log("customerPhone:", order.customerPhone);
    console.log("totalAmount:", order.totalAmount);
    console.log("items:", order.items);
    console.log("shippingAddress:", order.shippingAddress);
    console.log("paymentMethod:", order.paymentMethod);
    console.log("notes:", order.notes);
    console.log("createdAt:", order.createdAt);
    console.log("=== FIM DEBUG ===");

    // Verificar se tem e-mail do cliente
    if (!order.customerEmail || order.customerEmail.trim() === '') {
      console.error("❌ E-mail do cliente está vazio! Não posso enviar e-mail para cliente.");
      // Só envia para o dono
      await sendEmail(
        "wederfr@hotmail.com",
        `NOVO PEDIDO - ${order.orderNumber || 'Gotas Douro'}`,
        `
          <h1>Novo pedido recebido!</h1>
          <p><strong>Cliente:</strong> ${order.customerName || 'Não informado'}</p>
          <p><strong>E-mail:</strong> ${order.customerEmail || 'Não informado'}</p>
          <p><strong>Telefone:</strong> ${order.customerPhone || 'Não informado'}</p>
          <p><strong>Total:</strong> R$ ${(order.totalAmount || 0).toFixed(2)}</p>
          <p><strong>Endereço:</strong> ${order.shippingAddress || 'Não informado'}</p>
          <p><strong>Itens:</strong></p>
          <ul>
            ${(order.items && order.items.length > 0) 
              ? order.items.map(item => `<li>${item.quantity}x ${item.name} - R$ ${(item.price || 0).toFixed(2)}</li>`).join('')
              : '<li>Nenhum item encontrado</li>'
            }
          </ul>
        `
      );
      return true;
    }

    // Formatação de itens para o e-mail
    const itensHtml = order.items && order.items.length > 0 
      ? order.items.map(item => `<li>${item.quantity}x ${item.name} - R$ ${(item.price || 0).toFixed(2)}</li>`).join('')
      : '<li>Nenhum item encontrado</li>';

    // 1. E-MAIL PARA O CLIENTE
    await sendEmail(
      order.customerEmail,
      `Pedido Confirmado - ${order.orderNumber || 'Gotas Douro'}`,
      `
        <h1>Olá, ${order.customerName || 'Cliente'}!</h1>
        <p>Seu pedido foi recebido com sucesso.</p>
        <p><strong>Número:</strong> ${order.orderNumber || 'N/A'}</p>
        <p><strong>Total:</strong> R$ ${(order.totalAmount || 0).toFixed(2)}</p>
        <p><strong>Itens:</strong></p>
        <ul>${itensHtml}</ul>
      `
    );

    // 2. E-MAIL PARA O DONO (VOCÊ)
    await sendEmail(
      "wederfr@hotmail.com",
      `NOVO PEDIDO - ${order.orderNumber || 'Gotas Douro'}`,
      `
        <h1>Novo pedido recebido!</h1>
        <p><strong>Cliente:</strong> ${order.customerName || 'Não informado'}</p>
        <p><strong>E-mail:</strong> ${order.customerEmail || 'Não informado'}</p>
        <p><strong>Telefone:</strong> ${order.customerPhone || 'Não informado'}</p>
        <p><strong>Total:</strong> R$ ${(order.totalAmount || 0).toFixed(2)}</p>
        <p><strong>Endereço:</strong> ${order.shippingAddress || 'Não informado'}</p>
        <p><strong>Itens:</strong></p>
        <ul>${itensHtml}</ul>
      `
    );

    return true;
  } catch (error) {
    console.error("Erro ao processar e-mails:", error);
    return false;
  }
}