import { db } from "@/db";
import { news } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NewsManager } from "@/components/admin/news-manager";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const allNews = await db.select().from(news).orderBy(desc(news.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">News</h1>
        <p className="text-sm text-[var(--color-ink-muted)]">
          {allNews.length} news items
        </p>
      </div>
      <NewsManager news={allNews} />
    </div>
  );
}
