"use client"

import { AdminCustomersCardHeading } from "@/components/molecules/admin-customers-card-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Progress, ProgressLabel } from "@/components/ui/progress"
import { useAdminCustomersGrowIn } from "@/hooks/use-admin-customers-ui"
import type { AdminTierTone, AdminTierUsage } from "@/types/admin-customers"

const TONE: Record<AdminTierTone, string> = {
  primary: "bg-primary",
  brand: "bg-chart-2",
  info: "bg-chart-3",
  muted: "bg-ring",
}

/** Subscriptions by tier: one labelled bar per plan, growing in on mount. */
function AdminCustomersTierCard({ tiers }: { tiers: AdminTierUsage[] }) {
  const grown = useAdminCustomersGrowIn()

  return (
    <Card className="min-w-0 gap-0 xl:min-h-67.5">
      <CardContent>
        <AdminCustomersCardHeading title="Subscriptions by tier" />
        <ul className="flex flex-col gap-3.5">
          {tiers.map((tier) => (
            <li key={tier.id}>
              <Progress
                value={grown ? tier.percent : 0}
                trackClassName="h-2"
                indicatorClassName={`${TONE[tier.tone]} duration-700 ease-out`}
                className="gap-y-1.5"
              >
                <ProgressLabel className="min-w-0 text-[13px] font-semibold wrap-break-word">
                  {tier.name}
                </ProgressLabel>
                <span className="ms-auto text-[13px] text-muted-foreground">
                  <bdi>{tier.count}</bdi>
                </span>
              </Progress>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export { AdminCustomersTierCard }
