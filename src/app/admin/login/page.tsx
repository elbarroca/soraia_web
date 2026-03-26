"use client";

import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function loginAction(
  _prevState: { error: string | null },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    return { error: "Invalid email or password." };
  }

  window.location.href = "/admin";
  return { error: null };
}

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
  });

  return (
    <div className="flex min-h-screen">
      {/* Left — branding panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-[var(--color-ink)] p-12 text-[var(--color-surface)] lg:flex">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-ink-muted)]">
            Studio
          </p>
        </div>
        <div className="space-y-6">
          <h1 className="font-[family-name:var(--font-primary)] text-4xl font-light leading-tight tracking-tight">
            Soraia
            <br />
            Oliveira
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--color-ink-muted)]">
            The body as subject, tool, and territory. Self-portraiture,
            photography and drawing, exploring experimental printing and
            performance.
          </p>
        </div>
        <p className="text-xs text-[var(--color-ink-muted)]">
          Guimarães, Portugal
        </p>
      </div>

      {/* Right — login form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile-only branding */}
          <div className="text-center lg:hidden">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-ink-muted)]">
              Soraia Oliveira
            </p>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-medium tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-[var(--color-ink-muted)]">
              Sign in to manage your portfolio
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="soraia@soraia-oliveira.com"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)]">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="h-11"
              />
            </div>

            {state.error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-700">{state.error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="h-11 w-full text-sm font-medium tracking-wide"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs text-[var(--color-ink-muted)]">
            Protected area — authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}
