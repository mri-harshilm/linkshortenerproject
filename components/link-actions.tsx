"use client";

import { useState, useTransition } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction, deleteLinkAction } from "@/app/dashboard/actions";

type Link = {
  id: number;
  url: string;
  shortCode: string;
};

export function LinkActions({ link }: { link: Link }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [url, setUrl] = useState(link.url);
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleEditOpenChange(open: boolean) {
    setEditOpen(open);
    if (!open) {
      setUrl(link.url);
      setEditError(null);
    }
  }

  function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setEditError(null);
    startTransition(async () => {
      const result = await updateLinkAction({ id: link.id, url });
      if ("error" in result) {
        setEditError(result.error);
      } else {
        setEditOpen(false);
      }
    });
  }

  function handleDelete() {
    setDeleteError(null);
    startTransition(async () => {
      const result = await deleteLinkAction({ id: link.id });
      if ("error" in result) {
        setDeleteError(result.error);
      } else {
        setDeleteOpen(false);
      }
    });
  }

  return (
    <div className="flex items-center gap-1">
      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={handleEditOpenChange}>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setEditOpen(true)}
          aria-label="Edit link"
        >
          <PencilIcon />
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription>
              Update the destination URL for{" "}
              <span className="font-mono font-medium">{link.shortCode}</span>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`edit-url-${link.id}`}>Destination URL</Label>
              <Input
                id={`edit-url-${link.id}`}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            {editError && (
              <p className="text-sm text-destructive">{editError}</p>
            )}
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setDeleteOpen(true)}
          aria-label="Delete link"
          className="text-destructive hover:text-destructive"
        >
          <Trash2Icon />
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-mono font-medium">{link.shortCode}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <p className="text-sm text-destructive">{deleteError}</p>
          )}
          <DialogFooter showCloseButton>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
