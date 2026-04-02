"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUploader } from "./image-uploader";
import {
  artworkFormSchema,
  ARTWORK_CATEGORIES,
  type ArtworkFormValues,
  type ArtworkImageInput,
} from "@/lib/validations";
import {
  createArtwork,
  updateArtwork,
} from "@/app/admin/(dashboard)/artworks/actions";
import { toast } from "sonner";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function formatPricePreview(value: string): string | null {
  const num = parseFloat(value);
  if (isNaN(num) || value.trim() === "") return null;
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(num);
}

type ArtworkFormProps = {
  artwork?: ArtworkFormValues & { id: number };
};

export function ArtworkForm({ artwork }: ArtworkFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<ArtworkImageInput[]>(
    artwork?.images ?? []
  );

  const form = useForm<ArtworkFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Zod v4 + react-hook-form resolver type mismatch
    resolver: zodResolver(artworkFormSchema) as any,
    defaultValues: {
      title: artwork?.title ?? "",
      slug: artwork?.slug ?? "",
      description: artwork?.description ?? "",
      category: artwork?.category ?? "photography",
      tags: artwork?.tags ?? [],
      year: artwork?.year ?? "",
      medium: artwork?.medium ?? "",
      edition: artwork?.edition ?? "",
      dimensions: artwork?.dimensions ?? "",
      price: artwork?.price ?? "",
      originalPrice: artwork?.originalPrice ?? "",
      priceOnRequest: artwork?.priceOnRequest ?? false,
      isSold: artwork?.isSold ?? false,
      isVisible: artwork?.isVisible ?? true,
      metaTitle: artwork?.metaTitle ?? "",
      metaDescription: artwork?.metaDescription ?? "",
      images: artwork?.images ?? [],
    },
  });

  const priceValue = form.watch("price");
  const pricePreview = formatPricePreview(priceValue ?? "");

  function onSubmit(data: Record<string, unknown>) {
    const payload = { ...data, images } as ArtworkFormValues;

    startTransition(async () => {
      try {
        if (artwork) {
          await updateArtwork(artwork.id, payload);
          toast.success("Artwork updated");
        } else {
          await createArtwork(payload);
          toast.success("Artwork created");
          router.push("/admin/artworks");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        toast.error(message);
      }
    });
  }

  const imageCount = images.length;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-3xl space-y-6 pb-24"
    >
      {/* Section 1 — Details */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Details</CardTitle>
          <CardDescription>Basic information about the artwork</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...form.register("title", {
                onBlur: (e) => {
                  if (!artwork && !form.getValues("slug")) {
                    form.setValue("slug", slugify(e.target.value));
                  }
                },
              })}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-[var(--color-sold)]">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...form.register("slug")} />
            <p className="text-xs text-[var(--color-ink-muted)]">
              URL-friendly identifier. Auto-generated from title.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              {...form.register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(v) => {
                  if (v) {
                    form.setValue(
                      "category",
                      v as ArtworkFormValues["category"]
                    );
                    if (v !== "jewelry") {
                      form.setValue("originalPrice", "");
                    }
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ARTWORK_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" {...form.register("year")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medium">Medium</Label>
              <Input id="medium" {...form.register("medium")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input id="dimensions" {...form.register("dimensions")} />
              <p className="text-xs text-[var(--color-ink-muted)]">
                e.g. 60 × 90 cm
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edition">Edition</Label>
            <Input id="edition" {...form.register("edition")} />
            <p className="text-xs text-[var(--color-ink-muted)]">
              e.g. Edition of 5 + 2 AP
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 — Pricing & Availability */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Pricing &amp; Availability</CardTitle>
          <CardDescription>
            Set pricing and availability for this artwork
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <Switch
              checked={form.watch("priceOnRequest")}
              onCheckedChange={(checked) =>
                form.setValue("priceOnRequest", checked)
              }
            />
            <Label>Price on request</Label>
          </div>

          {!form.watch("priceOnRequest") && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (EUR)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    className="flex-1"
                    {...form.register("price")}
                  />
                  {pricePreview && (
                    <span className="shrink-0 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-dim)] px-2 py-1 text-xs font-medium text-[var(--color-ink-muted)] tabular-nums">
                      {pricePreview}
                    </span>
                  )}
                </div>
              </div>
              {form.watch("category") === "jewelry" && (
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (EUR)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    {...form.register("originalPrice")}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            <Switch
              checked={form.watch("isSold")}
              onCheckedChange={(checked) => form.setValue("isSold", checked)}
            />
            <Label>Marked as Sold</Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={form.watch("isVisible")}
              onCheckedChange={(checked) => form.setValue("isVisible", checked)}
            />
            <Label>Visible on site</Label>
          </div>

          {/* Checkout Readiness */}
          {(() => {
            const price = form.watch("price");
            const priceOnRequest = form.watch("priceOnRequest");
            const isSold = form.watch("isSold");
            const hasPrice = price && parseFloat(price) > 0;
            const canCheckout = hasPrice && !priceOnRequest && !isSold;

            const warnings: string[] = [];
            if (isSold) warnings.push("Artwork is marked as sold");
            if (priceOnRequest) warnings.push("Price is set to 'on request' — no checkout button shown");
            if (!priceOnRequest && !hasPrice) warnings.push("No price set — visitors cannot purchase");

            return (
              <div className={`mt-2 rounded-lg border p-3 ${canCheckout ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${canCheckout ? "bg-green-500" : "bg-amber-500"}`} />
                  <span className={`text-sm font-medium ${canCheckout ? "text-green-800" : "text-amber-800"}`}>
                    {canCheckout ? "Checkout ready" : "Not purchasable"}
                  </span>
                  {canCheckout && (
                    <span className="text-xs text-green-600">
                      — Stripe checkout will use dynamic pricing ({pricePreview})
                    </span>
                  )}
                </div>
                {warnings.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {warnings.map((w) => (
                      <li key={w} className="text-xs text-amber-700">• {w}</li>
                    ))}
                  </ul>
                )}
                {canCheckout && (
                  <p className="mt-1 text-xs text-green-600">
                    No Stripe Price ID needed — price is sent dynamically at checkout time.
                  </p>
                )}
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Section 3 — Tags */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Tags</CardTitle>
          <CardDescription>
            Control how this artwork appears in listings
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex gap-2">
            {["new", "featured"].map((tag) => {
              const isSelected = form.watch("tags")?.includes(tag) ?? false;
              return (
                <Badge
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer capitalize select-none"
                  onClick={() => {
                    const current = form.getValues("tags") ?? [];
                    form.setValue(
                      "tags",
                      isSelected
                        ? current.filter((t) => t !== tag)
                        : [...current, tag]
                    );
                  }}
                >
                  {tag}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Section 4 — Images */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            {imageCount > 0 ? `Images (${imageCount})` : "Images"}
          </CardTitle>
          <CardDescription>
            Upload and arrange artwork images. The primary image is used as the
            thumbnail.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ImageUploader images={images} onChange={setImages} />
        </CardContent>
      </Card>

      {/* Section 5 — SEO */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>SEO</CardTitle>
          <CardDescription>
            Optional metadata for search engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input id="metaTitle" {...form.register("metaTitle")} />
            <p className="text-xs text-[var(--color-ink-muted)]">
              Defaults to artwork title if left empty
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              rows={2}
              {...form.register("metaDescription")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sticky submit bar */}
      <div className="sticky bottom-0 z-20 -mx-6 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 md:-mx-8 md:px-8">
        <div className="flex max-w-3xl gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Saving..."
              : artwork
                ? "Update Artwork"
                : "Create Artwork"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/artworks")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
