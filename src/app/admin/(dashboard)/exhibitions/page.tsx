import { db } from "@/db";
import { exhibitions } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ExhibitionManager } from "@/components/admin/exhibition-manager";

export const dynamic = "force-dynamic";

export default async function AdminExhibitionsPage() {
  const allExhibitions = await db
    .select()
    .from(exhibitions)
    .orderBy(desc(exhibitions.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Exhibitions</h1>
        <p className="text-sm text-[var(--color-ink-muted)]">
          {allExhibitions.length} exhibitions
        </p>
      </div>
      <ExhibitionManager exhibitions={allExhibitions} />
    </div>
  );
}
