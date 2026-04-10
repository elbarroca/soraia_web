"use server";

import { db } from "@/db";
import { artworks, artworkImages } from "@/db/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eq, asc, desc } from "drizzle-orm";
import { artworkFormSchema, type ArtworkFormValues } from "@/lib/validations";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function createArtwork(data: ArtworkFormValues) {
  await requireAuth();

  try {
    const parsed = artworkFormSchema.parse(data);

    const [artwork] = await db
      .insert(artworks)
      .values({
        title: parsed.title,
        slug: parsed.slug,
        description: parsed.description || null,
        category: parsed.category,
        tags: parsed.tags,
        year: parsed.year || null,
        medium: parsed.medium || null,
        edition: parsed.edition || null,
        dimensions: parsed.dimensions || null,
        price: parsed.price || null,
        originalPrice: parsed.originalPrice || null,
        priceOnRequest: parsed.priceOnRequest,
        isSold: parsed.isSold,
        isVisible: parsed.isVisible,
        metaTitle: parsed.metaTitle || null,
        metaDescription: parsed.metaDescription || null,
      })
      .returning();

    if (parsed.images.length > 0) {
      await db.insert(artworkImages).values(
        parsed.images.map((img, i) => ({
          artworkId: artwork.id,
          url: img.url,
          fileKey: img.fileKey || null,
          altText: img.altText || null,
          sortOrder: i,
          isPrimary: img.isPrimary,
        }))
      );
    }

    revalidatePath("/artworks");
    revalidatePath("/admin/artworks");
    return { success: true as const, id: artwork.id };
  } catch (err) {
    console.error("[createArtwork]", err);
    const message = err instanceof Error ? err.message : "Failed to create artwork";
    return { success: false as const, error: message };
  }
}

export async function updateArtwork(id: number, data: ArtworkFormValues) {
  await requireAuth();

  try {
    const parsed = artworkFormSchema.parse(data);

    await db
      .update(artworks)
      .set({
        title: parsed.title,
        slug: parsed.slug,
        description: parsed.description || null,
        category: parsed.category,
        tags: parsed.tags,
        year: parsed.year || null,
        medium: parsed.medium || null,
        edition: parsed.edition || null,
        dimensions: parsed.dimensions || null,
        price: parsed.price || null,
        originalPrice: parsed.originalPrice || null,
        priceOnRequest: parsed.priceOnRequest,
        isSold: parsed.isSold,
        isVisible: parsed.isVisible,
        metaTitle: parsed.metaTitle || null,
        metaDescription: parsed.metaDescription || null,
      })
      .where(eq(artworks.id, id));

    // Replace images
    await db.delete(artworkImages).where(eq(artworkImages.artworkId, id));
    if (parsed.images.length > 0) {
      await db.insert(artworkImages).values(
        parsed.images.map((img, i) => ({
          artworkId: id,
          url: img.url,
          fileKey: img.fileKey || null,
          altText: img.altText || null,
          sortOrder: i,
          isPrimary: img.isPrimary,
        }))
      );
    }

    revalidatePath("/artworks");
    revalidatePath(`/artworks/${parsed.slug}`);
    revalidatePath("/admin/artworks");
    revalidatePath(`/admin/artworks/${id}/edit`);
    return { success: true as const };
  } catch (err) {
    console.error("[updateArtwork]", err);
    const message = err instanceof Error ? err.message : "Failed to update artwork";
    return { success: false as const, error: message };
  }
}

export async function deleteArtwork(id: number) {
  await requireAuth();
  await db.delete(artworks).where(eq(artworks.id, id));
  revalidatePath("/artworks");
  revalidatePath("/admin/artworks");
  return { success: true };
}

export async function toggleArtworkVisibility(id: number, visible: boolean) {
  await requireAuth();
  await db.update(artworks).set({ isVisible: visible }).where(eq(artworks.id, id));
  revalidatePath("/artworks");
  revalidatePath("/admin/artworks");
  return { success: true };
}

export async function reorderArtwork(id: number, direction: "up" | "down") {
  await requireAuth();

  try {
    const allArtworks = await db
      .select({ id: artworks.id, sortOrder: artworks.sortOrder })
      .from(artworks)
      .orderBy(asc(artworks.sortOrder), desc(artworks.createdAt));

    // Normalize sort orders so every item has a unique sequential value
    for (let i = 0; i < allArtworks.length; i++) {
      if (allArtworks[i].sortOrder !== i) {
        await db.update(artworks).set({ sortOrder: i }).where(eq(artworks.id, allArtworks[i].id));
        allArtworks[i].sortOrder = i;
      }
    }

    const currentIndex = allArtworks.findIndex((a) => a.id === id);
    if (currentIndex === -1) return { success: false };

    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= allArtworks.length) return { success: false };

    // Swap the two adjacent items
    await db.update(artworks).set({ sortOrder: swapIndex }).where(eq(artworks.id, allArtworks[currentIndex].id));
    await db.update(artworks).set({ sortOrder: currentIndex }).where(eq(artworks.id, allArtworks[swapIndex].id));

    revalidatePath("/artworks");
    revalidatePath("/admin/artworks");
    return { success: true };
  } catch (err) {
    console.error("[reorderArtwork]", err);
    return { success: false };
  }
}
