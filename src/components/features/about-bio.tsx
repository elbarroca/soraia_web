"use client";

import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";

type AboutBioProps = {
  intro: string;
  paragraphs: string[];
};

export function AboutBio({ intro, paragraphs }: AboutBioProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left: intro + profile image */}
      <div className="lg:col-span-5 space-y-8">
        <FadeIn>
          <div className="space-y-6">
            <p className="label text-[var(--color-ink-muted)]">About</p>
            <h1 className="heading-1">{intro}</h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface-dim)]">
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
      </div>

      {/* Right: bio paragraphs */}
      <div className="lg:col-span-6 lg:col-start-7 space-y-6 lg:pt-24">
        {paragraphs.map((p, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <p className="text-[var(--color-ink-light)] leading-relaxed">{p}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
