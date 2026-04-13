"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuccessModal } from "@/components/shared/success-modal";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Subject pills — integrated into the form as the primary entry point.
// No icons, no borders — just text that clarifies intent before writing.
const SUBJECTS = [
  { label: "Artwork Inquiry", value: "Artwork inquiry" },
  { label: "Collaboration", value: "Commission / Collaboration" },
  { label: "Press & Media", value: "Press / Exhibition inquiry" },
] as const;

export function ContactForm() {
  const searchParams = useSearchParams();
  const artworkSlug = searchParams.get("artwork");
  const subjectParam = searchParams.get("subject");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const defaultSubject = artworkSlug
    ? `Inquiry about: ${artworkSlug.replace(/-/g, " ")}`
    : subjectParam ?? "";

  // Derive the initial active pill from defaultSubject — no effect needed.
  // On subsequent URL changes within the same mount, the useEffect below
  // re-syncs the form field value only; pill state follows from selectSubject.
  const initialPill = SUBJECTS.find((s) => s.value === defaultSubject)?.value ?? "";
  const [activeSubject, setActiveSubject] = useState<string>(initialPill);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: defaultSubject },
  });

  // Sync form field when URL params change (e.g. clicking intent links on the same page)
  useEffect(() => {
    if (defaultSubject) {
      setValue("subject", defaultSubject);
    }
  }, [defaultSubject, setValue]);

  function selectSubject(value: string) {
    setValue("subject", value, { shouldValidate: true });
    setActiveSubject(value);
  }

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
        setActiveSubject("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <SuccessModal
        open={status === "success"}
        onClose={() => setStatus("idle")}
        title="Message received."
        message="Thank you for reaching out. I'll get back to you as soon as possible."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Subject selector — the form's first gesture */}
        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink)] mb-5">
            I&apos;m writing about
          </p>
          <div className="flex flex-wrap gap-3">
            {SUBJECTS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => selectSubject(s.value)}
                className={cn(
                  "relative text-[14px] font-semibold tracking-wide transition-all duration-200 px-5 py-2.5 border rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-ink)]",
                  activeSubject === s.value
                    ? "text-white bg-[var(--color-ink-light)] border-[var(--color-ink-light)]"
                    : "text-[var(--color-ink-light)] border-[var(--color-ink-light)] hover:bg-[var(--color-ink-light)] hover:text-white"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="name"
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-3 block"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full bg-transparent border border-[var(--color-border-strong)] rounded-full px-5 py-3 text-[15px] focus:border-[var(--color-ink)] focus:outline-none transition-colors duration-300 placeholder:text-[var(--color-ink-muted)]/40"
              placeholder="Maria"
            />
            {errors.name && (
              <p className="text-xs text-[var(--color-sold)] mt-2">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-3 block"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full bg-transparent border border-[var(--color-border-strong)] rounded-full px-5 py-3 text-[15px] focus:border-[var(--color-ink)] focus:outline-none transition-colors duration-300 placeholder:text-[var(--color-ink-muted)]/40"
              placeholder="maria@email.com"
            />
            {errors.email && (
              <p className="text-xs text-[var(--color-sold)] mt-2">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Subject — editable, pre-filled by pill selection */}
        <div>
          <label
            htmlFor="subject"
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-3 block"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            {...register("subject")}
            className="w-full bg-transparent border border-[var(--color-border-strong)] rounded-full px-5 py-3 text-[15px] focus:border-[var(--color-ink)] focus:outline-none transition-colors duration-300 placeholder:text-[var(--color-ink-muted)]/40"
            placeholder="Or type your own…"
          />
          {errors.subject && (
            <p className="text-xs text-[var(--color-sold)] mt-2">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-3 block"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className="w-full bg-transparent border border-[var(--color-border-strong)] rounded-2xl px-5 py-3 text-[15px] focus:border-[var(--color-ink)] focus:outline-none transition-colors duration-300 resize-none placeholder:text-[var(--color-ink-muted)]/40"
            placeholder="I'd love to know more about your work…"
          />
          {errors.message && (
            <p className="text-xs text-[var(--color-sold)] mt-2">{errors.message.message}</p>
          )}
        </div>

        {/* Submit — editorial text link with arrow */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-ink-light)] disabled:opacity-40 focus-visible:outline-none focus-visible:underline underline-offset-4"
          >
            {status === "loading" ? "Sending…" : "Send Message"}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {status === "error" && (
            <p className="text-[13px] text-[var(--color-sold)]">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>
    </>
  );
}
