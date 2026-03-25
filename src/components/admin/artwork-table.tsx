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
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteArtwork,
  toggleArtworkVisibility,
} from "@/app/admin/(dashboard)/artworks/actions";
import { ARTWORK_CATEGORIES } from "@/lib/validations";
import type { Artwork, ArtworkImage } from "@/db/schema";

type ArtworkWithImages = Artwork & { images: ArtworkImage[] };

export function ArtworkTable({
  artworks,
}: {
  artworks: ArtworkWithImages[];
}) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isPending, startTransition] = useTransition();

  const filtered =
    categoryFilter === "all"
      ? artworks
      : artworks.filter((a) => a.category === categoryFilter);

  function handleToggleVisibility(id: number, visible: boolean) {
    startTransition(async () => {
      await toggleArtworkVisibility(id, visible);
    });
  }

  function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteArtwork(id);
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
                <TableCell colSpan={7} className="py-8 text-center text-[var(--color-ink-muted)]">
                  No artworks found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((artwork) => {
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
                          ? `€${Number(artwork.price).toLocaleString()}`
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
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
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
