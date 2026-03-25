import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ArtworkTable } from "@/components/admin/artwork-table";
import { getAllArtworks } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminArtworksPage() {
  const artworkList = await getAllArtworks();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Artworks</h1>
          <p className="text-sm text-[var(--color-ink-muted)]">
            {artworkList.length} artworks
          </p>
        </div>
        <Link href="/admin/artworks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Artwork
          </Button>
        </Link>
      </div>

      <ArtworkTable artworks={artworkList} />
    </div>
  );
}
