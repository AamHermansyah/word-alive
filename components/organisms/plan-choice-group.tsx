"use client"

import { PlanChoiceRow } from "@/components/molecules/plan-choice-row"
import { RadioGroup } from "@/components/ui/radio-group"
import { PLANS } from "@/lib/data/plans"
import { cn } from "@/lib/utils"
import type { BillingPeriod, PlanId } from "@/types/onboarding"

/** The three plans as one radio group (trial-ended page and plan page). */
function PlanChoiceGroup({
  value,
  onValueChange,
  billing,
  label,
  className,
}: {
  value: PlanId
  onValueChange: (value: PlanId) => void
  billing: BillingPeriod
  label: string
  className?: string
}) {
  return (
    <RadioGroup
      aria-label={label}
      value={value}
      onValueChange={(next) => onValueChange(next as PlanId)}
      className={cn("gap-3", className)}
    >
      {PLANS.map((plan) => (
        <PlanChoiceRow key={plan.id} plan={plan} billing={billing} />
      ))}
    </RadioGroup>
  )
}

export { PlanChoiceGroup }
