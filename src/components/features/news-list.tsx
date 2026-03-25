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
        <p className="label text-[var(--color-ink-muted)] mb-8">Press & News</p>
      </FadeIn>

      {items.map((item, i) => (
        <FadeIn key={item.id} delay={i * 0.05}>
          <a
            href={item.externalUrl || "#"}
            target={item.externalUrl ? "_blank" : undefined}
            rel={item.externalUrl ? "noopener noreferrer" : undefined}
            className="group flex items-start justify-between gap-4 py-5 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors -mx-4 px-4"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium group-hover:underline underline-offset-4">
                {item.title}
              </p>
              {item.excerpt && (
                <p className="text-xs text-[var(--color-ink-muted)] mt-1 line-clamp-2">
                  {item.excerpt}
                </p>
              )}
              <p className="text-xs text-[var(--color-ink-muted)] mt-2">
                {new Date(item.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {item.externalUrl && (
              <ArrowUpRight size={16} className="text-[var(--color-ink-muted)] flex-shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </a>
        </FadeIn>
      ))}
    </div>
  );
}
