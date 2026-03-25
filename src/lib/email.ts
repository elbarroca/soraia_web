import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactNotification(data: ContactData) {
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!notificationEmail || !process.env.RESEND_API_KEY) {
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
