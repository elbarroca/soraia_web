import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { ArtworkDetail } from "@/components/features/artwork-detail";
import { RelatedArtworks } from "@/components/features/related-artworks";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getArtworkBySlug, getArtworksByCategory, getVisibleArtworks } from "@/lib/queries";
import { toPublicArtwork } from "@/lib/mappers";
import { artworkProductJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

const CATEGORY_LABELS: Record<string, string> = {
  photography: "Photography",
  "artist-proofs": "Artist Proofs",
  drawings: "Drawings",
  jewelry: "Jewelry",
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

  // Fetch related artworks from same category
  const dbRelated = await getArtworksByCategory(artwork.category);
  const related = dbRelated
    .map((a) => toPublicArtwork(a))
    .filter((a) => a.slug !== artwork.slug && a.isVisible)
    .slice(0, 4);

  const categoryLabel = CATEGORY_LABELS[artwork.category] ?? artwork.category;

  return (
    <>
      <Section className="pt-6 md:pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Artworks", href: "/artworks" },
            { label: categoryLabel, href: `/artworks?cat=${artwork.category}` },
            { label: artwork.title },
          ]}
        />
      </Section>
      <ArtworkDetail artwork={artwork} />
      <RelatedArtworks artworks={related} category={artwork.category} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(artworkProductJsonLd(artwork)),
        }}
      />
    </>
  );
}
