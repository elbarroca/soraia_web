"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const searchParams = useSearchParams();
  const artworkSlug = searchParams.get("artwork");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: artworkSlug ? `Inquiry about: ${artworkSlug.replace(/-/g, " ")}` : "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, artworkSlug }),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-16 text-center space-y-4">
        <h3 className="heading-2">Thank you for reaching out.</h3>
        <p className="text-[var(--color-ink-light)]">
          I&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="label text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mt-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Name */}
      <div>
        <label htmlFor="name" className="label text-[var(--color-ink-muted)] mb-2 block">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full bg-transparent border-b border-[var(--color-border-strong)] px-0 py-3 text-base focus:border-[var(--color-ink)] focus:outline-none transition-colors"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-xs text-[var(--color-sold)] mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label text-[var(--color-ink-muted)] mb-2 block">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full bg-transparent border-b border-[var(--color-border-strong)] px-0 py-3 text-base focus:border-[var(--color-ink)] focus:outline-none transition-colors"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-xs text-[var(--color-sold)] mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="label text-[var(--color-ink-muted)] mb-2 block">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className="w-full bg-transparent border-b border-[var(--color-border-strong)] px-0 py-3 text-base focus:border-[var(--color-ink)] focus:outline-none transition-colors"
          placeholder="What is this about?"
        />
        {errors.subject && (
          <p className="text-xs text-[var(--color-sold)] mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label text-[var(--color-ink-muted)] mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full bg-transparent border-b border-[var(--color-border-strong)] px-0 py-3 text-base focus:border-[var(--color-ink)] focus:outline-none transition-colors resize-none"
          placeholder="Tell me more..."
        />
        {errors.message && (
          <p className="text-xs text-[var(--color-sold)] mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 text-sm font-semibold tracking-[0.05em] uppercase transition-all hover:bg-[var(--color-accent-hover)] active:scale-[0.98] group disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>

      {status === "error" && (
        <p className="text-sm text-[var(--color-sold)]">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
