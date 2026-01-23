import { sendEmail } from "../../server.js";

export async function sendOrderEmails(orderDoc) {
  try {
    // Converter o documento do Mongoose para um objeto comum
    const order = orderDoc.toObject ? orderDoc.toObject() : orderDoc;

    console.log(`📧 Processando e-mails para pedido: ${order._id}`);
    
    // MAPEAMENTO CORRETO DOS CAMPOS DO FRONTEND
    const orderData = {
      orderNumber: order.orderNumber || `PED-${order._id.toString().slice(-6).toUpperCase()}`,
      customerName: order.customer?.name || order.customerName || 'Cliente',
      customerEmail: order.customer?.email || order.customerEmail || '',
      customerPhone: order.customer?.phone || order.customerPhone || 'Não informado',
      totalAmount: order.totals?.totalPrice || order.totalAmount || (order.items ? order.items.reduce((total, item) => total + (item.subtotal || 0), 0) : 0),
      items: order.items || [],
      shippingAddress: order.deliveryAddress ? 
        `${order.deliveryAddress.street}, ${order.deliveryAddress.number || 'S/N'} - ${order.deliveryAddress.neighborhood}, ${order.deliveryAddress.city}${order.deliveryAddress.complement ? ` - ${order.deliveryAddress.complement}` : ''}` :
        order.shippingAddress || 'Não informado',
      paymentMethod: order.payment?.method || order.paymentMethod || 'Não informado',
      notes: order.notes || 'Nenhuma',
      createdAt: order.createdAt || new Date()
    };

    // DEBUG: Mostrar dados mapeados
    console.log("=== DADOS MAPEADOS ===");
    console.log("orderNumber:", orderData.orderNumber);
    console.log("customerName:", orderData.customerName);
    console.log("customerEmail:", orderData.customerEmail);
    console.log("totalAmount:", orderData.totalAmount);
    console.log("items count:", orderData.items.length);
    console.log("shippingAddress:", orderData.shippingAddress);
    console.log("=== FIM DEBUG ===");

    // TEMPORÁRIO: Aceitar e-mails vazios para teste
    const emailCliente = orderData.customerEmail || "wederfr@hotmail.com"; // TEMPORÁRIO

    // Formatação de itens para o e-mail
    const itensHtml = orderData.items.map(item => `<li>${item.quantity}x ${item.name} - R$ ${(item.unitPrice || 0).toFixed(2)}</li>`).join('');

    // 1. E-MAIL PARA O CLIENTE (TEMPORÁRIO)
    await sendEmail(
      emailCliente,
      `Pedido Confirmado - ${orderData.orderNumber}`,
      `
        <h1>Olá, ${orderData.customerName}!</h1>
        <p>Seu pedido foi recebido com sucesso.</p>
        <p><strong>Número:</strong> ${orderData.orderNumber}</p>
        <p><strong>Total:</strong> R$ ${orderData.totalAmount.toFixed(2)}</p>
        <p><strong>Itens:</strong></p>
        <ul>${itensHtml}</ul>
      `
    );

    // 2. E-MAIL PARA O DONO (VOCÊ)
    await sendEmail(
      "wederfr@hotmail.com",
      `NOVO PEDIDO - ${orderData.orderNumber}`,
      `
        <h1>Novo pedido recebido!</h1>
        <p><strong>Cliente:</strong> ${orderData.customerName}</p>
        <p><strong>E-mail:</strong> ${orderData.customerEmail || 'NÃO INFORMADO'}</p>
        <p><strong>Telefone:</strong> ${orderData.customerPhone}</p>
        <p><strong>Total:</strong> R$ ${orderData.totalAmount.toFixed(2)}</p>
        <p><strong>Endereço:</strong> ${orderData.shippingAddress}</p>
        <p><strong>Forma de pagamento:</strong> ${orderData.paymentMethod}</p>
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