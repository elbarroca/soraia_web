import { notFound } from "next/navigation";
import { ArtworkForm } from "@/components/admin/artwork-form";
import { getArtworkById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditArtworkPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const artworkId = parseInt(id, 10);
  if (isNaN(artworkId)) notFound();

  const artwork = await getArtworkById(artworkId);
  if (!artwork) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Edit Artwork</h1>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Editing: {artwork.title}
        </p>
      </div>
      <ArtworkForm
        artwork={{
          id: artwork.id,
          title: artwork.title,
          slug: artwork.slug,
          description: artwork.description ?? undefined,
          category: artwork.category as "photography" | "artist-proofs" | "drawings" | "jewelry",
          tags: (artwork.tags as string[]) ?? [],
          year: artwork.year ?? undefined,
          medium: artwork.medium ?? undefined,
          edition: artwork.edition ?? undefined,
          dimensions: artwork.dimensions ?? undefined,
          price: artwork.price ?? undefined,
          originalPrice: artwork.originalPrice ?? undefined,
          priceOnRequest: artwork.priceOnRequest,
          isSold: artwork.isSold,
          isVisible: artwork.isVisible,
          metaTitle: artwork.metaTitle ?? undefined,
          metaDescription: artwork.metaDescription ?? undefined,
          images: artwork.images.map((img) => ({
            url: img.url,
            fileKey: img.fileKey ?? undefined,
            altText: img.altText ?? undefined,
            sortOrder: img.sortOrder,
            isPrimary: img.isPrimary,
          })),
        }}
      />
    </div>
  );
}
