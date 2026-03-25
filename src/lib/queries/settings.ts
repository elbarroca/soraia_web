import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getSetting(key: string): Promise<string | null> {
  const row = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key),
  });
  return row?.value ?? null;
}
