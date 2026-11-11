import { LyricsStanza } from "@/components/molecules/lyrics-stanza"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { RIGHTS_LABEL, RIGHTS_VARIANT } from "@/lib/data/songs"
import { cn } from "@/lib/utils"
import type { SongRights } from "@/types"
import type { SongLyrics } from "@/types/account"

/**
 * The words of a song, stanza by stanza, with its rights badge. A song whose
 * words are not shown (licensed) or not written yet shows a short note instead
 * of an empty card.
 */
function SongLyricsCard({
  lyrics,
  rights,
  className,
}: {
  lyrics: SongLyrics
  rights: SongRights
  className?: string
}) {
  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <CardTitle className="text-base font-bold">Lyrics</CardTitle>
          <Badge variant={RIGHTS_VARIANT[rights]}>{RIGHTS_LABEL[rights]}</Badge>
        </div>

        {lyrics.stanzas.length > 0 ? (
          lyrics.stanzas.map((stanza) => (
            <LyricsStanza key={stanza.id} stanza={stanza} />
          ))
        ) : (
          <p className="text-[13px] leading-relaxed text-muted-foreground md:text-sm">
            {lyrics.notice ?? "No lyrics have been added to this song yet."}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export { SongLyricsCard }
