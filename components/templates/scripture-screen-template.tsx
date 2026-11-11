import { ProjectorText } from "@/components/atoms/projector-text"
import type { ScriptureSlide } from "@/types/console"

/**
 * Audience screen with a verse: maroon slide, the verse centred in serif,
 * the reference at the bottom start and the translation credit at the bottom
 * end. No chrome.
 *
 * The slide fills the viewport but is never a fixed box: it grows with a long
 * verse. All sizes are `cqw` clamps of the screen width, so the 1280px layout
 * of the mockup scales to any projector. The verse sits in the middle row of a
 * three-row grid, so it stays truly centred and the footer can never overlap it.
 * On phones the footer sits higher, clear of the floating page switcher.
 */
function ScriptureScreenTemplate({ slide }: { slide: ScriptureSlide }) {
  return (
    <main className="@container flex flex-1 flex-col bg-brand text-brand-foreground">
      <div className="grid flex-1 grid-rows-[1fr_auto_1fr] gap-[2cqw] px-[clamp(1.25rem,5cqw,8rem)] pt-[clamp(1.25rem,4.4cqw,7rem)] pb-24 md:pb-[clamp(1.25rem,4.4cqw,7rem)]">
        <div aria-hidden="true" />
        <ProjectorText
          kind="scripture"
          text={slide.text}
          lang={slide.lang}
          className="mx-auto max-w-[81.25cqw]"
        />
        <footer className="flex flex-wrap items-baseline justify-between gap-x-[2cqw] gap-y-1 self-end">
          <p className="text-[clamp(1rem,2.1875cqw,3.5rem)] font-semibold">
            <bdi>
              {slide.reference} · {slide.versionCode}
            </bdi>
          </p>
          <p className="text-[clamp(0.75rem,1.09375cqw,1.75rem)] text-brand-foreground/80">
            <bdi>
              {slide.versionName} · {slide.rights}
            </bdi>
          </p>
        </footer>
      </div>
    </main>
  )
}

export { ScriptureScreenTemplate }
