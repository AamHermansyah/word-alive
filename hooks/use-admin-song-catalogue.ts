"use client"

import * as React from "react"
import { toast } from "sonner"

import { songCatalogueStore } from "@/lib/admin-catalogue-store"
import type {
  CatalogueSong,
  CatalogueSongStatus,
  TakedownRequest,
} from "@/types/admin-catalogue"

import { useAdminCatalogueStore } from "./use-admin-catalogue-store"

const IN_QUEUE: CatalogueSongStatus[] = ["pending", "reported"]

/** A song waits in the review queue while it is pending or reported. */
export function isInReviewQueue(song: CatalogueSong) {
  return IN_QUEUE.includes(song.status)
}

/**
 * The song catalogue shared by "/admin/songs" (review queue, all songs) and
 * "/admin/songs/takedowns". Every decision updates the song, the counts in
 * the tab bar and the takedown list at once, and answers with a toast (the
 * approve / reject toasts offer "Undo").
 */
export function useAdminSongCatalogue() {
  const { songs, takedowns } = useAdminCatalogueStore(songCatalogueStore)

  const queue = React.useMemo(() => songs.filter(isInReviewQueue), [songs])
  const openTakedowns = React.useMemo(
    () => takedowns.filter((request) => request.status === "open"),
    [takedowns]
  )

  const setSong = (id: string, patch: Partial<CatalogueSong>) =>
    songCatalogueStore.set((current) => ({
      ...current,
      songs: current.songs.map((song) =>
        song.id === id ? { ...song, ...patch } : song
      ),
    }))

  const setTakedown = (id: string, patch: Partial<TakedownRequest>) =>
    songCatalogueStore.set((current) => ({
      ...current,
      takedowns: current.takedowns.map((request) =>
        request.id === id ? { ...request, ...patch } : request
      ),
    }))

  /** Move a song to a decided status and offer to take it back. */
  function decide(
    song: CatalogueSong,
    status: "approved" | "rejected",
    message: string,
    description: string
  ) {
    const previous = song.status
    setSong(song.id, { status })
    toast.success(message, {
      description,
      action: {
        label: "Undo",
        onClick: () => setSong(song.id, { status: previous }),
      },
    })
  }

  function approve(song: CatalogueSong) {
    decide(
      song,
      "approved",
      `“${song.title}” approved`,
      "It is now in the shared library for every church."
    )
  }

  function reject(song: CatalogueSong) {
    decide(
      song,
      "rejected",
      `“${song.title}” rejected`,
      `${song.submittedBy} is told it was not accepted.`
    )
  }

  /** Take a song out of the library; open takedown requests for it are closed too. */
  function removeSong(song: CatalogueSong) {
    songCatalogueStore.set((current) => ({
      songs: current.songs.map((entry) =>
        entry.id === song.id ? { ...entry, status: "removed" } : entry
      ),
      takedowns: current.takedowns.map((request) =>
        request.songId === song.id && request.status === "open"
          ? { ...request, status: "removed" }
          : request
      ),
    }))
    toast.success(`“${song.title}” removed from the library`, {
      description: "It no longer appears in any church's song library.",
    })
  }

  function backToQueue(song: CatalogueSong) {
    setSong(song.id, { status: song.reports > 0 ? "reported" : "pending" })
    toast(`“${song.title}” is back in the review queue`)
  }

  // ---- takedown requests ----

  function toggleContacted(request: TakedownRequest) {
    setTakedown(request.id, { contacted: !request.contacted })
  }

  function toggleOwnership(request: TakedownRequest) {
    setTakedown(request.id, { ownershipVerified: !request.ownershipVerified })
  }

  function removeForTakedown(request: TakedownRequest, note: string) {
    songCatalogueStore.set((current) => ({
      songs: current.songs.map((song) =>
        song.id === request.songId ? { ...song, status: "removed" } : song
      ),
      takedowns: current.takedowns.map((entry) =>
        entry.id === request.id
          ? { ...entry, status: "removed", note: note.trim() }
          : entry
      ),
    }))
    toast.success(`“${request.songTitle}” removed`, {
      description: note.trim()
        ? "The requester is told. Your note is saved to the audit log."
        : "The requester is told it was removed.",
    })
  }

  function rejectTakedown(request: TakedownRequest, note: string) {
    setTakedown(request.id, { status: "rejected", note: note.trim() })
    toast.success("Takedown request rejected", {
      description: note.trim()
        ? "The song stays in the library. Your note is saved to the audit log."
        : "The song stays in the library and the requester is told.",
    })
  }

  return {
    songs,
    queue,
    takedowns,
    openTakedowns,
    approve,
    reject,
    removeSong,
    backToQueue,
    toggleContacted,
    toggleOwnership,
    removeForTakedown,
    rejectTakedown,
  }
}

export type AdminSongCatalogue = ReturnType<typeof useAdminSongCatalogue>
