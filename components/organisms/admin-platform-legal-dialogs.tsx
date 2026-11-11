"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { sanitizeHtml } from "@/lib/admin-platform"

/** Asks before leaving a document that has unsaved edits. */
function AdminPlatformLegalDiscardDialog({
  open,
  from,
  to,
  onKeepEditing,
  onDiscard,
}: {
  open: boolean
  from: string
  to: string
  onKeepEditing: () => void
  onDiscard: () => void
}) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onKeepEditing()
      }}
    >
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Your edits to “{from}” are not saved as a draft yet. Opening{" "}
            “{to}” now will discard them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDiscard}>
            Discard and switch
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/** Read-only view of the draft exactly as users would read it. */
function AdminPlatformLegalPreviewDialog({
  open,
  onOpenChange,
  title,
  html,
  draftVersion,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  html: string
  draftVersion: number
}) {
  const safeHtml = React.useMemo(() => (open ? sanitizeHtml(html) : ""), [open, html])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>Draft v{draftVersion}, as users will see it.</DialogDescription>
        </DialogHeader>
        <article className="max-h-[calc(100dvh-14rem)] overflow-y-auto rounded-xl border border-border p-5 text-sm leading-[1.6] wrap-break-word">
          <h3 className="mb-3.5 text-[22px] font-bold">{title || "Untitled"}</h3>
          <div
            className="[&_a]:text-brand-text [&_a]:underline [&_h1]:mb-1.5 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:ps-5"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </article>
      </DialogContent>
    </Dialog>
  )
}

export { AdminPlatformLegalDiscardDialog, AdminPlatformLegalPreviewDialog }
