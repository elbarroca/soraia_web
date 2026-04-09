"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-lg font-semibold text-[var(--color-ink)]">
        Something went wrong
      </h2>
      <p className="text-sm text-[var(--color-ink-muted)]">
        {error.digest ? `Error digest: ${error.digest}` : "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="mt-2 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-surface-dim)] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
