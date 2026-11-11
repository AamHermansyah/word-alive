"use client"

import * as React from "react"

import { FadeIn } from "@/components/atoms/fade-in"
import { AdminCatalogueCheckItem } from "@/components/molecules/admin-catalogue-check-item"
import { AdminSongStatusBadge } from "@/components/organisms/admin-song-list-card"
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
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CatalogueSong } from "@/types/admin-catalogue"

/**
 * Detail card of the song picked in the list: lyrics preview, the review
 * checks and the decision buttons. What the buttons offer follows the song's
 * status: pending and reported songs can be approved, rejected or removed,
 * approved ones removed, rejected and removed ones sent back to the queue.
 */
function AdminSongReviewCard({
  song,
  queueIsEmpty,
  onApprove,
  onReject,
  onRemove,
  onBackToQueue,
  className,
  ref,
}: {
  song: CatalogueSong | undefined
  /** Nothing is waiting for review (used for the empty message). */
  queueIsEmpty: boolean
  onApprove: (song: CatalogueSong) => void
  onReject: (song: CatalogueSong) => void
  onRemove: (song: CatalogueSong) => void
  onBackToQueue: (song: CatalogueSong) => void
  className?: string
  ref?: React.Ref<HTMLDivElement>
}) {
  const [confirmRemove, setConfirmRemove] = React.useState(false)

  if (!song) {
    return (
      <Card ref={ref} className={className}>
        <CardContent>
          <h2 className="text-sm font-bold md:text-[15px]">
            {queueIsEmpty ? "Review queue is clear" : "No song selected"}
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">
            <bdi>
              {queueIsEmpty
                ? "Every submitted song has been reviewed."
                : "No song matches your search."}
            </bdi>
          </p>
        </CardContent>
      </Card>
    )
  }

  const waiting = song.status === "pending" || song.status === "reported"

  return (
    <Card ref={ref} className={className}>
      <CardContent>
        <FadeIn key={`${song.id}-${song.status}`}>
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <h2 className="min-w-0 text-sm font-bold wrap-break-word md:text-[15px]">
              <bdi>
                {waiting ? "Review: " : null}
                {song.title}
              </bdi>
            </h2>
            {waiting ? null : <AdminSongStatusBadge status={song.status} />}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            <bdi>
              {song.language} · from {song.submittedBy} · {song.submittedOn}
            </bdi>
          </p>

          <div className="mt-3 rounded-xl bg-background p-3.5 font-serif text-sm leading-[1.6]">
            {song.lyrics ? (
              song.lyrics.map((line) => (
                <div key={line} dir="auto">
                  {line}
                </div>
              ))
            ) : (
              <p className="font-sans text-[13px] text-muted-foreground">
                <bdi>No lyrics preview is shown for this song.</bdi>
              </p>
            )}
          </div>

          <ul className="my-3.5">
            <AdminCatalogueCheckItem
              state={song.rightsConfirmed ? "done" : "warning"}
              className="py-1"
            >
              {song.rightsConfirmed
                ? "Rights confirmed by uploader"
                : "Rights not confirmed by uploader"}
            </AdminCatalogueCheckItem>
            <AdminCatalogueCheckItem
              state={song.duplicateOf ? "warning" : "done"}
              className="py-1"
            >
              {song.duplicateOf
                ? `Possible duplicate: ${song.duplicateOf}`
                : "No duplicate in the catalogue"}
            </AdminCatalogueCheckItem>
            <AdminCatalogueCheckItem
              state={song.reports > 0 ? "warning" : "done"}
              className="py-1"
            >
              {song.reports > 0
                ? `${song.reports} ${song.reports === 1 ? "report" : "reports"}`
                : "No reports"}
            </AdminCatalogueCheckItem>
          </ul>

          {waiting ? (
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => onApprove(song)}>Approve</Button>
              <Button variant="outline" onClick={() => onReject(song)}>
                Reject
              </Button>
            </div>
          ) : null}

          {song.status === "rejected" || song.status === "removed" ? (
            <Button
              variant="outline"
              className="w-full whitespace-normal"
              onClick={() => onBackToQueue(song)}
            >
              Move back to the review queue
            </Button>
          ) : (
            <Button
              variant="outline"
              className={cn(
                "w-full text-destructive hover:text-destructive",
                waiting && "mt-2"
              )}
              onClick={() => setConfirmRemove(true)}
            >
              Remove from library
            </Button>
          )}
        </FadeIn>
      </CardContent>

      <AlertDialog open={confirmRemove} onOpenChange={setConfirmRemove}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove “<bdi>{song.title}</bdi>” from the library?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <bdi>
                No church will find it in the song library any more. This is
                recorded in the audit log.
              </bdi>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmRemove(false)
                onRemove(song)
              }}
            >
              Remove song
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export { AdminSongReviewCard }
