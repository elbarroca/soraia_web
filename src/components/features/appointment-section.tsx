"use client";

import { ArrowRight, Calendar, Video } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

type AppointmentSectionProps = {
  text: string;
  studioUrl: string;
  callUrl: string;
};

const APPOINTMENTS = [
  {
    key: "studio",
    icon: Calendar,
    title: "Studio Visit",
    description: "Visit the studio in Guimaraes for a personal viewing experience.",
    urlKey: "studioUrl" as const,
  },
  {
    key: "call",
    icon: Video,
    title: "Online Meeting",
    description: "Schedule a video call to discuss artworks, commissions, or collaborations.",
    urlKey: "callUrl" as const,
  },
];

export function AppointmentSection({ text, studioUrl, callUrl }: AppointmentSectionProps) {
  const urls = { studioUrl, callUrl };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
      {/* Text */}
      <div className="lg:col-span-5 space-y-6">
        <FadeIn>
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
            <p className="label text-[var(--color-ink-muted)]">Book a Meeting</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-base md:text-lg text-[var(--color-ink-light)] leading-relaxed">{text}</p>
        </FadeIn>
      </div>

      {/* Cards */}
      <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {APPOINTMENTS.map((apt, i) => (
          <FadeIn key={apt.key} delay={0.1 + i * 0.08}>
            <a
              href={urls[apt.urlKey]}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-6 border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-all h-full bg-[var(--color-surface)]"
            >
              <div>
                <apt.icon size={20} className="text-[var(--color-ink)] mb-4" strokeWidth={1.5} />
                <p className="font-semibold text-sm mb-2">{apt.title}</p>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  {apt.description}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-6 text-xs font-medium tracking-[0.05em] uppercase text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
                Book now
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
