import { z } from "zod";

export const ARTWORK_CATEGORIES = [
  "photography",
  "artist-proofs",
  "drawings",
  "jewelry",
] as const;

export const artworkImageSchema = z.object({
  url: z.string().min(1, "Image URL is required"),
  fileKey: z.string().optional(),
  altText: z.string().optional(),
  sortOrder: z.number().int().min(0),
  isPrimary: z.boolean(),
});

export const artworkFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  category: z.enum(ARTWORK_CATEGORIES),
  tags: z.array(z.string()).default([]),
  year: z.string().optional(),
  medium: z.string().optional(),
  edition: z.string().optional(),
  dimensions: z.string().optional(),
  price: z.string().optional(),
  originalPrice: z.string().optional(),
  priceOnRequest: z.boolean().default(false),
  isSold: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  images: z.array(artworkImageSchema).default([]),
});

export type ArtworkFormValues = z.infer<typeof artworkFormSchema>;
export type ArtworkImageInput = z.infer<typeof artworkImageSchema>;
