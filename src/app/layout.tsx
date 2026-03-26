import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://soraia-oliveira.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Soraia Oliveira — Visual Artist",
    template: "%s — Soraia Oliveira",
  },
  description:
    "Visual artist based in Guimarães, Portugal. Self-portraiture, photography, drawing, and wearable sculpture.",
  keywords: [
    "Soraia Oliveira",
    "visual artist",
    "photography",
    "self-portraiture",
    "drawings",
    "artist proofs",
    "jewelry",
    "wearable sculpture",
    "Guimarães",
    "Portugal",
    "contemporary art",
  ],
  authors: [{ name: "Soraia Oliveira" }],
  creator: "Soraia Oliveira",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_PT",
    siteName: "Soraia Oliveira",
    title: "Soraia Oliveira — Visual Artist",
    description:
      "Visual artist based in Guimarães, Portugal. Self-portraiture, photography, drawing, and wearable sculpture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soraia Oliveira — Visual Artist",
    description:
      "Visual artist based in Guimarães, Portugal. Self-portraiture, photography, drawing, and wearable sculpture.",
  },
  alternates: {
    languages: {
      "en": BASE_URL,
      "pt": BASE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to content
        </a>
        <CustomCursor />
        <Header />
        <main id="main-content" className="flex-1 pt-[var(--header-h)] md:pt-[var(--header-h-md)]">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
