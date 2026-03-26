"use client";

import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import type { Exhibition } from "@/lib/types";

type ExhibitionListProps = {
  exhibitions: Exhibition[];
};

const TYPE_STYLES: Record<string, string> = {
  solo: "text-[var(--color-ink)] border border-[var(--color-ink)]",
  group: "text-[var(--color-ink-muted)] border border-[var(--color-border-strong)]",
  residency: "text-[var(--color-ink-muted)] border border-[var(--color-border)]",
  award: "text-[var(--color-ink)] border border-[var(--color-ink)]",
};

const TYPE_LABELS: Record<string, string> = {
  solo: "Solo",
  group: "Group",
  residency: "Residency",
  award: "Award",
};

export function ExhibitionList({ exhibitions }: ExhibitionListProps) {
  if (exhibitions.length === 0) return null;

  const years = exhibitions.map((e) => parseInt(e.year, 10)).filter(Boolean);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = minYear === maxYear ? `${maxYear}` : `${minYear} — Present`;

  return (
    <div>
      <FadeIn>
        <div className="flex items-center gap-4 mb-4">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            Selected Exhibitions & Awards
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="text-[13px] text-[var(--color-ink-muted)] mb-10">
          {exhibitions.length} exhibitions across Portugal&apos;s leading institutions · {yearRange}
        </p>
      </FadeIn>

      <div className="space-y-0">
        {exhibitions.map((ex, i) => {
          const Wrapper = ex.externalUrl ? "a" : "div";
          const wrapperProps = ex.externalUrl
            ? { href: ex.externalUrl, target: "_blank" as const, rel: "noopener noreferrer" }
            : {};

          return (
            <FadeIn key={ex.id} delay={i * 0.04}>
              <Wrapper
                {...wrapperProps}
                className={`group grid grid-cols-12 gap-3 md:gap-4 py-5 border-b border-[var(--color-border)] items-center hover:bg-[var(--color-surface-hover)] transition-colors duration-300 -mx-4 px-4 cursor-default${ex.type === "solo" ? " border-l-2 border-l-[var(--color-ink)] ml-0 pl-[calc(1rem-2px)]" : ""}`}
                style={ex.externalUrl ? { cursor: "pointer" } : undefined}
              >
                {/* Year */}
                <span className="col-span-2 md:col-span-1 text-[12px] font-medium tabular-nums text-[var(--color-ink-muted)] tracking-[0.04em]">
                  {ex.year}
                </span>

                {/* Info */}
                <div className="col-span-7 md:col-span-8">
                  <p className={`font-medium text-[var(--color-ink)] group-hover:underline decoration-1 underline-offset-4 decoration-[var(--color-border-strong)] transition-all duration-300 ${ex.type === "solo" ? "text-[15px]" : "text-[13px]"}`}>
                    {ex.title}
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">{ex.location}</p>
                </div>

                {/* Type badge + link icon */}
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 text-[9px] font-medium tracking-[0.12em] uppercase ${TYPE_STYLES[ex.type] ?? ""}`}
                  >
                    {TYPE_LABELS[ex.type] ?? ex.type}
                  </span>
                  {ex.externalUrl && (
                    <ExternalLink size={12} className="text-[var(--color-ink-muted)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  )}
                </div>
              </Wrapper>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
