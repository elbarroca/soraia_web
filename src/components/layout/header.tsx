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
  { href: "/soraia-space", label: "SORAIA SPACE" },
  { href: "/artworks", label: "ARTWORKS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
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

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        )}
      >
        <Container className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="block" aria-label="Soraia Oliveira — home">
            <Image
              src="/images/branding/signature-light.png"
              alt="Soraia Oliveira"
              width={180}
              height={36}
              className="h-7 md:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
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
                    "label-lg relative py-1 transition-colors hover:text-[var(--color-ink)]",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-ink-light)]",
                    "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[var(--color-ink)] after:transition-all after:duration-300",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "after:w-full"
                      : "after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2 relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>
      </motion.header>

      {/* Mobile overlay with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-2xl font-semibold tracking-[0.1em] uppercase transition-colors",
                      pathname === link.href
                        ? "text-[var(--color-ink)]"
                        : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile menu signature */}
            <motion.div
              className="absolute bottom-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src="/images/branding/signature-bold.png"
                alt="Soraia Oliveira"
                width={120}
                height={24}
                className="h-6 w-auto opacity-20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
