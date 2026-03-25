import type { MetadataRoute } from "next";
import { db } from "@/db";
import { artworks } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soraia-oliveira.com";

  let allArtworks: { slug: string; updatedAt: Date }[] = [];
  try {
    allArtworks = await db
      .select({ slug: artworks.slug, updatedAt: artworks.updatedAt })
      .from(artworks)
      .where(eq(artworks.isVisible, true));
  } catch {
    // DB not available at build time with placeholder credentials
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/artworks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/soraia-space`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...allArtworks.map((a) => ({
      url: `${baseUrl}/artworks/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
