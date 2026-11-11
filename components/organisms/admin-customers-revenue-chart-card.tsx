"use client"

import { AdminCustomersCardHeading } from "@/components/molecules/admin-customers-card-heading"
import { Card, CardContent } from "@/components/ui/card"
import { useAdminCustomersGrowIn } from "@/hooks/use-admin-customers-ui"
import { cn } from "@/lib/utils"
import type { AdminRevenueBar } from "@/types/admin-customers"

/** Bars use up to this share of the plot, like the mockup (130 of 150). */
const PEAK_SHARE = 130 / 150

function RevenueBars({
  bars,
  label,
}: {
  bars: AdminRevenueBar[]
  label: string
}) {
  const grown = useAdminCustomersGrowIn()
  const peak = Math.max(...bars.map((bar) => bar.amount))

  return (
    <div
      role="img"
      aria-label={label}
      className="mx-auto flex h-37.5 w-full max-w-134 gap-1.5 md:gap-3 xl:gap-4"
    >
      {bars.map((bar) => {
        // Each column splits its height between an empty spacer and the bar
        // (flex-grow shares), so both animate with a plain CSS transition.
        const share = grown ? (bar.amount / peak) * PEAK_SHARE : 0
        return (
          <div
            key={bar.label}
            title={`${bar.label}: $${bar.amount.toLocaleString("en-US")}`}
            className="flex min-w-0 flex-1 flex-col"
          >
            <div
              className="transition-[flex-grow] duration-700 ease-out"
              style={{ flexGrow: 1 - share }}
            />
            <div
              className={cn(
                "rounded-xs transition-[flex-grow] duration-700 ease-out",
                bar.highlighted ? "bg-primary" : "bg-input"
              )}
              style={{ flexGrow: share }}
            />
          </div>
        )
      })}
    </div>
  )
}

/** Verified revenue bar chart. Bars grow in on mount and when the period changes. */
function AdminCustomersRevenueChartCard({
  title,
  label,
  bars,
}: {
  title: string
  label: string
  bars: AdminRevenueBar[]
}) {
  return (
    <Card className="min-w-0 gap-0 xl:min-h-67.5">
      <CardContent>
        <AdminCustomersCardHeading title={title} />
        <RevenueBars key={label} bars={bars} label={label} />
      </CardContent>
    </Card>
  )
}

export { AdminCustomersRevenueChartCard }
