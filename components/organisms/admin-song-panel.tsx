"use client"

import * as React from "react"

import { AdminSongListCard } from "@/components/organisms/admin-song-list-card"
import { AdminSongReviewCard } from "@/components/organisms/admin-song-review-card"
import { useAdminRevealDetail } from "@/hooks/use-admin-reveal-detail"
import type { AdminSongCatalogue } from "@/hooks/use-admin-song-catalogue"
import { foldForSearch } from "@/lib/admin-catalogue-validation"
import { SONG_LIST_PREVIEW_COUNT } from "@/lib/data/admin-catalogue"

/**
 * The review queue or the whole catalogue: the song list beside the card of
 * the picked song. Mount it with `key={view}` so paging and the pick reset
 * when the tab changes.
 */
function AdminSongPanel({
  view,
  catalogue,
  query,
}: {
  view: "review" | "all"
  catalogue: AdminSongCatalogue
  query: string
}) {
  const [expanded, setExpanded] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState<string>()
  const { ref, reveal } = useAdminRevealDetail()

  const source = view === "review" ? catalogue.queue : catalogue.songs
  const needle = foldForSearch(query.trim())
  const matches = needle
    ? source.filter((song) =>
        foldForSearch(
          `${song.title} ${song.language} ${song.submittedBy}`
        ).includes(needle)
      )
    : source

  const shown =
    needle || expanded ? matches : matches.slice(0, SONG_LIST_PREVIEW_COUNT)
  const selected = matches.find((song) => song.id === selectedId) ?? matches[0]

  const emptyMessage = needle
    ? `No songs match “${query.trim()}”.`
    : view === "review"
      ? "The review queue is clear."
      : "No songs yet."

  return (
    <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <AdminSongListCard
        label={view === "review" ? "Review queue" : "All songs"}
        songs={shown}
        total={matches.length}
        selectedId={selected?.id}
        onSelect={(id) => {
          setSelectedId(id)
          reveal()
        }}
        expanded={expanded}
        onToggleExpanded={() => setExpanded((current) => !current)}
        previewCount={needle ? matches.length : SONG_LIST_PREVIEW_COUNT}
        emptyMessage={emptyMessage}
      />
      <AdminSongReviewCard
        ref={ref}
        className="scroll-mt-4"
        song={selected}
        queueIsEmpty={catalogue.queue.length === 0 && !needle}
        onApprove={catalogue.approve}
        onReject={catalogue.reject}
        onRemove={catalogue.removeSong}
        onBackToQueue={catalogue.backToQueue}
      />
    </div>
  )
}

export { AdminSongPanel }
