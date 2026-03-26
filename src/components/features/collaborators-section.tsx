"use client";

import { FadeIn } from "@/components/shared/fade-in";

type Collaborator = {
  name: string;
  role: string;
};

const COLLABORATORS: Collaborator[] = [
  {
    name: "Sofia Arantes",
    role: "Jewelry design & fabrication",
  },
  {
    name: "Tales Frey",
    role: "Performance art (Apenas Ser, Museu Alberto Sampaio)",
  },
];

export function CollaboratorsSection() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex items-center gap-4">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            Collaborators
          </p>
        </div>
      </FadeIn>

      <div className="space-y-0">
        {COLLABORATORS.map((collab, i) => (
          <FadeIn key={collab.name} delay={0.08 * i}>
            <div className="flex items-start justify-between gap-4 py-4 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors duration-300 -mx-4 px-4">
              <div>
                <p className="text-[13px] font-medium text-[var(--color-ink)]">
                  {collab.name}
                </p>
                <p className="text-[12px] text-[var(--color-ink-muted)] mt-0.5 tracking-[0.01em]">
                  {collab.role}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
