import { RadioGroupItem } from "@/components/ui/radio-group"
import { PLAN_BLURBS } from "@/lib/data/onboarding"
import { formatMoney, planPricing, PRICE_PLACEHOLDER } from "@/lib/onboarding"
import { cn } from "@/lib/utils"
import type { Plan } from "@/types"
import type { BillingPeriod } from "@/types/onboarding"

/**
 * One selectable plan: radio, name, what it includes, price. Must sit inside a
 * `RadioGroup`. The whole row is the click target; the selected row gets the
 * 2px navy outline (drawn inside the border, so nothing shifts).
 */
function PlanChoiceRow({
  plan,
  billing,
}: {
  plan: Plan
  billing: BillingPeriod
}) {
  const { perMonth } = planPricing(plan, billing)

  return (
    <label
      className={cn(
        "flex min-w-0 cursor-pointer items-center gap-3.5 rounded-[14px] border border-input bg-card p-4 text-start transition-colors hover:bg-muted/50",
        "has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 has-data-checked:border-primary has-data-checked:inset-ring-1 has-data-checked:inset-ring-primary"
      )}
    >
      <RadioGroupItem value={plan.id} className="size-5" />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-bold wrap-break-word">
          <bdi>{plan.name}</bdi>
        </div>
        <div className="text-xs wrap-break-word text-muted-foreground">
          <bdi>{PLAN_BLURBS[plan.id].summary}</bdi>
        </div>
      </div>
      <div className="shrink-0 text-end">
        <div
          className={cn(
            "font-bold",
            perMonth === null ? "text-[15px]" : "text-base md:text-lg"
          )}
        >
          <bdi>
            {perMonth === null ? PRICE_PLACEHOLDER : formatMoney(perMonth)}
          </bdi>
        </div>
        <div className="text-xs text-muted-foreground">
          <bdi>
            {billing === "annual" ? "per month, billed yearly" : "per month"}
          </bdi>
        </div>
      </div>
    </label>
  )
}

export { PlanChoiceRow }
