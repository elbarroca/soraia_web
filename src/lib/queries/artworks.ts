import { db } from "@/db";
import { artworks, artworkImages } from "@/db/schema";
import { eq, desc, asc, and } from "drizzle-orm";

type ArtworkRow = typeof artworks.$inferSelect & {
  images: (typeof artworkImages.$inferSelect)[];
};

// Fallback: return empty array, pages will render empty state
// Mock artworks are in public types, not DB shape — so we return [] and let pages fall back
const EMPTY: ArtworkRow[] = [];

export async function getAllArtworks() {
  try {
    return await db.query.artworks.findMany({
      with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
      orderBy: [asc(artworks.sortOrder), desc(artworks.createdAt)],
    });
  } catch {
    console.warn("[DB] getAllArtworks failed — returning empty");
    return EMPTY;
  }
}

export async function getArtworkById(id: number) {
  try {
    return await db.query.artworks.findFirst({
      where: eq(artworks.id, id),
      with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
    });
  } catch {
    console.warn("[DB] getArtworkById failed");
    return undefined;
  }
}

export async function getArtworkBySlug(slug: string) {
  try {
    return await db.query.artworks.findFirst({
      where: and(eq(artworks.slug, slug), eq(artworks.isVisible, true)),
      with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
    });
  } catch {
    console.warn("[DB] getArtworkBySlug failed");
    return undefined;
  }
}

export async function getArtworksByCategory(category: string) {
  try {
    return await db.query.artworks.findMany({
      where: and(
        eq(artworks.category, category),
        eq(artworks.isVisible, true)
      ),
      with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
      orderBy: [asc(artworks.sortOrder)],
    });
  } catch {
    console.warn("[DB] getArtworksByCategory failed");
    return EMPTY;
  }
}

export async function getVisibleArtworks() {
  try {
    return await db.query.artworks.findMany({
      where: eq(artworks.isVisible, true),
      with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
      orderBy: [asc(artworks.sortOrder), desc(artworks.createdAt)],
    });
  } catch {
    console.warn("[DB] getVisibleArtworks failed — returning empty");
    return EMPTY;
  }
}
