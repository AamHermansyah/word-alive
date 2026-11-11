import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** Summary box of the service history: label, big value, one line of context. */
function HistoryStatCard({
  label,
  value,
  caption,
  className,
}: {
  label: string
  value: string
  caption: string
  className?: string
}) {
  return (
    <Card
      className={cn(
        "min-w-0 flex-1 gap-0 [--card-spacing:--spacing(4)] md:[--card-spacing:--spacing(4.5)]",
        className
      )}
    >
      <CardContent>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="mt-1 mb-0.5 text-2xl font-bold wrap-break-word md:text-[28px]">
          <bdi>{value}</bdi>
        </div>
        <div className="text-xs font-semibold text-muted-foreground">
          {caption}
        </div>
      </CardContent>
    </Card>
  )
}

export { HistoryStatCard }
