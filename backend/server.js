// Função para enviar e-mail via API BREVO (não SMTP)
export async function sendEmail(to, subject, html, text = "") {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: "Gotas Douro",
          email: "wederfr@hotmail.com"
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
        textContent: text || " " // CORREÇÃO: texto vazio se não tiver
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log("✅ E-mail enviado via Brevo API:", data.messageId);
      return true;
    } else {
      console.error("❌ Erro Brevo API:", data.message);
      return false;
    }
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err.message);
    return false;
  }
}