import { cn } from "@/lib/utils"

/**
 * "52 / 60": muted while there is room, amber in the last 10 %, red once the
 * limit is passed.
 */
function AdminPlatformCharCounter({
  count,
  max,
  id,
}: {
  count: number
  max: number
  id?: string
}) {
  const over = count > max
  const near = !over && count >= max * 0.9

  return (
    <span
      id={id}
      className={cn(
        "text-xs tabular-nums text-muted-foreground transition-colors",
        near && "font-semibold text-warning-soft-foreground",
        over && "font-semibold text-destructive"
      )}
    >
      <bdi>
        {count} / {max}
      </bdi>
    </span>
  )
}

export { AdminPlatformCharCounter }
