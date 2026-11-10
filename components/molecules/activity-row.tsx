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
    <li className="flex items-center border-t border-border py-2.5">
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground"><bdi>{meta}</bdi></div>
      </div>
      <Button
        variant="link"
        onClick={onAction}
        className="h-auto px-0 text-xs text-brand-text hover:no-underline"
      >
        {actionLabel}
      </Button>
    </li>
  )
}

export { ActivityRow }
