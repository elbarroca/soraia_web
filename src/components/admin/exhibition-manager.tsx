"use client";

import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  createExhibition,
  updateExhibition,
  deleteExhibition,
} from "@/app/admin/(dashboard)/exhibitions/actions";
import { toast } from "sonner";
import type { Exhibition } from "@/db/schema";

const EXHIBITION_TYPES = ["solo", "group", "residency", "award"] as const;

type FormState = {
  title: string;
  location: string;
  year: string;
  type: (typeof EXHIBITION_TYPES)[number];
  externalUrl: string;
  isVisible: boolean;
};

const emptyForm: FormState = {
  title: "",
  location: "",
  year: new Date().getFullYear().toString(),
  type: "solo",
  externalUrl: "",
  isVisible: true,
};

export function ExhibitionManager({ exhibitions }: { exhibitions: Exhibition[] }) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  function openNew() {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(item: Exhibition) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      location: item.location ?? "",
      year: item.year ?? "",
      type: item.type as FormState["type"],
      externalUrl: item.externalUrl ?? "",
      isVisible: item.isVisible,
    });
    setDialogOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (editingId) {
          await updateExhibition(editingId, form);
          toast.success("Exhibition updated");
        } else {
          await createExhibition(form);
          toast.success("Exhibition created");
        }
        setDialogOpen(false);
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    startTransition(async () => {
      await deleteExhibition(id);
      toast.success("Exhibition deleted");
    });
  }

  return (
    <div className="space-y-4">
      <Button onClick={openNew}>
        <Plus className="mr-2 h-4 w-4" />
        Add Exhibition
      </Button>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exhibitions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-[var(--color-ink-muted)]">
                  No exhibitions yet.
                </TableCell>
              </TableRow>
            ) : (
              exhibitions.map((item) => (
                <TableRow key={item.id} className={isPending ? "opacity-50" : ""}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.location ?? "—"}</TableCell>
                  <TableCell>{item.year ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id, item.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Exhibition" : "New Exhibition"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => {
                    if (v) setForm({ ...form, type: v as FormState["type"] });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXHIBITION_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>External URL</Label>
              <Input
                value={form.externalUrl}
                onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving..." : editingId ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
