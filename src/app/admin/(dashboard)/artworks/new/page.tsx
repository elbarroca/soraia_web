import { ArtworkForm } from "@/components/admin/artwork-form";

export default function NewArtworkPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">New Artwork</h1>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Add a new artwork to the catalog.
        </p>
      </div>
      <ArtworkForm />
    </div>
  );
}
