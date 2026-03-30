// ─── Public-facing types (used by feature components + public pages) ───

export type ArtworkImage = {
  id: string;
  url: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
};

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: "photography" | "artist-proofs" | "drawings" | "jewelry";
  year: string | null;
  medium: string | null;
  edition: string | null;
  dimensions: string | null;
  priceCents: number | null;
  originalPriceCents: number | null;
  isPriceOnRequest: boolean;
  isSold: boolean;
  isVisible: boolean;
  isFeatured: boolean;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  images: ArtworkImage[];
};

export type Exhibition = {
  id: string;
  title: string;
  location: string;
  year: string;
  type: "solo" | "group" | "residency" | "award";
  externalUrl: string | null;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string | null;
  externalUrl: string | null;
  publishedDate: string;
  isVisible: boolean;
};

export type SiteSettings = Record<string, string>;

// ─── Categories for filtering ───
export const categories = [
  { value: "all", label: "All Works" },
  { value: "photography", label: "Photography" },
  { value: "artist-proofs", label: "Artist Proofs" },
  { value: "drawings", label: "Drawings" },
  { value: "jewelry", label: "Jewelry" },
] as const;
