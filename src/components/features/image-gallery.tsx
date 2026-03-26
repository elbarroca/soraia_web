"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ArtworkImage } from "@/lib/types";

type ImageGalleryProps = {
  images: ArtworkImage[];
  title: string;
  onOpenLightbox: (index: number) => void;
};

export function ImageGallery({ images, title, onOpenLightbox }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-[var(--color-surface-dim)] flex items-center justify-center">
        <span className="label text-[var(--color-ink-muted)]">No images</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image with hover zoom */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[300px] bg-[var(--color-surface-dim)] overflow-hidden cursor-zoom-in focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-2 outline-none"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        onClick={() => onOpenLightbox(activeIndex)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") onOpenLightbox(activeIndex); }}
        aria-label={`View ${title} fullscreen`}
      >
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].altText || title}
          width={1200}
          height={1200}
          className={cn(
            "w-full h-auto object-contain transition-transform duration-200 ease-out",
            isZooming && "scale-[2.5]"
          )}
          style={isZooming ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden transition-opacity",
                i === activeIndex
                  ? "opacity-100 ring-2 ring-[var(--color-ink)]"
                  : "opacity-60 hover:opacity-100"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${title} - view ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
