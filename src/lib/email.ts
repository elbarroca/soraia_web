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

const FROM = "Soraia Oliveira <website@soraia-oliveira.com>";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://soraia-oliveira.com";

// ─── Shared email layout ───

function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fafaf9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a1a1a">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf9;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e8e5e1">
        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #e8e5e1">
            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a8580">Soraia Oliveira</p>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="padding:32px 40px">${content}</td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px 32px;border-top:1px solid #e8e5e1">
            <p style="margin:0 0 8px;font-size:12px;color:#8a8580">
              <a href="${BASE_URL}" style="color:#8a8580;text-decoration:none">soraia-oliveira.com</a>
              &nbsp;&middot;&nbsp;
              <a href="https://www.instagram.com/soraianoliveira/" style="color:#8a8580;text-decoration:none">Instagram</a>
            </p>
            <p style="margin:0;font-size:11px;color:#b0aca7">Guimarães, Portugal</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Contact Form Notification ───

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
      from: FROM,
      to: notificationEmail,
      subject: `New inquiry: ${data.subject || "General"}`,
      html: emailLayout(`
        <h2 style="margin:0 0 16px;font-size:20px;font-weight:500">New Contact Message</h2>
        <table style="width:100%;font-size:14px;line-height:1.6" cellpadding="0" cellspacing="0">
          <tr><td style="padding:4px 0;color:#8a8580;width:80px">From</td><td>${data.name}</td></tr>
          <tr><td style="padding:4px 0;color:#8a8580">Email</td><td><a href="mailto:${data.email}" style="color:#1a1a1a">${data.email}</a></td></tr>
          <tr><td style="padding:4px 0;color:#8a8580">Subject</td><td>${data.subject || "General"}</td></tr>
        </table>
        <div style="margin:20px 0;padding:16px;background:#fafaf9;border-radius:6px;font-size:14px;line-height:1.7;white-space:pre-wrap">${data.message}</div>
        <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || "Your inquiry")}" style="display:inline-block;padding:10px 24px;background:#1a1a1a;color:#ffffff;font-size:13px;font-weight:500;text-decoration:none;border-radius:6px">Reply to ${data.name}</a>
      `),
    });
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
  }
}

// ─── Newsletter Subscriber Notification (to Soraia) ───

export async function sendNewSubscriberNotification(email: string) {
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
  const resend = getResend();
  if (!resend || !notificationEmail) return;

  try {
    await resend.emails.send({
      from: FROM,
      to: notificationEmail,
      subject: `New newsletter subscriber: ${email}`,
      html: emailLayout(`
        <h2 style="margin:0 0 16px;font-size:20px;font-weight:500">New Subscriber</h2>
        <p style="margin:0;font-size:15px;line-height:1.6"><strong>${email}</strong> just subscribed to your newsletter.</p>
        <div style="margin:20px 0 0">
          <a href="${BASE_URL}/admin/newsletter" style="display:inline-block;padding:10px 24px;background:#1a1a1a;color:#ffffff;font-size:13px;font-weight:500;text-decoration:none;border-radius:6px">View Subscribers</a>
        </div>
      `),
    });
  } catch (error) {
    console.error("Failed to send subscriber notification:", error);
  }
}

// ─── Order Confirmation (to customer) ───

type OrderEmailData = {
  customerName: string;
  customerEmail: string;
  artworkTitle: string;
  artworkSlug: string | null;
  artworkImageUrl: string | null;
  amount: string;
  currency: string;
  shippingName?: string;
  shippingCity?: string;
  shippingCountry?: string;
};

