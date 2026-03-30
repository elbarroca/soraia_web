import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

export function StudioBanner() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text side */}
        <FadeIn>
          <div className="space-y-6">
            <h2 className="heading-1">In the studio</h2>
            <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.7] max-w-lg">
              Each piece is an original work or limited edition, created in Soraia&apos;s studio
              in Guimarães, Portugal. Studio visits available by appointment.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6 pt-2">
              <Link
                href="/soraia-space"
                className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] hover:text-[var(--color-ink-light)] transition-colors duration-300"
              >
                Visit the Studio
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/artworks"
                className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] hover:text-[var(--color-ink-light)] transition-colors duration-300"
              >
                View Available Works
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Video side */}
        <FadeIn delay={0.1}>
          <div className="relative aspect-video overflow-hidden bg-[var(--color-surface-dim)]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/images/about/studio-work.jpg"
            >
              <source src="/videos/studio.mp4" type="video/mp4" />
            </video>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
