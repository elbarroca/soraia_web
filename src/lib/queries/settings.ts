import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { mockSettings } from "@/lib/mock-data";

export async function getSettings(): Promise<Record<string, string>> {
  try {
    const rows = await db.select().from(siteSettings);
    if (rows.length === 0) return mockSettings;
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch {
    console.warn("[DB] getSettings failed — using mock data");
    return mockSettings;
  }
}

export async function getSetting(key: string): Promise<string | null> {
  try {
    const row = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.key, key),
    });
    return row?.value ?? mockSettings[key] ?? null;
  } catch {
    return mockSettings[key] ?? null;
  }
}
