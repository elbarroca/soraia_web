"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "the-practice", label: "The Practice" },
  { id: "appointments", label: "Book a Visit" },
  { id: "news", label: "News" },
] as const;

export function SpaceNav() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(item.id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  return (
    <nav className="sticky top-[var(--header-h)] md:top-[var(--header-h-md)] z-40 bg-[var(--color-surface)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="mx-auto w-full max-w-[var(--max-width)] px-[var(--space-page-x)]">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "relative whitespace-nowrap py-4 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-300",
                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:transition-opacity after:duration-300",
                activeId === item.id
                  ? "text-[var(--color-ink)] after:bg-[var(--color-ink)] after:opacity-100"
                  : "text-[var(--color-ink-muted)] after:bg-[var(--color-ink)] after:opacity-0 hover:text-[var(--color-ink)] hover:after:opacity-30"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
