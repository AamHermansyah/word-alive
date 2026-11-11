import { StanzaRow } from "@/components/molecules/stanza-row"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SongFollow } from "@/types"

function SongFollowingCard({
  song,
  activeStanzaId,
  onSelectStanza,
}: {
  song: SongFollow
  activeStanzaId: string
  onSelectStanza: (stanzaId: string) => void
}) {
  return (
    <Card className="min-w-0 flex-1 gap-0">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Song following</CardTitle>
        <Badge variant="info">{song.match}% match</Badge>
      </CardHeader>

      <CardContent>
        <div className="mt-3.5 text-sm font-bold md:text-[15px]">
          {song.title}
        </div>
        <div className="mt-0.5 mb-2.5 text-xs text-muted-foreground">
          {song.author} · {song.rights}
        </div>
        <div className="flex flex-col gap-1.5">
          {song.stanzas.map((stanza) => (
            <StanzaRow
              key={stanza.id}
              stanza={stanza}
              active={stanza.id === activeStanzaId}
              onSelect={() => onSelectStanza(stanza.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { SongFollowingCard }
