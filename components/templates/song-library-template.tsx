"use client"

import * as React from "react"

import { ChipGroup } from "@/components/molecules/chip-group"
import {
  AddSongCard,
  type NewSong,
} from "@/components/organisms/add-song-card"
import { SongTableCard } from "@/components/organisms/song-table-card"
import { Topbar } from "@/components/organisms/topbar"
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
  }

  return (
    <>
      <Topbar title="Song library" subtitle={SONG_COUNT_LABEL} />

      <div className="flex flex-wrap items-center gap-2.5">
        <Input
          type="search"
          aria-label="Search songs"
          placeholder="Search by title or a lyric line"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full sm:w-105"
        />
        <ChipGroup
          label="Filter by rights"
          value={filter}
          onValueChange={setFilter}
          options={SONG_FILTERS}
        />
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <SongTableCard songs={visible} onAdd={addToSet} />
        <AddSongCard onSubmit={submitSong} />
      </div>
    </>
  )
}

export { SongLibraryTemplate }
