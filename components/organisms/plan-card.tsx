import { FeatureItem } from "@/components/molecules/feature-item"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ANNUAL_FACTOR } from "@/lib/data/plans"
import { cn } from "@/lib/utils"
import type { Plan } from "@/types"

export type Billing = "monthly" | "annual"

function formatPrice(plan: Plan, billing: Billing) {
  if (plan.monthlyPrice === null) return null
  const monthly =
    billing === "annual" ? plan.monthlyPrice * ANNUAL_FACTOR : plan.monthlyPrice
  return `$${monthly.toFixed(2)}`
}

/** One pricing tier. The highlighted plan gets the 2px brand outline. */
function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = formatPrice(plan, billing)

  return (
    <Card
      className={cn(
        "min-w-0 flex-1 gap-0 xl:h-102.5",
        plan.highlighted && "border-2 border-brand-text"
      )}
    >
      <CardContent className="flex flex-1 flex-col">
        <div className="flex h-6 items-center justify-between">
          <span className="text-[17px] font-bold">{plan.name}</span>
          {plan.badge ? (
            <Badge variant={plan.badge.variant}>{plan.badge.label}</Badge>
          ) : null}
        </div>

        <div
          className={cn(
            "mt-3.5 font-bold",
            price ? "text-[34px]" : "text-[26px]"
          )}
        >
          {price ?? "[YOUR PRICE]"}
        </div>
        <div className="mb-4 text-xs text-muted-foreground">
          per month, billed {billing === "annual" ? "yearly" : "monthly"}
        </div>

        <ul className="border-t border-border pt-2.5">
          {plan.features.map((feature) => (
            <FeatureItem key={feature}>{feature}</FeatureItem>
          ))}
        </ul>

        <Button
          size="lg"
          variant={plan.highlighted ? "default" : "outline"}
          className="mt-auto"
        >
          {plan.cta}
        </Button>
      </CardContent>
    </Card>
  )
}

export { PlanCard }
