"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./container";

const NAV_LINKS = [
  { href: "/soraia-space", label: "Soraia Space" },
  { href: "/artworks", label: "Artworks" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled
            ? "bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)]/60"
            : "bg-transparent"
        )}
      >
        <Container className="flex items-center justify-between h-[var(--header-h)] md:h-[var(--header-h-md)] pt-3 md:pt-4">
          <Link href="/" className="block transition-transform duration-500 hover:scale-[1.04]" aria-label="Soraia Oliveira — home">
            <Image
              src="/images/branding/signature-light.png"
              alt="Soraia Oliveira"
              width={180}
              height={36}
              className="h-12 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-[11px] font-medium tracking-[0.14em] uppercase py-1 transition-[color,transform] duration-500",
                    "hover:text-[var(--color-ink)] hover:scale-[1.04]",
                    isActive(link.href)
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-ink-muted)]"
                  )}
                >
                  <span className="relative">
                    {link.label}
                    {/* Subtle dot indicator for active state */}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-indicator"
                        layout={!prefersReducedMotion}
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-ink)]"
                        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2 relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </Container>
      </motion.header>

      {/* Mobile overlay — full-screen dramatic takeover */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-surface)] flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Center: Nav links */}
            <nav id="mobile-nav" aria-label="Mobile navigation" className="flex-1 flex flex-col items-center justify-center gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-[28px] font-light tracking-[0.12em] uppercase transition-[color,transform] duration-300",
                      isActive(link.href)
                        ? "text-[var(--color-ink)]"
                        : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:scale-[1.05]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom: Signature + location */}
            <motion.div
              className="pb-12 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Image
                src="/images/branding/signature-bold.png"
                alt="Soraia Oliveira"
                width={120}
                height={24}
                className="h-5 w-auto opacity-10"
              />
              <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                Guimarães, Portugal
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
