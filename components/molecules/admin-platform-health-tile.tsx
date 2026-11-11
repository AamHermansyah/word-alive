import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import { FadeIn } from "@/components/atoms/fade-in"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { HealthStatus, HealthTile } from "@/types/admin-platform"

const DOT: Record<HealthStatus, { className: string; label: string }> = {
  healthy: { className: "bg-success", label: "Healthy" },
  slow: { className: "bg-chart-4", label: "Slow" },
  failed: { className: "bg-destructive", label: "Failed" },
}

/**
 * One service: coloured dot, name and a status line. A tile with an `href`
 * (payment webhooks) is a link to the page that explains it.
 */
function AdminPlatformHealthTile({
  tile,
  refreshing,
}: {
  tile: HealthTile
  refreshing: boolean
}) {
  const dot = DOT[tile.status]

  const card = (
    <Card
      size="sm"
      className={cn(
        "h-full min-w-0 gap-0 md:min-h-21",
        tile.href && "transition-colors group-hover/tile:bg-muted"
      )}
    >
      <CardContent>
        <div className="flex items-center gap-2">
          <span
            role="img"
            aria-label={dot.label}
            className={cn(
              "size-2.25 shrink-0 rounded-full",
              dot.className,
              refreshing && "animate-pulse"
            )}
          />
          <span className="min-w-0 text-sm font-bold wrap-break-word">{tile.name}</span>
          {tile.href ? (
            <ChevronRightIcon
              aria-hidden="true"
              className="ms-auto hidden size-4 shrink-0 text-muted-foreground sm:block rtl:rotate-180"
            />
          ) : null}
        </div>
        <FadeIn
          key={`${tile.status}-${tile.detail}`}
          className="mt-1.5 text-xs text-muted-foreground wrap-break-word"
        >
          <bdi>{tile.detail}</bdi>
        </FadeIn>
      </CardContent>
    </Card>
  )

  if (!tile.href) return card

  return (
    <Link
      href={tile.href}
      aria-label={`${tile.name}: ${tile.detail}. Open payments`}
      className="group/tile block min-w-0 rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {card}
    </Link>
  )
}

export { AdminPlatformHealthTile }
