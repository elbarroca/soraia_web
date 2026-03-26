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
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">Collection</p>
        </div>
        <h1 className="heading-1 mb-3">Artworks</h1>
        <p className="text-[14px] text-[var(--color-ink-light)] leading-[1.7] max-w-sm">
          Photography, drawings, artist proofs &amp; wearable sculpture.
        </p>
      </div>

      <Suspense fallback={null}>
        <ArtworkFilter />
        <ArtworkGrid artworks={visibleArtworks} />
      </Suspense>
    </Section>
  );
}
