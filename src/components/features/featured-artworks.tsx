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

  const [hero, ...rest] = artworks.slice(0, 4);
  const secondary = rest.slice(0, 3);

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Hero artwork — large */}
        {hero && (
          <FadeIn className="lg:col-span-7">
            <Link href={`/artworks/${hero.slug}`} className="group block">
              <div className="relative overflow-hidden bg-[var(--color-surface-dim)] aspect-[4/5]">
                {hero.images[0] && (
                  <>
                    <Image
                      src={hero.images[0].url}
                      alt={hero.images[0].altText || hero.title}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </>
                )}
                {hero.isSold && (
                  <span className="absolute top-4 right-4 label text-[10px] bg-[var(--color-sold)] text-white px-2.5 py-1">
                    Sold
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-1.5">
                <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--color-ink-muted)]">
                  {hero.category.replace("-", " ")}
                </p>
                <h3 className="text-base font-medium group-hover:underline underline-offset-4">
                  {hero.title}
                </h3>
                <PriceDisplay
                  priceCents={hero.priceCents}
                  originalPriceCents={hero.originalPriceCents}
                  isPriceOnRequest={hero.isPriceOnRequest}
                  isSold={hero.isSold}
                  size="sm"
                />
              </div>
            </Link>
          </FadeIn>
        )}

        {/* Secondary artworks — smaller grid */}
        <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {secondary.map((artwork, i) => (
            <FadeIn key={artwork.id} delay={0.08 * (i + 1)} className={i === 2 ? "col-span-2 lg:col-span-1" : ""}>
              <Link href={`/artworks/${artwork.slug}`} className="group block">
                <div className="relative overflow-hidden bg-[var(--color-surface-dim)] aspect-[3/4] lg:aspect-[16/9]">
                  {artwork.images[0] && (
                    <>
                      <Image
                        src={artwork.images[0].url}
                        alt={artwork.images[0].altText || artwork.title}
                        fill
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </>
                  )}
                  {artwork.isSold && (
                    <span className="absolute top-3 right-3 label text-[10px] bg-[var(--color-sold)] text-white px-2 py-0.5">
                      Sold
                    </span>
                  )}
                </div>
                <div className="mt-3 space-y-1">
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
      </div>
    </Section>
  );
}
