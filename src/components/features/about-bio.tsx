"use client";

import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";

type AboutBioProps = {
  intro: string;
  paragraphs: string[];
};

export function AboutBio({ intro, paragraphs }: AboutBioProps) {
  return (
    <div className="space-y-14 lg:space-y-20">
      {/* Section label — generous top breathing room */}
      <FadeIn>
        <div className="flex items-center gap-4">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            About the Artist
          </p>
        </div>
      </FadeIn>

      {/*
        Monumental display line — full bleed across the column container.
        This is the emotional entry point: one statement that spans the full width
        before the reader descends into the portrait and bio.
      */}
      <FadeIn delay={0.1}>
        <h1 className="heading-display leading-[1.05] text-[var(--color-ink)]">
          {intro}
        </h1>
      </FadeIn>

      {/* Two-column: image left, bio paragraphs right — aligned at the top */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Portrait — left column, flush top with the first bio paragraph */}
        <FadeIn delay={0.15} className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-dim)]">
            <Image
              src="/images/about/profile.jpg"
              alt="Soraia Oliveira in her studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </FadeIn>

        {/* Bio paragraphs — right column, no artificial top offset */}
        <div className="lg:col-span-6 lg:col-start-7 space-y-6">
          {paragraphs.map((p, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.08}>
              <p
                className={
                  i === 0
                    ? "text-base text-[var(--color-ink)] leading-relaxed font-medium"
                    : "text-[var(--color-ink-light)] leading-relaxed"
                }
              >
                {p}
              </p>
              {/* Pull-quote after paragraph 2 — same position, now with more visual weight */}
              {i === 1 && (
                <blockquote
                  className="border-l border-[var(--color-ink-muted)] pl-5 py-1 mt-6"
                  style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                >
                  <p className="text-base md:text-lg text-[var(--color-ink-muted)] leading-relaxed">
                    &ldquo;The body as a territory of identity, intimacy, and transformation.&rdquo;
                  </p>
                </blockquote>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
