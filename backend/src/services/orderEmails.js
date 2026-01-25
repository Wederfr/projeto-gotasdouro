import { sendEmail } from "../../server.js";

export async function sendOrderEmails(orderDoc) {
  try {
    const order = orderDoc.toObject ? orderDoc.toObject() : orderDoc;

    console.log(`📧 Enviando e-mails para pedido: ${order._id}`);
    
    // Dados do pedido
    const orderData = {
      orderNumber: order.orderNumber || `PED-${order._id.toString().slice(-6).toUpperCase()}`,
      customerName: order.customer?.name || 'Cliente',
      customerEmail: order.customer?.email || '',
      customerPhone: order.customer?.phone || 'Não informado',
      totalAmount: order.totals?.totalPrice || 0,
      items: order.items || [],
      shippingAddress: order.deliveryAddress ? 
        `${order.deliveryAddress.street}, ${order.deliveryAddress.number || 'S/N'} - ${order.deliveryAddress.neighborhood}, ${order.deliveryAddress.city}` :
        'Não informado',
      paymentMethod: order.payment?.method || 'Não informado',
      amountPaid: order.payment?.amountPaid || null,
      change: order.payment?.change || null
    };

    // E-mail para o CLIENTE
    let clientHtml = `
      <h1>Olá, ${orderData.customerName}!</h1>
      <p>Seu pedido foi recebido com sucesso.</p>
      <p><strong>Número:</strong> ${orderData.orderNumber}</p>
      <p><strong>Total:</strong> R$ ${orderData.totalAmount.toFixed(2)}</p>
      <p><strong>Forma de pagamento:</strong> ${orderData.paymentMethod}</p>
    `;

    if (orderData.amountPaid) {
      clientHtml += `<p><strong>Valor pago:</strong> R$ ${orderData.amountPaid.toFixed(2)}</p>`;
    }
    if (orderData.change && orderData.change > 0) {
      clientHtml += `<p><strong>Troco:</strong> R$ ${orderData.change.toFixed(2)}</p>`;
    }

    clientHtml += `
      <p><strong>Itens:</strong></p>
      <ul>
        ${orderData.items.map(item => `<li>${item.quantity}x ${item.name} - R$ ${(item.unitPrice || 0).toFixed(2)}</li>`).join('')}
      </ul>
      <p><strong>Endereço:</strong> ${orderData.shippingAddress}</p>
      <p>Atenciosamente,<br>Equipe Gotas Douro</p>
    `;

    // Texto simples para o cliente
    const clientText = `Olá ${orderData.customerName}! Seu pedido ${orderData.orderNumber} foi recebido. Total: R$ ${orderData.totalAmount.toFixed(2)}. Forma de pagamento: ${orderData.paymentMethod}. Itens: ${orderData.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}`;

    // E-mail para VOCÊ (DONO)
    let ownerHtml = `
      <h1>Novo pedido recebido!</h1>
      <p><strong>Cliente:</strong> ${orderData.customerName}</p>
      <p><strong>E-mail:</strong> ${orderData.customerEmail}</p>
      <p><strong>Telefone:</strong> ${orderData.customerPhone}</p>
      <p><strong>Total:</strong> R$ ${orderData.totalAmount.toFixed(2)}</p>
      <p><strong>Forma de pagamento:</strong> ${orderData.paymentMethod}</p>
    `;

    if (orderData.amountPaid) {
      ownerHtml += `<p><strong>Valor pago:</strong> R$ ${orderData.amountPaid.toFixed(2)}</p>`;
    }
    if (orderData.change && orderData.change > 0) {
      ownerHtml += `<p><strong>Troco:</strong> R$ ${orderData.change.toFixed(2)}</p>`;
    }

    ownerHtml += `
      <p><strong>Endereço:</strong> ${orderData.shippingAddress}</p>
      <p><strong>Itens:</strong></p>
      <ul>
        ${orderData.items.map(item => `<li>${item.quantity}x ${item.name} - R$ ${(item.unitPrice || 0).toFixed(2)}</li>`).join('')}
      </ul>
    `;

    // Texto simples para você
    const ownerText = `Novo pedido de ${orderData.customerName} (${orderData.customerEmail}). Total: R$ ${orderData.totalAmount.toFixed(2)}. Pagamento: ${orderData.paymentMethod}. Itens: ${orderData.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}`;

    // Enviar e-mails COM TEXTO SIMPLES
    const clientSent = await sendEmail(
      orderData.customerEmail,
      `Pedido Confirmado - ${orderData.orderNumber}`,
      clientHtml,
      clientText // ADICIONADO
    );

    const ownerSent = await sendEmail(
      "wederfr@hotmail.com",
      `NOVO PEDIDO - ${orderData.orderNumber}`,
      ownerHtml,
      ownerText // ADICIONADO
    );

    return clientSent && ownerSent;
  } catch (error) {
    console.error("Erro ao enviar e-mails:", error);
    return false;
  }
}