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
      {/* Image */}
      <div className="relative overflow-hidden bg-[var(--color-surface-dim)] aspect-[3/4] mb-4">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText || artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-muted)]">
            <span className="label">No Image</span>
          </div>
        )}

        {/* Category label */}
        <span className="absolute top-3 left-3 label text-[10px] bg-white/90 px-2 py-1 backdrop-blur-sm">
          {artwork.category.replace("-", " ")}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium group-hover:underline underline-offset-4 transition-all">
          {artwork.title}
        </h3>
        {artwork.year && (
          <p className="text-xs text-[var(--color-ink-muted)]">{artwork.year}</p>
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
