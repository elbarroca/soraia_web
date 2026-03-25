import { db } from "@/db";
import { artworks, artworkImages } from "@/db/schema";
import { eq, desc, asc, and } from "drizzle-orm";

export async function getAllArtworks() {
  return db.query.artworks.findMany({
    with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
    orderBy: [asc(artworks.sortOrder), desc(artworks.createdAt)],
  });
}

export async function getArtworkById(id: number) {
  return db.query.artworks.findFirst({
    where: eq(artworks.id, id),
    with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
  });
}

export async function getArtworkBySlug(slug: string) {
  return db.query.artworks.findFirst({
    where: and(eq(artworks.slug, slug), eq(artworks.isVisible, true)),
    with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
  });
}

export async function getArtworksByCategory(category: string) {
  return db.query.artworks.findMany({
    where: and(
      eq(artworks.category, category),
      eq(artworks.isVisible, true)
    ),
    with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
    orderBy: [asc(artworks.sortOrder)],
  });
}

export async function getVisibleArtworks() {
  return db.query.artworks.findMany({
    where: eq(artworks.isVisible, true),
    with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
    orderBy: [asc(artworks.sortOrder), desc(artworks.createdAt)],
  });
}
