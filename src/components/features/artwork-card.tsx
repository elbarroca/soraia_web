"use client";

import Link from "next/link";
import Image from "next/image";
import { PriceDisplay } from "./price-display";
import type { Artwork } from "@/lib/types";

type ArtworkCardProps = {
  artwork: Artwork;
};

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const primaryImage = artwork.images.find((img) => img.isPrimary) ?? artwork.images[0];

  return (
    <Link href={`/artworks/${artwork.slug}`} className="group block">
      {/* Image container */}
      <div className="relative overflow-hidden bg-[var(--color-surface-dim)] aspect-[3/4] mb-4">
        {primaryImage ? (
          <>
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText || artwork.title}
              fill
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Subtle overlay on hover — frames the image without obscuring it */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-muted)]">
            <span className="label">No Image</span>
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {artwork.isSold && (
            <span className="text-[9px] font-medium tracking-[0.15em] uppercase bg-[var(--color-sold)] text-white px-2 py-0.5">
              Sold
            </span>
          )}
          {!artwork.isSold && artwork.originalPriceCents && artwork.priceCents && artwork.originalPriceCents > artwork.priceCents && (
            <span className="text-[9px] font-medium tracking-[0.15em] uppercase bg-[var(--color-ink)] text-white px-2 py-0.5">
              Sale
            </span>
          )}
          {artwork.edition && !artwork.isSold && (
            <span className="text-[9px] font-medium tracking-[0.12em] uppercase bg-white/90 text-[var(--color-ink)] px-2 py-0.5 backdrop-blur-sm">
              Edition
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1 mt-3.5">
        <h3 className="text-sm font-medium leading-snug group-hover:underline decoration-1 underline-offset-4 transition-all duration-300">
          {artwork.title}
        </h3>
        {artwork.year && (
          <p className="text-[11px] tracking-[0.05em] text-[var(--color-ink-muted)] mt-0.5">{artwork.year}</p>
        )}
        <PriceDisplay
          priceCents={artwork.priceCents}
          originalPriceCents={artwork.originalPriceCents}
          isPriceOnRequest={artwork.isPriceOnRequest}
          isSold={artwork.isSold}
          size="sm"
        />
      </div>
    </Link>
  );
}
