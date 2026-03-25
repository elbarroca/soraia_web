"use server";

import { db } from "@/db";
import { news } from "@/db/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().optional(),
  externalUrl: z.string().optional(),
  publishedAt: z.string().optional(),
  isVisible: z.boolean().default(true),
});

type NewsInput = z.infer<typeof newsSchema>;

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createNews(data: NewsInput) {
  await requireAuth();
  const parsed = newsSchema.parse(data);

  await db.insert(news).values({
    title: parsed.title,
    excerpt: parsed.excerpt || null,
    externalUrl: parsed.externalUrl || null,
    publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : null,
    isVisible: parsed.isVisible,
  });

  revalidatePath("/admin/news");
  revalidatePath("/soraia-space");
  return { success: true };
}

export async function updateNews(id: number, data: NewsInput) {
  await requireAuth();
  const parsed = newsSchema.parse(data);

  await db
    .update(news)
    .set({
      title: parsed.title,
      excerpt: parsed.excerpt || null,
      externalUrl: parsed.externalUrl || null,
      publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : null,
      isVisible: parsed.isVisible,
    })
    .where(eq(news.id, id));

  revalidatePath("/admin/news");
  revalidatePath("/soraia-space");
  return { success: true };
}

export async function deleteNews(id: number) {
  await requireAuth();
  await db.delete(news).where(eq(news.id, id));
  revalidatePath("/admin/news");
  revalidatePath("/soraia-space");
  return { success: true };
}

export async function toggleNewsVisibility(id: number, visible: boolean) {
  await requireAuth();
  await db.update(news).set({ isVisible: visible }).where(eq(news.id, id));
  revalidatePath("/admin/news");
  revalidatePath("/soraia-space");
  return { success: true };
}
