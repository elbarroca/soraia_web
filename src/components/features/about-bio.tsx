"use client";

import { FadeIn } from "@/components/shared/fade-in";

type AboutBioProps = {
  intro: string;
  paragraphs: string[];
};

export function AboutBio({ intro, paragraphs }: AboutBioProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left: intro */}
      <FadeIn>
        <div className="space-y-6">
          <p className="label text-[var(--color-ink-muted)]">About</p>
          <h1 className="heading-1">{intro}</h1>
        </div>
      </FadeIn>

      {/* Right: paragraphs */}
      <div className="space-y-6">
        {paragraphs.map((p, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <p className="text-[var(--color-ink-light)] leading-relaxed">{p}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
