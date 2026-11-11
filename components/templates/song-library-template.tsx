"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"

import { ChipGroup } from "@/components/molecules/chip-group"
import {
  AddSongCard,
  type NewSong,
} from "@/components/organisms/add-song-card"
import { SongTableCard } from "@/components/organisms/song-table-card"
import { Topbar } from "@/components/organisms/topbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SONGS,
  SONG_COUNT_LABEL,
  SONG_FILTERS,
  type SongFilter,
} from "@/lib/data/songs"
import type { Song } from "@/types"

/** Song library: search + rights filter, results table, add-a-song form. */
function SongLibraryTemplate() {
  const [songs, setSongs] = React.useState<Song[]>(SONGS)
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState<SongFilter>("all")

  const visible = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return songs.filter((song) => {
      const matchesFilter = filter === "all" || song.rights === filter
      const matchesQuery =
        needle === "" ||
        song.title.toLowerCase().includes(needle) ||
        song.author.toLowerCase().includes(needle)
      return matchesFilter && matchesQuery
    })
  }, [songs, query, filter])

  function addToSet(id: string) {
    setSongs((items) =>
      items.map((song) => (song.id === id ? { ...song, inSet: true } : song))
    )
  }

  function submitSong(song: NewSong) {
    setSongs((items) => [
      {
        id: `upload-${Date.now()}`,
        title: song.title,
        author: "Your upload",
        language: song.language || "English",
        rights: "in-review",
        usedBy: "Only you",
      },
      ...items,
    ])
    toast.success("Song sent for review", {
      description: "Other churches can find it once it is approved.",
    })
  }

  return (
    <>
      <Topbar title="Song library" subtitle={SONG_COUNT_LABEL}>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/songs/mine" />}
          className="flex-1 sm:flex-none"
        >
          My songs
        </Button>
      </Topbar>

      <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
        <Input
          type="search"
          aria-label="Search songs"
          placeholder="Search by title or a lyric line"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full sm:w-105 sm:max-w-full"
        />
        <ChipGroup
          label="Filter by rights"
          value={filter}
          onValueChange={setFilter}
          options={SONG_FILTERS}
        />
      </div>

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row">
        <SongTableCard songs={visible} onAdd={addToSet} />
        <AddSongCard onSubmit={submitSong} />
      </div>
    </>
  )
}

export { SongLibraryTemplate }
