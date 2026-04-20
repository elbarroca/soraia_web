import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/shared/fade-in";
import type { Artwork } from "@/lib/types";

type CategoryTile = {
  label: string;
  href: string;
  artwork: Artwork | null;
  fallbackImage?: string;
};

type FeaturedArtworksProps = {
  artworks: Artwork[];
};

export function FeaturedArtworks({ artworks }: FeaturedArtworksProps) {
  if (artworks.length === 0) return null;

  const byCategory = (cat: Artwork["category"]) =>
    artworks.find((a) => a.category === cat && a.images.length > 0) ?? null;

  const tiles: CategoryTile[] = [
    {
      label: "all artworks",
      href: "/artworks",
      artwork: null,
      fallbackImage: "/images/categories/all-artworks.png",
    },
    {
      label: "photography",
      href: "/artworks?cat=photography",
      artwork: null,
      fallbackImage: "/images/categories/romeu.png",
    },
    {
      label: "artist proofs",
      href: "/artworks?cat=artist-proofs",
      artwork: byCategory("artist-proofs"),
      fallbackImage: "/images/categories/artist-proofs.png",
    },
    {
      label: "drawings",
      href: "/artworks?cat=drawings",
      artwork: byCategory("drawings"),
      fallbackImage: "/images/categories/drawings.png",
    },
  ];

  return (
    <Section>
      {/* Header row: title + View artworks link */}
      <div className="flex items-end justify-between mb-8">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] uppercase text-[var(--color-ink)]">
            Artworks
          </h2>
        </FadeIn>
        <FadeIn delay={0.06}>
          <Link
            href="/artworks"
            className="text-[12px] font-medium tracking-[0.08em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
          >
            View artworks &rarr;
          </Link>
        </FadeIn>
      </div>

      {/* Tile grid — equal cell size; thumbnails scale to shared frame */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-10 gap-y-16 items-start">
        {tiles.map((tile, i) => {
          const img =
            tile.artwork?.images.find((im) => im.isPrimary) ??
            tile.artwork?.images[0];
          const imageSrc = tile.fallbackImage ?? img?.url;
          const imageAlt = img?.altText || tile.artwork?.title || tile.label;

          return (
            <FadeIn key={tile.href} delay={i * 0.08}>
              <Link href={tile.href} className="group block w-full">
                {/* Image — full column width, fixed aspect so all tiles match */}
                <div className="relative aspect-[4/5] w-[90%] mx-auto flex items-center justify-center overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      className={`object-cover object-center transition-transform duration-[1200ms] ease-out ${
                        i < 2 ? "scale-[1.12] group-hover:scale-[1.14]" : "group-hover:scale-[1.015]"
                      }`}
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-muted)]">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <p className="text-[13px] md:text-[15px] font-semibold tracking-[0.04em] text-[var(--color-ink)] group-hover:underline underline-offset-4 decoration-1">
                    {tile.label} &rarr;
                  </p>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
