"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

type ArtistStatementProps = {
  line1: string;
  line2: string;
  credentialLine?: string;
};

export function ArtistStatement({ line1, line2, credentialLine }: ArtistStatementProps) {
  return (
    <Section className="py-20 md:py-28 flex flex-col justify-center min-h-[50vh]">
      <FadeIn>
        <div className="flex items-center gap-4 mb-4 md:mb-10">
          <span className="block h-px w-10 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            About the Artist
          </p>
        </div>
      </FadeIn>

      {/* Mobile: line1 → image → line2; lg: three-column row */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10 lg:gap-12 lg:items-center">
        {/* Mobile line1 */}
        <FadeIn className="lg:hidden">
          <p className="text-xl md:text-2xl font-bold leading-snug text-[#000] whitespace-pre-line">
            {line1}
          </p>
        </FadeIn>

        {/* Desktop line1 */}
        <FadeIn className="hidden lg:block">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-[#000] whitespace-pre-line">
            {line1}
          </p>
        </FadeIn>

        {/* Image — small/centered on mobile, full-size on desktop */}
        <FadeIn delay={0.1} className="flex justify-center">
          <div className="relative aspect-square w-full max-w-[120px] lg:max-w-[380px] overflow-hidden">
            <Image
              src="/images/about/silhouette.png"
              alt="Soraia Oliveira — studio work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 120px, 380px"
            />
          </div>
        </FadeIn>

        {/* Mobile line2 + link */}
        <FadeIn delay={0.1} className="lg:hidden">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-bold leading-snug text-[#000] whitespace-pre-line">
              {line2}
            </p>
            {credentialLine && (
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-[1.7]">
                {credentialLine}
              </p>
            )}
            <div className="pt-2 flex justify-end w-full">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] hover:text-[var(--color-ink-light)] transition-colors duration-300 ml-auto"
              >
                About
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Desktop line2 */}
        <FadeIn delay={0.2} className="hidden lg:block">
          <div className="space-y-6 text-right">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-[#000] whitespace-pre-line">
              {line2}
            </p>
            {credentialLine && (
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-[1.7]">
                {credentialLine}
              </p>
            )}
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] hover:text-[var(--color-ink-light)] transition-colors duration-300 ml-auto"
            >
              About
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
