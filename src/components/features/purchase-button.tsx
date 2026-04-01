"use client";

import { useState } from "react";

type PurchaseButtonProps = {
  artworkId: string;
  disabled?: boolean;
};

export function PurchaseButton({ artworkId, disabled }: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePurchase() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("Could not start checkout. Please try again.");
    } catch {
      setError("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handlePurchase}
        disabled={disabled || loading}
        className="w-full bg-[var(--color-ink)] text-white py-4 text-[11px] font-medium tracking-[0.18em] uppercase border border-[var(--color-ink)] transition-all duration-300 hover:bg-white hover:text-[var(--color-ink)] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? "Redirecting..." : "ADD TO CART"}
      </button>
      {error && (
        <p className="text-[12px] text-red-600 text-center">
          {error}
        </p>
      )}
    </div>
  );
}
