import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ContactsTable } from "@/components/admin/contacts-table";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const allContacts = await db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Contact Submissions</h1>
        <p className="text-sm text-[var(--color-ink-muted)]">
          {allContacts.length} submissions
        </p>
      </div>
      <ContactsTable contacts={allContacts} />
    </div>
  );
}
