"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/types";

export function ArtworkFilter() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";

  return (
    <div className="flex items-center gap-6 overflow-x-auto pb-0 mb-10 scrollbar-hide">
      {categories.map((cat) => (
        <Link
          key={cat.value}
          href={cat.value === "all" ? "/artworks" : `/artworks?cat=${cat.value}`}
          scroll={false}
          className={cn(
            "relative whitespace-nowrap pb-3 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-300",
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:transition-opacity after:duration-300",
            activeCategory === cat.value
              ? "text-[var(--color-ink)] after:bg-[var(--color-ink)] after:opacity-100"
              : "text-[var(--color-ink-muted)] after:bg-[var(--color-ink)] after:opacity-0 hover:text-[var(--color-ink)] hover:after:opacity-30"
          )}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
