"use client";

import { useSearchParams } from "next/navigation";
import { ArtworkCard } from "./artwork-card";
import { FadeIn } from "@/components/shared/fade-in";
import type { Artwork } from "@/lib/types";

type ArtworkGridProps = {
  artworks: Artwork[];
};

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";

  const filtered =
    activeCategory === "all"
      ? artworks
      : artworks.filter((a) => a.category === activeCategory);

  if (filtered.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-[var(--color-ink-muted)]">No artworks in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
      {filtered.map((artwork, i) => (
        <FadeIn key={artwork.id} delay={Math.min(i * 0.05, 0.3)}>
          <ArtworkCard artwork={artwork} />
        </FadeIn>
      ))}
    </div>
  );
}
