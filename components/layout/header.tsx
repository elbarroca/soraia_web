"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)]"
            : "bg-transparent"
        )}
      >
        <Container className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-lg md:text-xl font-bold tracking-[0.15em] uppercase"
          >
            Soraia Oliveira
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
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
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
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
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
