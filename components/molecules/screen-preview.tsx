import { cn } from "@/lib/utils"
import type { ScreenContent } from "@/types"

/** Above this many characters the slide text steps down one size. */
const LONG_TEXT = 150

/**
 * Preview of what the audience sees: maroon slide, serif text, reference at
 * the bottom.
 *
 * Nothing here has a fixed size. The slide's height comes from its text (with
 * a small floor so it never collapses), so a long verse is never clipped and a
 * short one does not push its siblings taller. The text size follows the slide
 * width and steps down for long passages.
 */
function ScreenPreview({
  content,
  className,
}: {
  content: ScreenContent | null
  className?: string
}) {
  const footer = content
    ? content.kind === "scripture" && content.version
      ? `${content.title} · ${content.version}`
      : content.title
    : ""
  const isLong = (content?.text.length ?? 0) > LONG_TEXT

  return (
    <div className={cn("@container/slide flex min-w-0 flex-1", className)}>
      <div className="flex min-h-40 w-full flex-col justify-between gap-4 rounded-lg bg-brand p-4 text-brand-foreground @md/slide:p-6.5">
        {content ? (
          <>
            <p
              className={cn(
                "font-serif leading-[1.45] wrap-break-word whitespace-pre-line",
                isLong
                  ? "text-[clamp(0.8125rem,4.2cqw,0.9375rem)] sm:text-[clamp(0.875rem,3.6cqw,1.125rem)] md:text-[clamp(0.875rem,3.6cqw,1.375rem)]"
                  : "text-[clamp(0.9375rem,5cqw,1.125rem)] sm:text-[clamp(1rem,4.6cqw,1.25rem)] md:text-[clamp(0.9375rem,4.6cqw,1.625rem)]"
              )}
            >
              <bdi>{content.text}</bdi>
            </p>
            <p className="text-xs font-semibold wrap-break-word @md/slide:text-sm">
              <bdi>{footer}</bdi>
            </p>
          </>
        ) : (
          <p className="m-auto text-sm font-semibold opacity-70">
            Screen cleared
          </p>
        )}
      </div>
    </div>
  )
}

export { ScreenPreview }
