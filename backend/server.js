// Função para enviar e-mail via API BREVO
export async function sendEmail(to, subject, html, text = "") {
  try {
    console.log("📨 DEBUG - Enviando e-mail para:", to);
    console.log("📨 DEBUG - text recebido:", text);
    console.log("📨 DEBUG - text é string?", typeof text);
    
    const payload = {
      sender: {
        name: "Gotas Douro",
        email: "wederfr@hotmail.com"
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: html,
      textContent: text || " " // Garantir que não seja undefined
    };

    console.log("📨 DEBUG - Payload completo:", JSON.stringify(payload));

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
      console.error("❌ Resposta completa:", data);
      return false;
    }
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err.message);
    return false;
  }
}