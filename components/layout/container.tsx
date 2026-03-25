import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1440px]",
        "px-[var(--space-page-x)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
