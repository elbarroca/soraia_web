"use client";

import { useState } from "react";

type NewsletterStatus = "idle" | "loading" | "success" | "error";

export function useNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function updateEmail(value: string) {
    setEmail(value);
    setStatus("idle");
  }

  return { email, status, subscribe, updateEmail };
}
