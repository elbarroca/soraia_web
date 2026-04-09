"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { CustomCursor } from "../shared/custom-cursor";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <CustomCursor />
      <Header />
      <main id="main-content" className="flex-1 pt-[var(--header-h)] md:pt-[var(--header-h-md)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
