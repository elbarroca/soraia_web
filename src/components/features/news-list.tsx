"use client";

import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import type { NewsItem } from "@/lib/types";

type NewsListProps = {
  items: NewsItem[];
};

export function NewsList({ items }: NewsListProps) {
  return (
    <div className="space-y-0">
      <FadeIn>
        <div className="flex items-center gap-4 mb-8">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">Press &amp; News</p>
        </div>
      </FadeIn>

      {items.map((item, i) => (
        <FadeIn key={item.id} delay={i * 0.05}>
          <a
            href={item.externalUrl || "#"}
            target={item.externalUrl ? "_blank" : undefined}
            rel={item.externalUrl ? "noopener noreferrer" : undefined}
            className="group flex items-start justify-between gap-4 py-5 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors duration-300 -mx-4 px-4"
          >
            <div className="flex-1 min-w-0">
              {/* First item uses slightly larger text to signal recency/importance */}
              <p className={`font-medium group-hover:underline decoration-1 underline-offset-4 decoration-[var(--color-border-strong)] transition-all duration-300 ${i === 0 ? "text-[15px] leading-snug" : "text-[13px] leading-snug"}`}>
                {item.title}
              </p>
              {item.excerpt && (
                <p className="text-[12px] text-[var(--color-ink-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                  {item.excerpt}
                </p>
              )}
              <p className="text-[11px] tracking-[0.04em] text-[var(--color-ink-muted)] mt-2">
                {new Date(item.publishedDate).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            {item.externalUrl && (
              <ArrowUpRight size={14} className="text-[var(--color-ink-muted)] flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </a>
        </FadeIn>
      ))}
    </div>
  );
}
