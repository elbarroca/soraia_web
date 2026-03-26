import { cn } from "@/lib/utils";

type EditorialDividerProps = {
  className?: string;
  accent?: boolean;
};

export function EditorialDivider({ className, accent = false }: EditorialDividerProps) {
  return (
    <hr
      className={cn(
        "editorial-rule",
        accent && "bg-[var(--color-ink)]",
        className
      )}
      aria-hidden="true"
    />
  );
}
