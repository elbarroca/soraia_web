"use server";

import { db } from "@/db";
import { exhibitions } from "@/db/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

const exhibitionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().optional(),
  year: z.string().optional(),
  type: z.enum(["solo", "group", "residency", "award"]),
  externalUrl: z.string().optional(),
  isVisible: z.boolean().default(true),
});

type ExhibitionInput = z.infer<typeof exhibitionSchema>;

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createExhibition(data: ExhibitionInput) {
  await requireAuth();
  const parsed = exhibitionSchema.parse(data);

  await db.insert(exhibitions).values({
    title: parsed.title,
    location: parsed.location || null,
    year: parsed.year || null,
    type: parsed.type,
    externalUrl: parsed.externalUrl || null,
    isVisible: parsed.isVisible,
  });

  revalidatePath("/admin/exhibitions");
  revalidatePath("/about");
  return { success: true };
}

export async function updateExhibition(id: number, data: ExhibitionInput) {
  await requireAuth();
  const parsed = exhibitionSchema.parse(data);

  await db
    .update(exhibitions)
    .set({
      title: parsed.title,
      location: parsed.location || null,
      year: parsed.year || null,
      type: parsed.type,
      externalUrl: parsed.externalUrl || null,
      isVisible: parsed.isVisible,
    })
    .where(eq(exhibitions.id, id));

  revalidatePath("/admin/exhibitions");
  revalidatePath("/about");
  return { success: true };
}

export async function deleteExhibition(id: number) {
  await requireAuth();
  await db.delete(exhibitions).where(eq(exhibitions.id, id));
  revalidatePath("/admin/exhibitions");
  revalidatePath("/about");
  return { success: true };
}
