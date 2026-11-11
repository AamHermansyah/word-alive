import { SONG_GRID, SongRow } from "@/components/molecules/song-row"
import { Card, CardContent } from "@/components/ui/card"
import type { Song } from "@/types"

function SongTableCard({
  songs,
  onAdd,
}: {
  songs: Song[]
  onAdd: (id: string) => void
}) {
  return (
    <Card className="min-w-0 gap-0 xl:flex-3">
      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col">
          <div
            className={`${SONG_GRID} hidden pb-2.5 text-xs text-muted-foreground md:grid`}
          >
            <span>Song</span>
            <span>Language</span>
            <span>Rights</span>
            <span>Used by</span>
            <span />
          </div>

          {songs.length > 0 ? (
            <ul className="flex-1">
              {songs.map((song) => (
                <SongRow key={song.id} song={song} onAdd={onAdd} />
              ))}
            </ul>
          ) : (
            <p className="border-t border-border py-8 text-center text-sm text-muted-foreground">
              No songs match your search.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { SongTableCard }
