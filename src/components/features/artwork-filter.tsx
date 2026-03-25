"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/types";

export function ArtworkFilter() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-10 -mx-1 px-1 scrollbar-hide">
      {categories.map((cat) => (
        <Link
          key={cat.value}
          href={cat.value === "all" ? "/artworks" : `/artworks?cat=${cat.value}`}
          scroll={false}
          className={cn(
            "label-lg whitespace-nowrap px-4 py-2 transition-all border",
            activeCategory === cat.value
              ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
              : "bg-transparent text-[var(--color-ink-light)] border-[var(--color-border)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
          )}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
