"use client"

import { SegmentedControl } from "@/components/molecules/segmented-control"
import { OnboardingHeading } from "@/components/molecules/onboarding-heading"
import { OrderSummaryCard } from "@/components/organisms/order-summary-card"
import { PlanChoiceGroup } from "@/components/organisms/plan-choice-group"
import { usePlanCheckout } from "@/hooks/use-plan-checkout"
import { BILLING_OPTIONS } from "@/lib/data/onboarding"
import type { PlanId } from "@/types/onboarding"

/**
 * Choose a plan and pay: plans and the billing switch on the start side, the
 * order summary on the end side from `xl`, stacked below. The page sticks to
 * the top below `xl` (it is a long form), and centres on desktop.
 */
function PlanTemplate({ initialPlan }: { initialPlan: PlanId }) {
  const { plan, setPlanId, billing, setBilling, pricing, paying, pay } =
    usePlanCheckout(initialPlan)

  return (
    <div className="mb-auto flex w-full max-w-181 flex-col gap-5 xl:mb-0 xl:max-w-252 xl:flex-row xl:items-start xl:gap-12">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <OnboardingHeading
          title="Choose your plan"
          description="Talk hours reset every billing cycle. Change plan anytime."
          size={28}
          className="text-start"
          descriptionClassName="mt-3"
        />
        <SegmentedControl
          variant="outline"
          label="Billing period"
          value={billing}
          onValueChange={setBilling}
          options={BILLING_OPTIONS}
          className="w-full justify-center sm:w-fit"
        />
        <PlanChoiceGroup
          label="Plan"
          value={plan.id}
          onValueChange={setPlanId}
          billing={billing}
        />
      </div>

      <div className="min-w-0 xl:shrink-0 xl:grow-0 xl:basis-100">
        <OrderSummaryCard
          plan={plan}
          billing={billing}
          total={pricing.total}
          paying={paying}
          onPay={pay}
        />
      </div>
    </div>
  )
}

export { PlanTemplate }
