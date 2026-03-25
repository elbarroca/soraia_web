import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  noContainer?: boolean;
};

export function Section({
  children,
  className,
  containerClassName,
  id,
  noContainer = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-[var(--space-section-y)]",
        className
      )}
    >
      {noContainer ? children : (
        <Container className={containerClassName}>{children}</Container>
      )}
    </section>
  );
}
