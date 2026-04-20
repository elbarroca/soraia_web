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
        <div className="flex flex-col items-center text-center gap-2 mb-16 md:mb-24">
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
              About the Artist
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.0] tracking-[-0.02em] text-[var(--color-ink)]">
            Soraia Oliveira
          </h2>
        </div>
      </FadeIn>

      {/* Intro + portrait: mobile sandwiches image between paragraphs; desktop unchanged */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-40 lg:mb-48">
        <div className="lg:col-span-7 space-y-6">
          <FadeIn delay={0.1}>
            <h1 className="heading-display leading-[1.05] text-[var(--color-ink)]">
              {intro}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} className="hidden lg:block">
            <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.75]">
              My work begins with curiosity and a need to understand our inner selves, the body, and
              the spaces I move through, exploring identity, presence, and transformation.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <div className="relative aspect-square max-w-[140px] md:max-w-[260px] lg:max-w-[340px] mx-auto lg:ml-auto overflow-hidden bg-[var(--color-surface-dim)]">
            <Image
              src="/images/about/profile.jpg"
              alt="Soraia Oliveira"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 60vw, 30vw"
              priority
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="lg:hidden">
          <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.75]">
            My work begins with curiosity and a need to understand our inner selves, the body, and
            the spaces I move through, exploring identity, presence, and transformation.
          </p>
        </FadeIn>
      </div>

      {/* Bio — image left, text right (continuous flow) */}
      {paragraphs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <FadeIn delay={0.1} className="lg:col-span-4">
            <div className="relative aspect-square max-w-[380px] mx-auto lg:mx-0 overflow-hidden bg-[var(--color-surface-dim)]">
              <Image
                src="/change1.jpg"
                alt="Soraia Oliveira — studio work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 30vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base text-[var(--color-ink-light)] leading-[1.75]"
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
