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
import { Check } from "lucide-react";
import type { Contact } from "@/db/schema";

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [isPending, startTransition] = useTransition();

  async function markAsRead(id: number) {
    startTransition(async () => {
      await fetch("/api/contact/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
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
              <TableCell colSpan={7} className="py-8 text-center text-[var(--color-ink-muted)]">
                No contact submissions yet.
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
                  {new Date(contact.createdAt).toLocaleDateString()}
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
