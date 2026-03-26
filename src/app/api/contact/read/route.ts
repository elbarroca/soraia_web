import { db } from "@/db";
import { contacts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = (await req.json()) as { id: number };
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  await db
    .update(contacts)
    .set({ isRead: true })
    .where(eq(contacts.id, id));

  revalidatePath("/admin/contacts");

  return Response.json({ success: true });
}
