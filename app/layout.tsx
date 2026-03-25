import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const satoshi = Geist({
  variable: "--font-satoshi",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Soraia Oliveira — Visual Artist",
    template: "%s — Soraia Oliveira",
  },
  description:
    "Visual artist based in Guimarães, Portugal. Self-portraiture, photography, drawing, and wearable sculpture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
