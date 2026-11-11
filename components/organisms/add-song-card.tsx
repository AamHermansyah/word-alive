"use client"

import * as React from "react"

import { FormField } from "@/components/molecules/form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { NEW_SONG_DEFAULTS } from "@/lib/data/songs"

export type NewSong = { title: string; language: string; lyrics: string }

/** "Add a song" form. Submitting sends the song to the (mock) review queue. */
function AddSongCard({ onSubmit }: { onSubmit: (song: NewSong) => void }) {
  const [title, setTitle] = React.useState(NEW_SONG_DEFAULTS.title)
  const [language, setLanguage] = React.useState(NEW_SONG_DEFAULTS.language)
  const [lyrics, setLyrics] = React.useState(NEW_SONG_DEFAULTS.lyrics)
  const [hasRights, setHasRights] = React.useState(true)

  const canSubmit = title.trim() !== "" && lyrics.trim() !== "" && hasRights

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return
    onSubmit({ title: title.trim(), language: language.trim(), lyrics })
    setTitle("")
    setLyrics("")
  }

  return (
    <Card className="min-w-0 flex-1 gap-0 xl:flex-2">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="text-[15px] font-bold md:text-base">Add a song</div>
          <div className="mt-0.5 mb-3.5 text-xs text-muted-foreground">
            Share a song once. Other churches can find it too.
          </div>

          <FormField label="Title" htmlFor="song-title">
            <Input
              id="song-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormField>

          <FormField label="Language" htmlFor="song-language" className="mt-3">
            <Input
              id="song-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            />
          </FormField>

          <FormField label="Lyrics" htmlFor="song-lyrics" className="mt-3">
            <Textarea
              id="song-lyrics"
              value={lyrics}
              onChange={(event) => setLyrics(event.target.value)}
              className="min-h-26"
            />
          </FormField>
          <div className="mt-1 mb-3 text-xs text-muted-foreground">
            Leave a blank line between stanzas.
          </div>

          <Label className="items-start gap-2.5 rounded-md bg-background p-2.5 text-xs leading-normal font-normal md:text-[13px]">
            <Checkbox
              checked={hasRights}
              onCheckedChange={(checked) => setHasRights(checked === true)}
              className="ms-1 mt-0.75"
            />
            I have the right to share these lyrics with other churches on
            WordAlive, or they are in the public domain.
          </Label>

          <div className="mt-2.5 mb-3 text-xs text-muted-foreground">
            We review every song before others can see it. Rights holders can
            ask us to remove a song.
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
            Submit for review
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export { AddSongCard }
