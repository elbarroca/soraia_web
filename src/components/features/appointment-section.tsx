"use client";

import { ArrowRight, Calendar, Video } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

type AppointmentSectionProps = {
  text: string;
  studioUrl: string;
  callUrl: string;
};

export function AppointmentSection({ text, studioUrl, callUrl }: AppointmentSectionProps) {
  return (
    <div className="space-y-8">
      <FadeIn>
        <p className="label text-[var(--color-ink-muted)] mb-4">Book a Meeting</p>
        <p className="text-lg text-[var(--color-ink-light)] leading-relaxed max-w-xl">{text}</p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FadeIn delay={0.1}>
          <a
            href={studioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-6 border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-all"
          >
            <Calendar size={20} className="text-[var(--color-ink-muted)] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-sm mb-1">Studio Visit</p>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Visit the studio in Guimarães for a personal viewing experience.
              </p>
            </div>
            <ArrowRight size={16} className="text-[var(--color-ink-muted)] mt-0.5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
        </FadeIn>

        <FadeIn delay={0.15}>
          <a
            href={callUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-6 border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-all"
          >
            <Video size={20} className="text-[var(--color-ink-muted)] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-sm mb-1">Online Meeting</p>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Schedule a video call to discuss artworks, commissions, or collaborations.
              </p>
            </div>
            <ArrowRight size={16} className="text-[var(--color-ink-muted)] mt-0.5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
        </FadeIn>
      </div>
    </div>
  );
}
