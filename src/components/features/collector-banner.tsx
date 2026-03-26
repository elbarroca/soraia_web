import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

export function CollectorBanner() {
  return (
    <Section className="bg-[var(--color-surface-dim)]">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <FadeIn>
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            For Collectors
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="heading-editorial text-[var(--color-ink)]">
            Intuition becomes method and the body remains central
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.7] max-w-lg mx-auto">
            Each piece is an original work or limited edition, created in Soraia&apos;s studio
            in Guimarães, Portugal. Studio visits available by appointment.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
            <Link
              href="/soraia-space"
              className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
            >
              Visit the Studio
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/artworks"
              className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
            >
              View Available Works
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
