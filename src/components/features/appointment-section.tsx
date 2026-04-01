"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

type AppointmentSectionProps = {
  text: string;
  studioUrl: string;
  callUrl: string;
};

export function AppointmentSection({ text, studioUrl }: AppointmentSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
      {/* Text */}
      <div className="lg:col-span-5 space-y-6">
        <FadeIn>
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">Book a Meeting</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="heading-editorial text-[var(--color-ink)]">
            I&apos;d love to meet you
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.7]">{text}</p>
        </FadeIn>
      </div>

      {/* Appointment options — warm, invitational, not corporate */}
      <div className="lg:col-span-6 lg:col-start-7 space-y-0">
        <FadeIn delay={0.1}>
          <a
            href={studioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-6 py-8 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors -mx-4 px-4"
          >
            <div className="flex-1">
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-2">
                In Person
              </p>
              <p className="text-lg md:text-xl font-medium text-[var(--color-ink)] mb-2">
                Visit the Studio
              </p>
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-relaxed max-w-sm">
                Experience the work up close in Guimarães — see pieces at every stage, from sketch to finished work.
              </p>
            </div>
            <div className="flex-shrink-0 pt-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-[color,transform] duration-300 group-hover:scale-[1.04]">
                Book
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </FadeIn>

        <FadeIn delay={0.18}>
          <a
            href="https://tidycal.com/soraiaoliveira/book-a-call"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-6 py-8 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors -mx-4 px-4"
          >
            <div className="flex-1">
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-2">
                Remote
              </p>
              <p className="text-lg md:text-xl font-medium text-[var(--color-ink)] mb-2">
                Book a Call
              </p>
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-relaxed max-w-sm">
                Schedule a video call to discuss artworks, commissions, or creative partnerships — wherever you are.
              </p>
            </div>
            <div className="flex-shrink-0 pt-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-[color,transform] duration-300 group-hover:scale-[1.04]">
                Book
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </FadeIn>
      </div>
    </div>
  );
}
