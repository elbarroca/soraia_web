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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

type ArtworkFormProps = {
  artwork?: ArtworkFormValues & { id: number };
};

export function ArtworkForm({ artwork }: ArtworkFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<ArtworkImageInput[]>(
    artwork?.images ?? []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<ArtworkFormValues>({
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
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-8">
      {/* Basic info */}
      <div className="space-y-4">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} {...form.register("description")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={form.watch("category")}
              onValueChange={(v) => {
                if (v) form.setValue("category", v as ArtworkFormValues["category"]);
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
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edition">Edition</Label>
          <Input id="edition" {...form.register("edition")} />
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="heading-3">Pricing</h3>

        <div className="flex items-center gap-3">
          <Switch
            checked={form.watch("priceOnRequest")}
            onCheckedChange={(checked) => form.setValue("priceOnRequest", checked)}
          />
          <Label>Price on request</Label>
        </div>

        {!form.watch("priceOnRequest") && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (EUR)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...form.register("price")}
              />
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
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="heading-3">Tags</h3>
        <div className="flex gap-4">
          {["new", "featured"].map((tag) => (
            <label key={tag} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.watch("tags")?.includes(tag)}
                onChange={(e) => {
                  const current = form.getValues("tags") ?? [];
                  form.setValue(
                    "tags",
                    e.target.checked
                      ? [...current, tag]
                      : current.filter((t) => t !== tag)
                  );
                }}
                className="h-4 w-4"
              />
              <span className="text-sm capitalize">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="heading-3">Images</h3>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      {/* SEO */}
      <Accordion>
        <AccordionItem value="seo">
          <AccordionTrigger>SEO Settings</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input id="metaTitle" {...form.register("metaTitle")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                rows={2}
                {...form.register("metaDescription")}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Submit */}
      <div className="flex gap-4">
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
    </form>
  );
}
