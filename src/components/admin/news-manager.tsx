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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  createNews,
  updateNews,
  deleteNews,
  toggleNewsVisibility,
} from "@/app/admin/(dashboard)/news/actions";
import { toast } from "sonner";
import type { NewsItem } from "@/db/schema";

type FormState = {
  title: string;
  excerpt: string;
  externalUrl: string;
  publishedAt: string;
  isVisible: boolean;
};

const emptyForm: FormState = {
  title: "",
  excerpt: "",
  externalUrl: "",
  publishedAt: "",
  isVisible: true,
};

export function NewsManager({ news }: { news: NewsItem[] }) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  function openNew() {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(item: NewsItem) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      excerpt: item.excerpt ?? "",
      externalUrl: item.externalUrl ?? "",
      publishedAt: item.publishedAt
        ? new Date(item.publishedAt).toISOString().split("T")[0]
        : "",
      isVisible: item.isVisible,
    });
    setDialogOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (editingId) {
          await updateNews(editingId, form);
          toast.success("News updated");
        } else {
          await createNews(form);
          toast.success("News created");
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
      await deleteNews(id);
      toast.success("News deleted");
    });
  }

  function handleToggle(id: number, visible: boolean) {
    startTransition(async () => {
      await toggleNewsVisibility(id, visible);
    });
  }

  return (
    <div className="space-y-4">
      <Button onClick={openNew}>
        <Plus className="mr-2 h-4 w-4" />
        Add News
      </Button>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-[var(--color-ink-muted)]">
                  No news items yet.
                </TableCell>
              </TableRow>
            ) : (
              news.map((item) => (
                <TableRow key={item.id} className={isPending ? "opacity-50" : ""}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.excerpt && (
                        <p className="text-xs text-[var(--color-ink-muted)] line-clamp-1">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.publishedAt ? (
                      <Badge variant="secondary">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <span className="text-[var(--color-ink-muted)]">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={item.isVisible}
                      onCheckedChange={(checked) => handleToggle(item.id, checked)}
                    />
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
            <DialogTitle>{editingId ? "Edit News" : "New News Item"}</DialogTitle>
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
              <Label>Excerpt</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>External URL</Label>
              <Input
                value={form.externalUrl}
                onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Published Date</Label>
              <Input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isVisible}
                onCheckedChange={(checked) => setForm({ ...form, isVisible: checked })}
              />
              <Label>Visible</Label>
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
