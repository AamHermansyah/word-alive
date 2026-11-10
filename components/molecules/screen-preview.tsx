import { cn } from "@/lib/utils"
import type { ScreenContent } from "@/types"

/**
 * The 16:9 preview of what the audience sees: maroon slide, serif text,
 * reference at the bottom. 456x257 on desktop, fills its card on tablet.
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

  return (
    <div
      className={cn(
        "flex aspect-video w-full flex-none flex-col justify-between overflow-hidden rounded-lg bg-brand p-6.5 text-brand-foreground xl:h-64.25 xl:w-114",
        className
      )}
    >
      {content ? (
        <>
          <p className="font-serif text-[26px] leading-[1.45] whitespace-pre-line xl:text-[21px]">
            <bdi>{content.text}</bdi>
          </p>
          <p className="text-sm font-semibold"><bdi>{footer}</bdi></p>
        </>
      ) : (
        <p className="m-auto text-sm font-semibold opacity-70">
          Screen cleared
        </p>
      )}
    </div>
  )
}

export { ScreenPreview }
