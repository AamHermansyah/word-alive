"use client"

import {
  AddSongCard,
  type NewSong,
} from "@/components/organisms/add-song-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { BLANK_SONG } from "@/lib/data/account"

/**
 * The library's "Add a song" form in a dialog, so a church can share a song
 * (or fix a rejected one and send it again) without leaving "My songs".
 * `editing` is the song being fixed; without it the form starts blank.
 */
function AddSongDialog({
  open,
  onOpenChange,
  editing,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Pre-filled values when a rejected song is edited and resubmitted. */
  editing?: NewSong
  onSubmit: (song: NewSong) => void
}) {
  const heading = editing ? "Edit and resubmit" : "Add a song"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-xl p-0 sm:max-w-md">
        <DialogTitle className="sr-only">{heading}</DialogTitle>
        <DialogDescription className="sr-only">
          Share the song with other churches. We review it before it is
          visible.
        </DialogDescription>
        <AddSongCard
          className="border-0"
          heading={heading}
          submitLabel={editing ? "Resubmit for review" : "Submit for review"}
          initial={editing ?? BLANK_SONG}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

export { AddSongDialog }