function formatAmountForEmail(amount: string, currency: string): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return `${currency} ${amount}`;
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: currency || "EUR",
  }).format(num);
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  const resend = getResend();
  if (!resend) return;

  const formatted = formatAmountForEmail(data.amount, data.currency);
  const artworkUrl = data.artworkSlug ? `${BASE_URL}/artworks/${data.artworkSlug}` : BASE_URL;
  const imageHtml = data.artworkImageUrl
    ? `<img src="${data.artworkImageUrl.startsWith("http") ? data.artworkImageUrl : BASE_URL + data.artworkImageUrl}" alt="${data.artworkTitle}" style="width:100%;max-width:400px;border-radius:6px;margin-bottom:20px" />`
    : "";

  const shippingHtml = data.shippingCity
    ? `<p style="margin:12px 0 0;font-size:13px;color:#8a8580">Shipping to: ${[data.shippingName, data.shippingCity, data.shippingCountry].filter(Boolean).join(", ")}</p>`
    : "";

  try {
    await resend.emails.send({
      from: FROM,
      to: data.customerEmail,
      subject: `Thank you for your purchase — ${data.artworkTitle}`,
      html: emailLayout(`
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:500">Thank you, ${data.customerName.split(" ")[0]}.</h2>
        <p style="margin:0 0 24px;font-size:15px;color:#5a5550;line-height:1.6">
          Your artwork is being carefully prepared. I'm grateful you chose to bring this piece into your life.
        </p>
        ${imageHtml}
        <table style="width:100%;font-size:14px;line-height:1.8;border-collapse:collapse" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0eeeb;color:#8a8580;width:100px">Artwork</td>
            <td style="padding:8px 0;border-bottom:1px solid #f0eeeb;font-weight:500">
              <a href="${artworkUrl}" style="color:#1a1a1a;text-decoration:none">${data.artworkTitle}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0eeeb;color:#8a8580">Total</td>
            <td style="padding:8px 0;border-bottom:1px solid #f0eeeb;font-weight:500">${formatted}</td>
          </tr>
        </table>
        ${shippingHtml}
        <div style="margin:28px 0 0;padding:20px;background:#fafaf9;border-radius:6px">
          <p style="margin:0;font-size:13px;color:#5a5550;line-height:1.6">
            I'll personally handle the packaging and shipping of your piece. You'll receive a tracking number once it's on its way.
            If you have any questions, simply reply to this email.
          </p>
        </div>
        <p style="margin:24px 0 0;font-size:13px;color:#8a8580">With warmth,<br><strong style="color:#1a1a1a">Soraia</strong></p>
      `),
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}

// ─── Order Notification (to Soraia) ───

export async function sendOrderNotification(data: OrderEmailData) {
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
  const resend = getResend();
  if (!resend || !notificationEmail) return;

  const formatted = formatAmountForEmail(data.amount, data.currency);

  try {
    await resend.emails.send({
      from: FROM,
      to: notificationEmail,
      subject: `New sale! ${data.artworkTitle} — ${formatted}`,
      html: emailLayout(`
        <h2 style="margin:0 0 16px;font-size:20px;font-weight:500">🎉 New Sale</h2>
        <table style="width:100%;font-size:14px;line-height:1.8;border-collapse:collapse" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:6px 0;color:#8a8580;width:100px">Artwork</td>
            <td style="padding:6px 0;font-weight:500">${data.artworkTitle}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#8a8580">Amount</td>
            <td style="padding:6px 0;font-weight:500">${formatted}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#8a8580">Customer</td>
            <td style="padding:6px 0">${data.customerName} (<a href="mailto:${data.customerEmail}" style="color:#1a1a1a">${data.customerEmail}</a>)</td>
          </tr>
          ${data.shippingCity ? `<tr><td style="padding:6px 0;color:#8a8580">Ship to</td><td style="padding:6px 0">${[data.shippingName, data.shippingCity, data.shippingCountry].filter(Boolean).join(", ")}</td></tr>` : ""}
        </table>
        <div style="margin:20px 0 0">
          <a href="${BASE_URL}/admin/orders" style="display:inline-block;padding:10px 24px;background:#1a1a1a;color:#ffffff;font-size:13px;font-weight:500;text-decoration:none;border-radius:6px">View Orders</a>
        </div>
      `),
    });
  } catch (error) {
    console.error("Failed to send order notification email:", error);
  }
}
