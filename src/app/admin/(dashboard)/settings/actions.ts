"use server";

import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function updateSetting(key: string, value: string) {
  await requireAuth();

  const existing = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key));

  if (existing.length > 0) {
    await db
      .update(siteSettings)
      .set({ value })
      .where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}

export async function updateSettings(entries: { key: string; value: string }[]) {
  await requireAuth();

  for (const { key, value } of entries) {
    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key));

    if (existing.length > 0) {
      await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, key));
    } else {
      await db.insert(siteSettings).values({ key, value });
    }
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
