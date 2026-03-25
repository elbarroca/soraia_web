"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type PurchaseButtonProps = {
  artworkId: string;
  disabled?: boolean;
};

export function PurchaseButton({ artworkId, disabled }: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handlePurchase}
      disabled={disabled || loading}
      className="w-full"
      size="lg"
    >
      {loading ? "Redirecting..." : "PURCHASE"}
    </Button>
  );
}
