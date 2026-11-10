import { cn } from "@/lib/utils"
import type { Stanza } from "@/types"

/** A stanza line in the song-following list; the active one is highlighted. */
function StanzaRow({
  stanza,
  active,
  onSelect,
}: {
  stanza: Stanza
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={cn(
        "truncate rounded-sm px-2.5 py-2 text-start text-[13px] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        active ? "bg-info text-info-foreground" : "bg-background"
      )}
    >
      Stanza {stanza.number} · {stanza.firstLine}
    </button>
  )
}

export { StanzaRow }
