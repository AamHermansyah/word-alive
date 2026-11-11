import { Button } from "@/components/ui/button"

/** A "Recent activity" line: title, meta, and a "Show again" action. */
function ActivityRow({
  title,
  meta,
  actionLabel,
  onAction,
}: {
  title: string
  meta: string
  actionLabel: string
  onAction: () => void
}) {
  return (
    <li className="flex items-center gap-3 border-t border-border py-2.5">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold wrap-break-word md:text-sm">
          {title}
        </div>
        <div className="text-xs text-muted-foreground"><bdi>{meta}</bdi></div>
      </div>
      <Button
        variant="link"
        onClick={onAction}
        className="h-auto shrink-0 px-0 py-2 text-xs text-brand-text hover:no-underline"
      >
        {actionLabel}
      </Button>
    </li>
  )
}

export { ActivityRow }
