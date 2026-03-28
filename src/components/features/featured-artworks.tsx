import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";
import { PriceDisplay } from "./price-display";
import type { Artwork } from "@/lib/types";

type FeaturedArtworksProps = {
  artworks: Artwork[];
};

export function FeaturedArtworks({ artworks }: FeaturedArtworksProps) {
  if (artworks.length === 0) return null;

  return (
    <Section>
      <FadeIn>
        <div className="flex items-baseline justify-between mb-12">
          <div className="space-y-2">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
              Selected Works
            </p>
            <h2 className="heading-1">Featured</h2>
          </div>
          <Link
            href="/artworks"
            className="group hidden sm:inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
          >
            View all works
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {artworks.map((artwork, i) => (
          <FadeIn key={artwork.id} delay={0.06 * i}>
            <Link href={`/artworks/${artwork.slug}`} className="group block">
              <div className="relative overflow-hidden bg-[var(--color-surface-dim)]">
                {artwork.images[0] && (
                  <>
                    <Image
                      src={artwork.images[0].url}
                      alt={artwork.images[0].altText || artwork.title}
                      width={600}
                      height={600}
                      className="w-full h-auto object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                  </>
                )}
                {artwork.isSold && (
                  <span className="absolute top-3 right-3 label text-[10px] bg-[var(--color-sale)] text-white px-2.5 py-1">
                    Sold
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-1.5">
                <h3 className="text-sm font-medium group-hover:underline underline-offset-4">
                  {artwork.title}
                </h3>
                <PriceDisplay
                  priceCents={artwork.priceCents}
                  originalPriceCents={artwork.originalPriceCents}
                  isPriceOnRequest={artwork.isPriceOnRequest}
                  isSold={artwork.isSold}
                  size="sm"
                />
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
