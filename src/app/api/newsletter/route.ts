import { z } from "zod";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { addSubscriberToMailerLite } from "@/lib/mailerlite";
import { sendNewSubscriberNotification } from "@/lib/email";

const emailSchema = z.object({
  email: z.email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = emailSchema.parse(body);

    const existing = await db.query.newsletterSubscribers.findFirst({
      where: eq(newsletterSubscribers.email, email),
    });

    if (existing) {
      return Response.json({ message: "Already subscribed" }, { status: 200 });
    }

    // Store in local DB, sync to MailerLite, and notify Soraia — all in parallel
    await Promise.all([
      db.insert(newsletterSubscribers).values({ email }),
      addSubscriberToMailerLite(email),
      sendNewSubscriberNotification(email),
    ]);

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
}
