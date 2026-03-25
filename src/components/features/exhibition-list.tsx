"use client";

import { FadeIn } from "@/components/shared/fade-in";
import type { Exhibition } from "@/lib/types";

type ExhibitionListProps = {
  exhibitions: Exhibition[];
};

const TYPE_LABELS: Record<string, string> = {
  solo: "Solo",
  group: "Group",
  residency: "Residency",
  award: "Award",
};

export function ExhibitionList({ exhibitions }: ExhibitionListProps) {
  const grouped = exhibitions.reduce<Record<string, Exhibition[]>>((acc, ex) => {
    (acc[ex.year] ??= []).push(ex);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-0">
      <FadeIn>
        <p className="label text-[var(--color-ink-muted)] mb-8">Selected Exhibitions & Awards</p>
      </FadeIn>

      {years.map((year) => (
        <div key={year}>
          {grouped[year].map((ex, i) => (
            <FadeIn key={ex.id} delay={i * 0.05}>
              <div className="grid grid-cols-12 gap-4 py-4 border-b border-[var(--color-border)] items-baseline hover:bg-[var(--color-surface-hover)] transition-colors -mx-4 px-4">
                <span className="col-span-2 md:col-span-1 text-sm text-[var(--color-ink-muted)] tabular-nums">
                  {year}
                </span>
                <div className="col-span-8 md:col-span-9">
                  <p className="text-sm font-medium">{ex.title}</p>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">{ex.location}</p>
                </div>
                <span className="col-span-2 text-right label text-[10px] text-[var(--color-ink-muted)]">
                  {TYPE_LABELS[ex.type] ?? ex.type}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      ))}
    </div>
  );
}
