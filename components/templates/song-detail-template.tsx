import Link from "next/link"

import { SongActionsCard } from "@/components/organisms/song-actions-card"
import { SongLyricsCard } from "@/components/organisms/song-lyrics-card"
import { Topbar } from "@/components/organisms/topbar"
import { Button } from "@/components/ui/button"
import type { Song } from "@/types"
import type { SongLyrics } from "@/types/account"

/**
 * One song of the library.
 *   desktop: lyrics | [facts, actions, report] side by side
 *   tablet and phone: lyrics, then the facts card
 */
function SongDetailTemplate({
  song,
  lyrics,
}: {
  song: Song
  lyrics: SongLyrics
}) {
  return (
    <>
      <Topbar title={song.title} subtitle={`${song.author} · ${song.language}`}>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/songs" />}
          className="flex-1 sm:flex-none"
        >
          Back to library
        </Button>
      </Topbar>

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start">
        <SongLyricsCard
          lyrics={lyrics}
          rights={song.rights}
          className="xl:flex-[1.36]"
        />
        <SongActionsCard song={song} className="xl:flex-1" />
      </div>
    </>
  )
}

export { SongDetailTemplate }
