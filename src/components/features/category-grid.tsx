"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

type Category = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  span: "wide" | "narrow";
};

type CategoryGridProps = {
  counts?: Record<string, number>;
};

const CATEGORIES: Category[] = [
  {
    slug: "photography",
    title: "Photography",
    subtitle: "Self-portraiture & fine art prints",
    image: "/images/artworks/shared-my-soul.png",
    span: "wide",
  },
  {
    slug: "drawings",
    title: "Drawings",
    subtitle: "Charcoal, graphite & ink on paper",
    image: "/images/artworks/dopamine.jpg",
    span: "narrow",
  },
  {
    slug: "artist-proofs",
    title: "Artist Proofs",
    subtitle: "Rare annotated editions",
    image: "/images/artworks/refugio-ap.png",
    span: "narrow",
  },
  {
    slug: "jewelry",
    title: "Jewelry",
    subtitle: "Wearable sculpture in silver",
    image: "/images/artworks/golden-necklace.jpg",
    span: "wide",
  },
];

export function CategoryGrid({ counts }: CategoryGridProps = {}) {
  return (
    <Section>
      <FadeIn>
        <div className="flex items-baseline justify-between mb-12">
          <div className="space-y-2">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
              Collections
            </p>
            <h2 className="heading-1">Explore by Category</h2>
          </div>
          <Link
            href="/artworks"
            className="group hidden sm:inline-flex items-center gap-2.5 text-[10px] font-medium tracking-[0.18em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
          >
            View all
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {CATEGORIES.map((cat, i) => (
          <FadeIn
            key={cat.slug}
            delay={i * 0.08}
            className={cat.span === "wide" ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1 lg:col-span-1"}
          >
            <Link
              href={`/artworks?cat=${cat.slug}`}
              className={[
                "group relative block overflow-hidden w-full h-full",
                cat.span === "wide"
                  ? "aspect-[16/10]"
                  : "aspect-[3/4] sm:aspect-[5/6] lg:aspect-[3/4]",
              ].join(" ")}
            >
              <Image
                src={cat.image}
                alt={`${cat.title} — ${cat.subtitle}`}
                fill
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                sizes={
                  cat.span === "wide"
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

              {/* Hover tint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 mb-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-400">
                  {cat.subtitle}
                </p>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-white text-lg md:text-xl font-medium tracking-[0.02em] leading-tight">
                    {cat.title}
                  </h3>
                  {counts?.[cat.slug] != null && (
                    <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-white/35">
                      {counts[cat.slug]} works
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
