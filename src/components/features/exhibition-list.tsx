"use client";

import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import type { Exhibition } from "@/lib/types";

type ExhibitionListProps = {
  exhibitions: Exhibition[];
};

const TYPE_STYLES: Record<string, string> = {
  solo: "bg-[var(--color-ink)] text-white",
  group: "bg-[var(--color-surface-dim)] text-[var(--color-ink)]",
  residency: "border border-[var(--color-border-strong)] text-[var(--color-ink-light)]",
  award: "bg-[var(--color-ink)] text-white",
};

const TYPE_LABELS: Record<string, string> = {
  solo: "Solo",
  group: "Group",
  residency: "Residency",
  award: "Award",
};

export function ExhibitionList({ exhibitions }: ExhibitionListProps) {
  return (
    <div>
      <FadeIn>
        <div className="flex items-center gap-4 mb-10">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="label text-[var(--color-ink-muted)]">Selected Exhibitions & Awards</p>
        </div>
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
                className="group grid grid-cols-12 gap-3 md:gap-4 py-5 border-b border-[var(--color-border)] items-center hover:bg-[var(--color-surface-hover)] transition-colors -mx-4 px-4 cursor-default"
                style={ex.externalUrl ? { cursor: "pointer" } : undefined}
              >
                {/* Year */}
                <span className="col-span-2 md:col-span-1 text-sm font-medium tabular-nums text-[var(--color-ink-muted)]">
                  {ex.year}
                </span>

                {/* Info */}
                <div className="col-span-7 md:col-span-8">
                  <p className="text-sm font-medium text-[var(--color-ink)] group-hover:underline underline-offset-4 decoration-[var(--color-border-strong)]">
                    {ex.title}
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">{ex.location}</p>
                </div>

                {/* Type badge + link icon */}
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <span
                    className={`inline-block px-2.5 py-1 text-[10px] font-medium tracking-[0.05em] uppercase ${TYPE_STYLES[ex.type] ?? ""}`}
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
