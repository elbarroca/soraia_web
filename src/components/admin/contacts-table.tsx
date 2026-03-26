"use client";

import { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Mail } from "lucide-react";
import { AdminEmptyState } from "./empty-state";
import { toast } from "sonner";
import type { Contact } from "@/db/schema";

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [isPending, startTransition] = useTransition();

  async function markAsRead(id: number) {
    startTransition(async () => {
      const res = await fetch("/api/contact/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        toast.error("Failed to mark as read");
      }
    });
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-16" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <AdminEmptyState
                  icon={Mail}
                  title="No messages yet"
                  description="Messages from your website contact form will appear here."
                />
              </TableCell>
            </TableRow>
          ) : (
            contacts.map((contact) => (
              <TableRow key={contact.id} className={isPending ? "opacity-50" : ""}>
                <TableCell>
                  {contact.isRead ? (
                    <Badge variant="secondary">Read</Badge>
                  ) : (
                    <Badge>New</Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.subject ?? "—"}</TableCell>
                <TableCell className="max-w-xs truncate text-sm">
                  {contact.message}
                </TableCell>
                <TableCell className="text-sm text-[var(--color-ink-muted)]">
                  {new Date(contact.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  {!contact.isRead && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => markAsRead(contact.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
