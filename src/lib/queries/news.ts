import { db } from "@/db";
import { news } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getVisibleNews() {
  try {
    return await db.query.news.findMany({
      where: eq(news.isVisible, true),
      orderBy: [desc(news.publishedAt)],
    });
  } catch {
    console.warn("[DB] getVisibleNews failed — returning empty");
    return [];
  }
}
