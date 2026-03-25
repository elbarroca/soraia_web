import type {
  Artwork as DbArtwork,
  ArtworkImage as DbArtworkImage,
  Exhibition as DbExhibition,
  NewsItem as DbNewsItem,
} from "@/db/schema";
import type {
  Artwork,
  ArtworkImage,
  Exhibition,
  NewsItem,
} from "./types";

function decimalToCents(value: string | null): number | null {
  if (value == null) return null;
  const n = parseFloat(value);
  if (isNaN(n)) return null;
  return Math.round(n * 100);
}

export function toPublicImage(img: DbArtworkImage): ArtworkImage {
  return {
    id: String(img.id),
    url: img.url,
    altText: img.altText ?? "",
    sortOrder: img.sortOrder,
    isPrimary: img.isPrimary,
  };
}

export function toPublicArtwork(
  row: DbArtwork & { images: DbArtworkImage[] },
  featuredArtworkId?: number
): Artwork {
  return {
    id: String(row.id),
    title: row.title,
    slug: row.slug,
    description: row.description,
    category: row.category as Artwork["category"],
    year: row.year,
    medium: row.medium,
    edition: row.edition,
    dimensions: row.dimensions,
    priceCents: decimalToCents(row.price),
    originalPriceCents: decimalToCents(row.originalPrice),
    isPriceOnRequest: row.priceOnRequest,
    isSold: row.isSold,
    isVisible: row.isVisible,
    isFeatured: featuredArtworkId != null ? row.id === featuredArtworkId : false,
    sortOrder: row.sortOrder,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    images: row.images.map(toPublicImage),
  };
}

export function toPublicExhibition(row: DbExhibition): Exhibition {
  return {
    id: String(row.id),
    title: row.title,
    location: row.location ?? "",
    year: row.year ?? "",
    type: row.type as Exhibition["type"],
    externalUrl: row.externalUrl,
  };
}

export function toPublicNews(row: DbNewsItem): NewsItem {
  return {
    id: String(row.id),
    title: row.title,
    excerpt: row.excerpt,
    externalUrl: row.externalUrl,
    publishedDate: row.publishedAt
      ? new Date(row.publishedAt).toISOString().split("T")[0]
      : "",
    isVisible: row.isVisible,
  };
}
