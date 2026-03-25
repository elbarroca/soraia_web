"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Image,
  Newspaper,
  CalendarDays,
  ShoppingBag,
  Mail,
  Users,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artworks", label: "Artworks", icon: Image },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/exhibitions", label: "Exhibitions", icon: CalendarDays },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/newsletter", label: "Newsletter", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="border-b border-[var(--color-border)] p-6">
        <Link href="/admin" className="text-lg font-bold tracking-wider">
          ADMIN
        </Link>
        <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
          Soraia Oliveira
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--color-ink)] text-[var(--color-surface)]"
                  : "text-[var(--color-ink-light)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--color-border)] p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        >
          View site &rarr;
        </Link>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="mt-2 flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-sold)]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-dim)] lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile trigger */}
      <div className="fixed top-0 left-0 z-40 flex h-14 w-full items-center border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open admin menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <span className="ml-3 text-sm font-bold tracking-wider">ADMIN</span>
      </div>
    </>
  );
}
