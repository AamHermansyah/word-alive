import { projectorTextSize, SCRIPTURE_FONT_STACK } from "@/lib/console"
import type { ProjectorTextSize } from "@/lib/console"
import { cn } from "@/lib/utils"

/**
 * Text sizes of a projector slide, as a `clamp()` of the screen width (`cqw`
 * of the slide's `@container`). The first size matches the mockup at 1280px
 * wide; each step down keeps a longer passage inside a 16:9 screen. The
 * floor keeps it readable on a phone, the cap stops it growing without limit
 * on a very large display.
 */
const SIZES = {
  scripture: {
    base: "text-[clamp(1.375rem,3.75cqw,7.5rem)]",
    medium: "text-[clamp(1.25rem,3.1cqw,6.25rem)]",
    long: "text-[clamp(1.125rem,2.6cqw,5.25rem)]",
    huge: "text-[clamp(1rem,2.2cqw,4.5rem)]",
  },
  lyrics: {
    base: "text-[clamp(1.5rem,4.375cqw,8.75rem)]",
    medium: "text-[clamp(1.375rem,3.75cqw,7.5rem)]",
    long: "text-[clamp(1.25rem,3.1cqw,6.25rem)]",
    huge: "text-[clamp(1.125rem,2.6cqw,5.25rem)]",
  },
} as const satisfies Record<string, Record<ProjectorTextSize, string>>

/** Character counts where the text steps down one size. */
const STEPS = {
  scripture: [200, 320, 480],
  lyrics: [180, 260, 380],
} as const

/**
 * The big centred text of a projector slide. The size follows the screen
 * width and steps down with the length of the text (for lyrics, with the
 * number of lines too). `lang` lets the browser pick matching glyphs for any
 * script, and `dir="auto"` lets a right-to-left passage read correctly.
 */
function ProjectorText({
  kind,
  text,
  lang,
  className,
}: {
  kind: keyof typeof SIZES
  text: string
  lang: string
  className?: string
}) {
  const lines = text.split("\n").length
  const weight = kind === "lyrics" ? Math.max(text.length, lines * 40) : text.length
  const size = projectorTextSize(weight, STEPS[kind])

  return (
    <p
      lang={lang}
      dir="auto"
      style={{ fontFamily: SCRIPTURE_FONT_STACK }}
      className={cn(
        "text-center wrap-break-word whitespace-pre-line",
        SIZES[kind][size],
        // After the size: class merging treats a font size as also setting
        // the line height, so an earlier `leading-*` would be dropped.
        kind === "lyrics" ? "leading-[1.35]" : "leading-[1.4]",
        className
      )}
    >
      {text}
    </p>
  )
}

export { ProjectorText }
