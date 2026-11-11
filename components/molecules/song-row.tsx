import { CheckMarkIcon } from "@/components/atoms/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RIGHTS_LABEL, RIGHTS_VARIANT } from "@/lib/data/songs"
import type { Song } from "@/types"

/** Column template shared by the table header and every row (md and up). */
export const SONG_GRID =
  "md:grid md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.1fr)_minmax(0,.9fr)] md:items-center md:gap-2"

/**
 * One song. Phones get a compact two-line card (title + action, then the
 * details); from `md` the details join the shared table columns.
 */
function SongRow({ song, onAdd }: { song: Song; onAdd: (id: string) => void }) {
  return (
    <li
      className={`${SONG_GRID} grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 border-t border-border py-3 first:border-t-0 md:py-2.75 md:first:border-t`}
    >
      <div className="min-w-0">
        <div className="text-[13px] font-bold wrap-break-word md:text-sm">
          {song.title}
        </div>
        <div className="text-xs text-muted-foreground wrap-break-word">
          {song.author}
        </div>
      </div>

      <div className="col-start-1 row-start-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground md:contents md:text-[13px] md:text-foreground">
        <div className="md:text-[13px]">{song.language}</div>
        <div>
          <Badge variant={RIGHTS_VARIANT[song.rights]}>
            {RIGHTS_LABEL[song.rights]}
          </Badge>
        </div>
        <div className="md:text-[13px]">{song.usedBy}</div>
      </div>

      <div className="col-start-2 row-span-2 row-start-1 justify-self-end md:col-auto md:row-auto md:row-start-auto md:justify-self-start">
        {song.inSet ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-success-soft-foreground md:text-[13px]">
            <CheckMarkIcon className="size-4" />
            In your set
          </span>
        ) : song.rights === "in-review" ? (
          <Button
            variant="link"
            className="h-auto px-0 py-2 text-xs text-brand-text hover:no-underline md:text-[13px]"
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
