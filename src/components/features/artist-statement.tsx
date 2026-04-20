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

      {/* Mobile: texts → image; lg: three-column row */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10 lg:gap-12 lg:items-center">
        {/* Mobile text block */}
        <div className="lg:hidden flex flex-col gap-6">
          <FadeIn>
            <p className="text-xl md:text-2xl font-bold leading-snug text-[#000] whitespace-pre-line">
              {line1}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
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
        </div>

        {/* Desktop line 1 */}
        <FadeIn className="hidden lg:block">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-[#000] whitespace-pre-line">
            {line1}
          </p>
        </FadeIn>

        {/* Image */}
        <FadeIn delay={0.1} className="flex justify-center order-last lg:order-none">
          <div className="relative aspect-square w-full max-w-[180px] md:max-w-[280px] lg:max-w-[380px] overflow-hidden">
            <Image
              src="/images/about/silhouette.png"
              alt="Soraia Oliveira — studio work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 75vw, 380px"
            />
          </div>
        </FadeIn>

        {/* Desktop line 2 */}
        <FadeIn delay={0.2} className="hidden lg:block order-3 lg:order-none">
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
