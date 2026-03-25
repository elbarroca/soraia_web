import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArtworkDetail } from "@/components/features/artwork-detail";
import { getArtworkBySlug, getVisibleArtworks } from "@/lib/queries";
import { toPublicArtwork } from "@/lib/mappers";
import { artworkProductJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dbArtwork = await getArtworkBySlug(slug);
  if (!dbArtwork) return { title: "Artwork Not Found" };

  const artwork = toPublicArtwork(dbArtwork);
  return {
    title: artwork.title,
    description: artwork.metaDescription || artwork.description || `${artwork.medium} · ${artwork.dimensions}`,
    openGraph: {
      title: `${artwork.title} — Soraia Oliveira`,
      description: artwork.metaDescription || artwork.description || undefined,
      images: artwork.images[0]?.url ? [artwork.images[0].url] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const dbArtworks = await getVisibleArtworks();
    return dbArtworks.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const dbArtwork = await getArtworkBySlug(slug);

  if (!dbArtwork) notFound();

  const artwork = toPublicArtwork(dbArtwork);
  return (
    <>
      <ArtworkDetail artwork={artwork} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(artworkProductJsonLd(artwork)),
        }}
      />
    </>
  );
}
