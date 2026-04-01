"use client";

import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";

type AboutBioProps = {
  intro: string;
  paragraphs: string[];
};

export function AboutBio({ intro, paragraphs }: AboutBioProps) {
  return (
    <div>
      {/* Section label */}
      <FadeIn>
        <div className="flex items-center gap-4 mb-6">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            About the Artist
          </p>
        </div>
      </FadeIn>

      {/* Intro text + portrait side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-8">
        <FadeIn delay={0.1} className="lg:col-span-7">
          <h1 className="heading-display leading-[1.05] text-[var(--color-ink)]">
            {intro}
          </h1>
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <div className="relative aspect-[3/4] max-w-[280px] mx-auto lg:mx-0 overflow-hidden bg-[var(--color-surface-dim)]">
            <Image
              src="/images/about/profile.jpg"
              alt="Soraia Oliveira"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 60vw, 25vw"
              priority
            />
          </div>
        </FadeIn>
      </div>

      {/* Subtitle */}
      <FadeIn delay={0.2}>
        <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.75] max-w-2xl mb-16 lg:mb-20">
          My work begins with curiosity and a need to understand our inner selves, the body, and
          the spaces I move through, exploring identity, presence, and transformation.
        </p>
      </FadeIn>

      {/* Bio — image left, text right */}
      {paragraphs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-dim)]">
              <Image
                src="/images/about/studio-work.jpg"
                alt="Soraia Oliveira — studio work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-5 pt-2">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] text-[var(--color-ink-light)] leading-[1.75]"
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  );
}
