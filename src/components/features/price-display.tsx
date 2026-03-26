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
    sm: "text-[11px]",
    md: "text-[12px]",
    lg: "text-[15px]",
  };

  if (isSold) {
    return (
      <span
        className={cn(
          "inline-block text-[var(--color-sale)] font-medium tracking-[0.14em] uppercase",
          sizeClasses[size]
        )}
      >
        Sold
      </span>
    );
  }

  if (isPriceOnRequest) {
    return (
      <span className={cn("text-[var(--color-ink-muted)] italic tracking-[0.01em]", sizeClasses[size])}>
        Price on request
      </span>
    );
  }

  if (originalPriceCents && priceCents) {
    return (
      <span className={cn("flex items-baseline gap-2.5", sizeClasses[size])}>
        <span className="text-[var(--color-ink-muted)] line-through decoration-1 font-normal">
          {formatPrice(originalPriceCents)}
        </span>
        <span className="text-[var(--color-sale)] font-medium">
          {formatPrice(priceCents)}
        </span>
      </span>
    );
  }

  if (priceCents) {
    return (
      <span className={cn("font-medium text-[var(--color-ink)] tracking-[0.01em]", sizeClasses[size])}>
        {formatPrice(priceCents)}
      </span>
    );
  }

  return null;
}
