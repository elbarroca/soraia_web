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
  ].filter((d) => d.value);

  const canPurchase = !artwork.isSold && !artwork.isPriceOnRequest && artwork.priceCents;
  const canInquire = !artwork.isSold && artwork.isPriceOnRequest;

  return (
    <>
      <div className="mx-auto w-full max-w-[var(--max-width)] px-[var(--space-page-x)] py-8 md:py-16">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/artworks"
            className="inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300 mb-10 group"
          >
            <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
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

              {/* Details dropdown */}
              {details.length > 0 && (
                <details className="border-t border-[var(--color-border)] group">
                  <summary className="flex items-center justify-between py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--color-ink-muted)]">Details</span>
                    <span className="text-[var(--color-ink-muted)] transition-transform duration-300 group-open:rotate-180 text-xs">▼</span>
                  </summary>
                  <div className="pb-4">
                    {details.map((d) => (
                      <div
                        key={d.label}
                        className="flex justify-between items-baseline py-3 border-b border-[var(--color-border)]"
                      >
                        <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--color-ink-muted)]">{d.label}</span>
                        <span className="text-[13px] font-medium capitalize text-[var(--color-ink)] text-right max-w-[60%]">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              {/* Action buttons */}
              <div className="space-y-2.5 pt-3">
                {canPurchase && (
                  <PurchaseButton artworkId={artwork.id} />
                )}
                {canInquire && (
                  <Link
                    href={`/contact?artwork=${artwork.slug}`}
                    className="block w-full bg-[var(--color-ink)] text-white py-4 text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[var(--color-ink-light)] active:scale-[0.99] text-center"
                  >
                    Inquire About This Work
                  </Link>
                )}
                {artwork.isSold && (
                  <div className="w-full py-4 text-center text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--color-ink-muted)] bg-[var(--color-surface-dim)]">
                    This Work Has Found Its Home
                  </div>
                )}
                {!artwork.isSold && (
                  <Link
                    href={`/contact?artwork=${artwork.slug}`}
                    className="block w-full border border-[var(--color-border-strong)] py-3.5 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-light)] transition-all duration-300 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] text-center"
                  >
                    Ask a Question
                  </Link>
                )}
              </div>

              {/* Shipping dropdown */}
              {!artwork.isSold && (
                <details className="border-t border-[var(--color-border)] group">
                  <summary className="flex items-center justify-between py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--color-ink-muted)]">Shipping</span>
                    <span className="text-[var(--color-ink-muted)] transition-transform duration-300 group-open:rotate-180 text-xs">▼</span>
                  </summary>
                  <div className="pb-4 space-y-2">
                    <p className="text-[12px] text-[var(--color-ink-light)] leading-relaxed">
                      Ships from Guimarães, Portugal. Delivery available to Portugal, Spain, France, Germany, Italy, United Kingdom, Netherlands, Belgium, and the United States.
                    </p>
                    <p className="text-[12px] text-[var(--color-ink-muted)] leading-relaxed">
                      Shipping costs calculated at checkout. All works are carefully packed and insured.
                    </p>
                  </div>
                </details>
              )}
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
