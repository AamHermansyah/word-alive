import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AdminStat, AdminStatTone } from "@/types/admin-customers"

const TONE: Record<AdminStatTone, string> = {
  success: "text-success",
  muted: "text-muted-foreground",
  warning: "text-warning-soft-foreground",
  danger: "text-destructive",
}

/** Small KPI card: caption, big number, one coloured note line. */
function AdminCustomersStatCard({ stat }: { stat: AdminStat }) {
  return (
    <Card className="min-w-0 gap-0 [--card-spacing:--spacing(4.5)]">
      <CardContent>
        <div className="text-xs text-muted-foreground">
          <bdi>{stat.label}</bdi>
        </div>
        <div className="mt-1 mb-0.5 text-2xl font-bold wrap-break-word md:text-[28px]">
          <bdi>{stat.value}</bdi>
        </div>
        <div className={cn("text-xs font-semibold", TONE[stat.tone])}>
          <bdi>{stat.note}</bdi>
        </div>
      </CardContent>
    </Card>
  )
}

/** Four KPI cards: one column on phones, two from `sm`, four from `xl`. */
function AdminCustomersStatGrid({
  stats,
  className,
}: {
  stats: AdminStat[]
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-4",
        className
      )}
    >
      {stats.map((stat) => (
        <AdminCustomersStatCard key={stat.label} stat={stat} />
      ))}
    </div>
  )
}

export { AdminCustomersStatCard, AdminCustomersStatGrid }
