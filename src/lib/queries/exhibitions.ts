import { db } from "@/db";
import { exhibitions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getVisibleExhibitions() {
  return db.query.exhibitions.findMany({
    where: eq(exhibitions.isVisible, true),
    orderBy: [desc(exhibitions.year)],
  });
}
