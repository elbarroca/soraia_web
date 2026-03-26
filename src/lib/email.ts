import { Resend } from "resend";

// Lazy-init: Resend throws at construction without an API key.
let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactNotification(data: ContactData) {
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
  const resend = getResend();
  if (!resend || !notificationEmail) {
    console.warn("Resend not configured — skipping email notification");
    return;
  }

  try {
    await resend.emails.send({
      from: "Soraia Oliveira Website <website@soraia-oliveira.com>",
      to: notificationEmail,
      subject: `New inquiry: ${data.subject || "General"}`,
      text: `From: ${data.name} (${data.email})\n\nSubject: ${data.subject}\n\n${data.message}`,
    });
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
  }
}
