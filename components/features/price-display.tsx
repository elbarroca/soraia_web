import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

type PriceDisplayProps = {
  priceCents: number | null;
  originalPriceCents: number | null;
  isPriceOnRequest: boolean;
  isSold: boolean;
  size?: "sm" | "md" | "lg";
};

export function PriceDisplay({
  priceCents,
  originalPriceCents,
  isPriceOnRequest,
  isSold,
  size = "md",
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  if (isSold) {
    return (
      <span
        className={cn(
          "inline-block px-3 py-1 bg-[var(--color-surface-dim)] text-[var(--color-ink-muted)] font-medium tracking-[0.1em] uppercase",
          sizeClasses[size]
        )}
      >
        Sold
      </span>
    );
  }

  if (isPriceOnRequest) {
    return (
      <span className={cn("text-[var(--color-ink-light)] italic", sizeClasses[size])}>
        Price on request
      </span>
    );
  }

  if (originalPriceCents && priceCents) {
    return (
      <span className={cn("flex items-center gap-2", sizeClasses[size])}>
        <span className="text-[var(--color-ink-muted)] line-through">
          {formatPrice(originalPriceCents)}
        </span>
        <span className="text-[var(--color-sale)] font-semibold">
          {formatPrice(priceCents)}
        </span>
      </span>
    );
  }

  if (priceCents) {
    return (
      <span className={cn("font-medium text-[var(--color-ink)]", sizeClasses[size])}>
        {formatPrice(priceCents)}
      </span>
    );
  }

  return null;
}
