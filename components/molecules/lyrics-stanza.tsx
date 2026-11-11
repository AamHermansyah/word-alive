import type { SongStanza } from "@/types/account"

/** One stanza (or chorus) of a song: a small caption over the serif lines. */
function LyricsStanza({ stanza }: { stanza: SongStanza }) {
  return (
    <section className="mb-4.5">
      <h3 className="mb-1 text-xs font-normal text-muted-foreground">
        {stanza.label}
      </h3>
      <p className="font-serif text-[15px] leading-[1.55] md:text-lg">
        {stanza.lines.map((line, index) => (
          <span key={index} className="block wrap-break-word">
            <bdi>{line}</bdi>
          </span>
        ))}
      </p>
    </section>
  )
}

export { LyricsStanza }
