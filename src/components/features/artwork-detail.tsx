"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ImageGallery } from "./image-gallery";
import { ImageLightbox } from "./image-lightbox";
import { PriceDisplay } from "./price-display";
import { PurchaseButton } from "./purchase-button";
import { FadeIn } from "@/components/shared/fade-in";
import type { Artwork } from "@/lib/types";

type ArtworkDetailProps = {
  artwork: Artwork;
};

export function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  const details = [
    { label: "Year", value: artwork.year },
    { label: "Medium", value: artwork.medium },
    { label: "Edition", value: artwork.edition },
    { label: "Dimensions", value: artwork.dimensions },
    { label: "Category", value: artwork.category.replaceAll("-", " ") },
  ].filter((d) => d.value);

  const canPurchase = !artwork.isSold && !artwork.isPriceOnRequest && artwork.priceCents;
  const canInquire = !artwork.isSold && artwork.isPriceOnRequest;

  return (
    <>
      <div className="mx-auto w-full max-w-[1440px] px-[var(--space-page-x)] py-8 md:py-16">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/artworks"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Artworks
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery */}
          <FadeIn className="lg:col-span-7">
            <ImageGallery
              images={artwork.images}
              title={artwork.title}
              onOpenLightbox={openLightbox}
            />
          </FadeIn>

          {/* Info */}
          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-8">
              {/* Title + price */}
              <div className="space-y-3">
                <p className="label text-[var(--color-ink-muted)]">
                  {artwork.category.replaceAll("-", " ")}
                </p>
                <h1 className="heading-1">{artwork.title}</h1>
                <div className="pt-1">
                  <PriceDisplay
                    priceCents={artwork.priceCents}
                    originalPriceCents={artwork.originalPriceCents}
                    isPriceOnRequest={artwork.isPriceOnRequest}
                    isSold={artwork.isSold}
                    size="lg"
                  />
                </div>
              </div>

              {/* Description */}
              {artwork.description && (
                <p className="text-[var(--color-ink-light)] leading-relaxed">
                  {artwork.description}
                </p>
              )}

              {/* Details table */}
              <div className="border-t border-[var(--color-border)]">
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="flex justify-between py-3 border-b border-[var(--color-border)] text-sm"
                  >
                    <span className="text-[var(--color-ink-muted)]">{d.label}</span>
                    <span className="font-medium capitalize">{d.value}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="space-y-3 pt-2">
                {canPurchase && (
                  <PurchaseButton artworkId={artwork.id} />
                )}
                {canInquire && (
                  <Link
                    href={`/contact?artwork=${artwork.slug}`}
                    className="block w-full bg-[var(--color-accent)] text-white py-4 text-sm font-semibold tracking-[0.05em] uppercase transition-all hover:bg-[var(--color-accent-hover)] active:scale-[0.98] text-center"
                  >
                    Inquire
                  </Link>
                )}
                {artwork.isSold && (
                  <div className="w-full py-4 text-center text-sm font-medium text-[var(--color-ink-muted)] bg-[var(--color-surface-dim)] tracking-[0.05em] uppercase">
                    Sold
                  </div>
                )}
                {!artwork.isSold && (
                  <Link
                    href={`/contact?artwork=${artwork.slug}`}
                    className="block w-full border border-[var(--color-border-strong)] py-4 text-sm font-semibold tracking-[0.05em] uppercase transition-all hover:border-[var(--color-ink)] text-center"
                  >
                    Ask a Question
                  </Link>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={artwork.images}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
          title={artwork.title}
        />
      )}
    </>
  );
}
