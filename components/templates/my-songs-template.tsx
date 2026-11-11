"use client"

import * as React from "react"
import { toast } from "sonner"

import { FadeIn } from "@/components/atoms/fade-in"
import { MySongsTab, MySongsTabList } from "@/components/molecules/my-songs-tabs"
import { AddSongDialog } from "@/components/organisms/add-song-dialog"
import type { NewSong } from "@/components/organisms/add-song-card"
import { ContributionTableCard } from "@/components/organisms/contribution-table-card"
import { SetSongsTableCard } from "@/components/organisms/set-songs-table-card"
import { Topbar } from "@/components/organisms/topbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { CONTRIBUTIONS, SET_SONGS } from "@/lib/data/account"
import type { Contribution, SetSong } from "@/types/account"

type MySongsTabId = "contributions" | "set"

/** The form dialog is closed, adding a new song, or fixing a rejected one. */
type DialogState = { open: boolean; editing: Contribution | null }

/**
 * My songs: what the church added to the shared library (with review status)
 * and the songs in its own set, as two tabs. "Add a song" and "Edit" open the
 * library's add-song form in a dialog; a sent song joins the list as "In
 * review".
 */
function MySongsTemplate() {
  const [tab, setTab] = React.useState<MySongsTabId>("contributions")
  const [contributions, setContributions] =
    React.useState<Contribution[]>(CONTRIBUTIONS)
  const [setSongs, setSetSongs] = React.useState<SetSong[]>(SET_SONGS)
  const [dialog, setDialog] = React.useState<DialogState>({
    open: false,
    editing: null,
  })

  function openAdd() {
    setDialog({ open: true, editing: null })
  }

  function openEdit(row: Contribution) {
    setDialog({ open: true, editing: row })
  }

  function submitSong(song: NewSong) {
    const editing = dialog.editing
    if (editing) {
      setContributions((rows) =>
        rows.map((row) =>
          row.id === editing.id
            ? {
                ...row,
                ...song,
                status: "in-review",
                note: "Waiting for review",
              }
            : row
        )
      )
      toast.success("Song sent again", {
        description: "We will review it and let you know.",
      })
    } else {
      setContributions((rows) => [
        {
          id: `c-${Date.now()}`,
          title: song.title,
          language: song.language || "English",
          lyrics: song.lyrics,
          status: "in-review",
          note: "Waiting for review",
        },
        ...rows,
      ])
      toast.success("Song sent for review", {
        description: "Other churches can find it once it is approved.",
      })
    }
    setTab("contributions")
    setDialog({ open: false, editing: null })
  }

  function removeFromSet(row: SetSong) {
    setSetSongs((rows) => rows.filter((item) => item.id !== row.id))
    toast("Removed from your set", { description: row.title })
  }

  return (
    <>
      <Topbar
        title="My songs"
        subtitle="Songs you added and songs in your set"
      >
        <Button className="flex-1 sm:flex-none" onClick={openAdd}>
          Add a song
        </Button>
      </Topbar>

      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as MySongsTabId)}
        className="gap-4 md:gap-5"
      >
        <MySongsTabList aria-label="My songs">
          <MySongsTab value="contributions">
            <span>
              My contributions · <bdi>{contributions.length}</bdi>
            </span>
          </MySongsTab>
          <MySongsTab value="set">
            <span>
              My set · <bdi>{setSongs.length}</bdi>
            </span>
          </MySongsTab>
        </MySongsTabList>

        <TabsContent value="contributions">
          <FadeIn>
            <ContributionTableCard rows={contributions} onEdit={openEdit} />
          </FadeIn>
        </TabsContent>
        <TabsContent value="set">
          <FadeIn>
            <SetSongsTableCard rows={setSongs} onRemove={removeFromSet} />
          </FadeIn>
        </TabsContent>
      </Tabs>

      <AddSongDialog
        open={dialog.open}
        onOpenChange={(open) =>
          setDialog((state) => ({ ...state, open }))
        }
        editing={
          dialog.editing
            ? {
                title: dialog.editing.title,
                language: dialog.editing.language,
                lyrics: dialog.editing.lyrics ?? "",
              }
            : undefined
        }
        onSubmit={submitSong}
      />
    </>
  )
}

export { MySongsTemplate }
