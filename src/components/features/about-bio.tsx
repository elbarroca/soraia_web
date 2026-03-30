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
      {/* Section label */}
      <FadeIn>
        <div className="flex items-center gap-4">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            About the Artist
          </p>
        </div>
      </FadeIn>

      {/* Intro text + portrait side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <FadeIn delay={0.1} className="lg:col-span-7">
          <h1 className="heading-display leading-[1.05] text-[var(--color-ink)]">
            {intro}
          </h1>
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <div className="relative aspect-[3/4] max-w-[280px] mx-auto lg:mx-0 overflow-hidden bg-[var(--color-surface-dim)]">
            <Image
              src="/images/about/profile.jpg"
              alt="Soraia Oliveira in her studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 60vw, 25vw"
              priority
            />
          </div>
        </FadeIn>
      </div>

      {/* Bio paragraphs — two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
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
  );
}
