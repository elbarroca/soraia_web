"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ArtworkCard } from "./artwork-card";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";
import type { Artwork } from "@/lib/types";

type RelatedArtworksProps = {
  artworks: Artwork[];
  category: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  photography: "Photography",
  "artist-proofs": "Artist Proofs",
  drawings: "Drawings",
  jewelry: "Jewelry",
};

export function RelatedArtworks({ artworks, category }: RelatedArtworksProps) {
  if (artworks.length === 0) return null;

  const label = CATEGORY_LABELS[category] ?? category;

  return (
    <Section>
      <FadeIn>
        <div className="flex items-baseline justify-between mb-10">
          <div className="space-y-2">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
              More from this collection
            </p>
            <h2 className="heading-2">{label}</h2>
          </div>
          <Link
            href={`/artworks?cat=${category}`}
            className="group hidden sm:inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
          >
            View all
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
        {artworks.slice(0, 4).map((artwork, i) => (
          <FadeIn key={artwork.id} delay={i * 0.06}>
            <ArtworkCard artwork={artwork} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
