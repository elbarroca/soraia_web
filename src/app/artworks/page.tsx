import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/section";
import { ArtworkFilter } from "@/components/features/artwork-filter";
import { ArtworkGrid } from "@/components/features/artwork-grid";
import { getVisibleArtworks } from "@/lib/queries";
import { toPublicArtwork } from "@/lib/mappers";
import { mockArtworks } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artworks",
  description: "Explore photography, drawings, artist proofs, and jewelry by Soraia Oliveira.",
};

export default async function ArtworksPage() {
  const dbArtworks = await getVisibleArtworks();
  const visibleArtworks =
    dbArtworks.length > 0
      ? dbArtworks.map((a) => toPublicArtwork(a))
      : mockArtworks;

  return (
    <Section className="pt-8 md:pt-12">
      <div className="mb-10">
        <h1 className="heading-1 mb-2">Artworks</h1>
        <p className="text-[var(--color-ink-light)]">
          Photography, drawings, artist proofs & wearable sculpture.
        </p>
      </div>

      <Suspense fallback={null}>
        <ArtworkFilter />
        <ArtworkGrid artworks={visibleArtworks} />
      </Suspense>
    </Section>
  );
}
