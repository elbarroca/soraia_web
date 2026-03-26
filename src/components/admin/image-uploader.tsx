"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, GripVertical, Star, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { ArtworkImageInput } from "@/lib/validations";

type ImageUploaderProps = {
  images: ArtworkImageInput[];
  onChange: (images: ArtworkImageInput[]) => void;
};

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleUploadComplete = useCallback(
    (res: { ufsUrl?: string; url?: string; key?: string; name?: string }[]) => {
      const newImages: ArtworkImageInput[] = res.map((file, i) => ({
        url: file.ufsUrl ?? file.url ?? "",
        fileKey: file.key,
        altText: file.name?.replace(/\.[^/.]+$/, "") ?? "",
        sortOrder: images.length + i,
        isPrimary: images.length === 0 && i === 0,
      }));
      onChange([...images, ...newImages]);
      toast.success(`${res.length} image(s) uploaded`);
    },
    [images, onChange]
  );

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index);
    // If removed image was primary, make first one primary
    if (images[index]?.isPrimary && updated.length > 0) {
      updated[0] = { ...updated[0], isPrimary: true };
    }
    onChange(updated.map((img, i) => ({ ...img, sortOrder: i })));
  }

  function setPrimary(index: number) {
    onChange(images.map((img, i) => ({ ...img, isPrimary: i === index })));
  }

  function updateAltText(index: number, altText: string) {
    onChange(
      images.map((img, i) => (i === index ? { ...img, altText } : img))
    );
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...images];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    onChange(updated.map((img, i) => ({ ...img, sortOrder: i })));
    setDragIndex(index);
  }

  function handleDragEnd() {
    setDragIndex(null);
  }

  return (
    <div className="space-y-4">
      {/* Empty state — shown above upload zone when no images */}
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[var(--color-border)] p-8 text-center">
          <ImageIcon className="h-8 w-8 text-[var(--color-ink-muted)]" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--color-ink)]">
              No images yet
            </p>
            <p className="text-xs text-[var(--color-ink-muted)]">
              Upload your first image to get started
            </p>
          </div>
        </div>
      )}

      {/* Existing images */}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className="flex items-center gap-3 rounded-md border border-[var(--color-border)] p-2"
            >
              <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-[var(--color-ink-muted)]" />

              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-[var(--color-surface-dim)]">
                <Image
                  src={image.url}
                  alt={image.altText ?? ""}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <Input
                value={image.altText ?? ""}
                onChange={(e) => updateAltText(index, e.target.value)}
                placeholder="Alt text"
                className="flex-1"
              />

              <Button
                type="button"
                variant={image.isPrimary ? "default" : "ghost"}
                size="icon"
                onClick={() => setPrimary(index)}
                title="Set as primary"
              >
                <Star
                  className="h-4 w-4"
                  fill={image.isPrimary ? "currentColor" : "none"}
                />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <UploadDropzone
        endpoint="artworkImage"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          toast.error(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}
