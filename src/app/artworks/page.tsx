import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { ArtworkGrid } from "@/components/features/artwork-grid";
import { PriceDisplay } from "@/components/features/price-display";
import { FadeIn } from "@/components/shared/fade-in";
import { getVisibleArtworks } from "@/lib/queries";
import { toPublicArtwork } from "@/lib/mappers";
import { mockArtworks } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artworks",
  description: "Explore photography, drawings, and artist proofs by Soraia Oliveira.",
};

export default async function ArtworksPage() {
  const dbArtworks = await getVisibleArtworks();
  const visibleArtworks =
    dbArtworks.length > 0
      ? dbArtworks.map((a) => toPublicArtwork(a))
      : mockArtworks;

  const curated = visibleArtworks
    .filter((a) => a.isFeatured && a.isVisible && a.category !== "jewelry")
    .slice(0, 3);

  return (
    <Section className="pt-8 md:pt-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">Collection</p>
        </div>
        <h1 className="heading-1 mb-3">Artworks</h1>
        <p className="text-[14px] text-[var(--color-ink-light)] leading-[1.7] max-w-sm">
          Photography, drawings &amp; artist proofs.
        </p>
      </div>

      {/* Featured highlights */}
      {curated.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {curated.map((artwork, i) => {
              const img = artwork.images.find((im) => im.isPrimary) ?? artwork.images[0];
              return (
                <FadeIn key={artwork.id} delay={i * 0.08}>
                  <Link href={`/artworks/${artwork.slug}`} className="group block">
                    <div className="relative overflow-hidden aspect-[4/3] mb-3">
                      {img && (
                        <Image
                          src={img.url}
                          alt={img.altText || artwork.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <h3 className="text-sm font-medium group-hover:underline decoration-1 underline-offset-4">
                      {artwork.title}
                    </h3>
                    <PriceDisplay
                      priceCents={artwork.priceCents}
                      originalPriceCents={artwork.originalPriceCents}
                      isPriceOnRequest={artwork.isPriceOnRequest}
                      isSold={artwork.isSold}
                      size="sm"
                    />
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <ArtworkGrid artworks={visibleArtworks} />
      </Suspense>
    </Section>
  );
}
