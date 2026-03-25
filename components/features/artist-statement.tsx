"use client";

import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

type ArtistStatementProps = {
  line1: string;
  line2: string;
};

export function ArtistStatement({ line1, line2 }: ArtistStatementProps) {
  return (
    <Section className="bg-[var(--color-surface-dim)]">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <FadeIn>
          <p className="label text-[var(--color-ink-muted)] mb-8">About the Artist</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="heading-2 text-[var(--color-ink)]">{line1}</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg text-[var(--color-ink-light)] leading-relaxed">{line2}</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <a
            href="/about"
            className="inline-block mt-4 label text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors border-b border-[var(--color-border)] hover:border-[var(--color-ink)] pb-1"
          >
            Read more &rarr;
          </a>
        </FadeIn>
      </div>
    </Section>
  );
}
