"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";

type PullQuoteProps = {
  children: string;
  attribution?: string;
  className?: string;
};

export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <FadeIn>
      <figure className={cn("space-y-4", className)}>
        <blockquote className="pull-quote pl-8 md:pl-10">
          {children}
        </blockquote>
        {attribution && (
          <figcaption className="pl-8 md:pl-10 text-sm text-[var(--color-ink-muted)] tracking-[0.05em]">
            — {attribution}
          </figcaption>
        )}
      </figure>
    </FadeIn>
  );
}
