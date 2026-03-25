import { z } from "zod";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { sendContactNotification } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    await db.insert(contacts).values({
      name: data.name,
      email: data.email,
      subject: data.subject ?? null,
      message: data.message,
    });

    await sendContactNotification({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
