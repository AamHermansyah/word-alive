import { ProjectorText } from "@/components/atoms/projector-text"
import type { LyricsSlide } from "@/types/console"

/**
 * Audience screen with a song stanza: navy slide, the song and stanza at the
 * top start, the lines centred in serif. Same sizing rules as the scripture
 * screen (width-based `clamp()`, steps down for long stanzas, grows instead of
 * clipping).
 */
function LyricsScreenTemplate({ slide }: { slide: LyricsSlide }) {
  return (
    <main className="@container flex flex-1 flex-col bg-info text-info-foreground">
      <div className="grid flex-1 grid-rows-[1fr_auto_1fr] gap-[2cqw] px-[clamp(1.25rem,5cqw,8rem)] py-[clamp(1.25rem,4.06cqw,6.5rem)]">
        <p className="self-start text-[clamp(0.875rem,1.40625cqw,2.25rem)] font-semibold text-info-foreground/80">
          <bdi>{slide.heading}</bdi>
        </p>
        <ProjectorText
          kind="lyrics"
          text={slide.text}
          lang={slide.lang}
          className="mx-auto max-w-[90cqw]"
        />
        <div aria-hidden="true" />
      </div>
    </main>
  )
}

export { LyricsScreenTemplate }
