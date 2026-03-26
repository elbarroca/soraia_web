import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { desc } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/empty-state";
import { ExportCsvButton } from "@/components/admin/export-csv-button";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const subscribers = await db
    .select()
    .from(newsletterSubscribers)
    .orderBy(desc(newsletterSubscribers.subscribedAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Newsletter Subscribers</h1>
          <p className="text-sm text-[var(--color-ink-muted)]">
            {subscribers.length} subscribers
          </p>
        </div>
        <ExportCsvButton
          data={subscribers.map((s) => ({
            email: s.email,
            subscribed: new Date(s.subscribedAt).toISOString(),
            active: s.isActive ? "yes" : "no",
          }))}
          filename="newsletter-subscribers"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <AdminEmptyState
                    icon={Users}
                    title="No subscribers yet"
                    description="Subscribers will appear when visitors sign up on your site."
                  />
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.email}</TableCell>
                  <TableCell className="text-sm text-[var(--color-ink-muted)]">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={sub.isActive ? "default" : "secondary"}>
                      {sub.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
