"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/types";

type SortOption = "curated" | "price-asc" | "price-desc" | "newest";

type ArtworkFilterProps = {
  sort?: SortOption;
  onSortChange?: (sort: SortOption) => void;
};

export function ArtworkFilter({ sort = "curated", onSortChange }: ArtworkFilterProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 mb-12 border-b border-[var(--color-border)]">
      <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide min-w-0">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={cat.value === "all" ? "/artworks" : `/artworks?cat=${cat.value}`}
            scroll={false}
            className={cn(
              "relative whitespace-nowrap pb-3 text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-300",
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

      {onSortChange && (
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="self-start sm:self-auto flex-shrink-0 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] bg-transparent border border-[var(--color-border-strong)] px-3 py-1.5 focus:outline-none focus:border-[var(--color-ink)] focus:text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-all duration-300 cursor-pointer appearance-none"
        >
          <option value="curated">Curated</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="newest">Newest</option>
        </select>
      )}
    </div>
  );
}
