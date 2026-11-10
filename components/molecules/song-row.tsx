import { CheckMarkIcon } from "@/components/atoms/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RIGHTS_LABEL, RIGHTS_VARIANT } from "@/lib/data/songs"
import type { Song } from "@/types"

/** Column template shared by the table header and every row. */
export const SONG_GRID =
  "grid grid-cols-[2.2fr_1fr_1.4fr_1.1fr_.9fr] items-center gap-2"

function SongRow({ song, onAdd }: { song: Song; onAdd: (id: string) => void }) {
  return (
    <li className={`${SONG_GRID} border-t border-border py-2.75`}>
      <div className="min-w-0">
        <div className="truncate text-sm font-bold">{song.title}</div>
        <div className="truncate text-xs text-muted-foreground">
          {song.author}
        </div>
      </div>
      <div className="text-[13px]">{song.language}</div>
      <div>
        <Badge variant={RIGHTS_VARIANT[song.rights]}>
          {RIGHTS_LABEL[song.rights]}
        </Badge>
      </div>
      <div className="text-[13px]">{song.usedBy}</div>
      <div>
        {song.inSet ? (
          <span className="flex items-center gap-1 text-[13px] font-semibold text-success-soft-foreground">
            <CheckMarkIcon className="size-4" />
            In your set
          </span>
        ) : song.rights === "in-review" ? (
          <Button
            variant="link"
            className="h-auto px-0 text-[13px] text-brand-text hover:no-underline"
          >
            View
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="px-3.5"
            onClick={() => onAdd(song.id)}
          >
            Add
          </Button>
        )}
      </div>
    </li>
  )
}

export { SongRow }
