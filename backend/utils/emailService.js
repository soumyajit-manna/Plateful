const EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";

const sendTemplateEmail = async (templateId, templateParams) => {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !publicKey || !privateKey || !templateId) {
    throw new Error("EmailJS configuration is incomplete");
  }

  const response = await fetch(EMAILJS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: templateParams,
    }),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`EmailJS request failed (${response.status}): ${responseText}`);
  }

  console.log("Email sent successfully via EmailJS");
};

const sendWelcomeEmail = (email, name) =>
  sendTemplateEmail(process.env.EMAILJS_WELCOME_TEMPLATE_ID, {
    to_email: email,
    user_name: name,
  });

const sendOrderEmail = (email, subject, message) =>
  sendTemplateEmail(process.env.EMAILJS_ORDER_TEMPLATE_ID, {
    to_email: email,
    subject,
    message,
  });

export { sendWelcomeEmail, sendOrderEmail };
