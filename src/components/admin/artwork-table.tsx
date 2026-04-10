"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image as ImageIcon, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { AdminEmptyState } from "./empty-state";
import {
  deleteArtwork,
  toggleArtworkVisibility,
  reorderArtwork,
} from "@/app/admin/(dashboard)/artworks/actions";
import { ARTWORK_CATEGORIES } from "@/lib/validations";
import { formatPrice } from "@/lib/utils";
import type { Artwork, ArtworkImage } from "@/db/schema";

type ArtworkWithImages = Artwork & { images: ArtworkImage[] };

export function ArtworkTable({
  artworks,
}: {
  artworks: ArtworkWithImages[];
}) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isPending, startTransition] = useTransition();

  const isFiltered = categoryFilter !== "all";
  const filtered = isFiltered
    ? artworks.filter((a) => a.category === categoryFilter)
    : artworks;

  function handleToggleVisibility(id: number, visible: boolean) {
    startTransition(async () => {
      try {
        const res = await toggleArtworkVisibility(id, visible);
        if (!res.success) {
          toast.error(res.error ?? "Failed to update visibility");
        }
      } catch (err) {
        console.error("[toggleVisibility]", err);
        toast.error("Failed to update visibility");
      }
    });
  }

  function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      try {
        const res = await deleteArtwork(id);
        if (!res.success) {
          toast.error(res.error ?? "Failed to delete artwork");
          return;
        }
        toast.success(`"${title}" deleted`);
      } catch (err) {
        console.error("[deleteArtwork]", err);
        toast.error("Failed to delete artwork");
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "all")}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {ARTWORK_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.replace("-", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-[var(--color-ink-muted)]">
          {filtered.length} items
        </span>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" />
              <TableHead className="w-20">Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <AdminEmptyState
                    icon={ImageIcon}
                    title="No artworks yet"
                    description="Create your first artwork to showcase in your portfolio."
                    action={{ label: "Add Artwork", href: "/admin/artworks/new" }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((artwork, index) => {
                const primaryImage = artwork.images.find((i) => i.isPrimary) ?? artwork.images[0];
                return (
                  <TableRow key={artwork.id} className={isPending ? "opacity-50" : ""}>
                    <TableCell>
                      {primaryImage ? (
                        <Image
                          src={primaryImage.url}
                          alt={artwork.title}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-sm object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-sm bg-[var(--color-surface-dim)]" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          disabled={isFiltered || index === 0}
                          aria-label={`Move ${artwork.title} up`}
                          onClick={() => startTransition(async () => {
                            try {
                              const res = await reorderArtwork(artwork.id, "up");
                              if (!res.success) toast.error("Failed to reorder");
                            } catch { toast.error("Failed to reorder"); }
                          })}
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          disabled={isFiltered || index === filtered.length - 1}
                          aria-label={`Move ${artwork.title} down`}
                          onClick={() => startTransition(async () => {
                            try {
                              const res = await reorderArtwork(artwork.id, "down");
                              if (!res.success) toast.error("Failed to reorder");
                            } catch { toast.error("Failed to reorder"); }
                          })}
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{artwork.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {artwork.category.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {artwork.priceOnRequest
                        ? "On request"
                        : artwork.price
                          ? formatPrice(Math.round(parseFloat(artwork.price) * 100))
                          : "—"}
                    </TableCell>
                    <TableCell>
                      {artwork.isSold ? (
                        <Badge variant="destructive">Sold</Badge>
                      ) : (
                        <Badge variant="outline">Available</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={artwork.isVisible}
                        onCheckedChange={(checked) =>
                          handleToggleVisibility(artwork.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Link href={`/admin/artworks/${artwork.id}/edit`}>
                          <Button variant="ghost" size="icon" aria-label={`Edit ${artwork.title}`}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${artwork.title}`}
                          onClick={() => handleDelete(artwork.id, artwork.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
