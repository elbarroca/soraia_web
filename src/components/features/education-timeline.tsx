"use client";

import { FadeIn } from "@/components/shared/fade-in";

type EducationEntry = {
  country: string;
  institution: string;
  program: string;
};

const EDUCATION: EducationEntry[] = [
  {
    country: "Portugal",
    institution: "School of Arts and Design, Caldas da Rainha",
    program: "Fine Arts degree",
  },
  {
    country: "Italy",
    institution: "Free University of Bolzano",
    program: "Erasmus program",
  },
  {
    country: "Italy",
    institution: "Accademia di Belle Arti, L'Aquila",
    program: "Erasmus program",
  },
];

export function EducationTimeline() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex items-center gap-4">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            Education
          </p>
        </div>
      </FadeIn>

      <div className="space-y-0">
        {EDUCATION.map((entry, i) => (
          <FadeIn key={entry.institution} delay={0.08 * i}>
            <div className="flex gap-6 py-5 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors duration-300 -mx-4 px-4">
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--color-ink-muted)] w-16 flex-shrink-0 pt-1">
                {entry.country}
              </span>
              <div>
                <p className="text-[13px] font-medium text-[var(--color-ink)]">
                  {entry.institution}
                </p>
                <p className="text-[12px] text-[var(--color-ink-muted)] mt-0.5 tracking-[0.01em]">
                  {entry.program}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
