"use client"

import * as React from "react"

import { useDelayedNavigation } from "@/hooks/use-delayed-navigation"
import { DEFAULT_BILLING } from "@/lib/data/onboarding"
import { getPlan, planPricing } from "@/lib/onboarding"
import type { BillingPeriod, PlanId } from "@/types/onboarding"

/**
 * State of the "Choose your plan" page: the picked plan, monthly or annual
 * billing, what that costs, and the (mock) Google Pay step that leads to the
 * payment result page.
 */
function usePlanCheckout(initialPlan: PlanId) {
  const [planId, setPlanId] = React.useState<PlanId>(initialPlan)
  const [billing, setBilling] = React.useState<BillingPeriod>(DEFAULT_BILLING)
  const { pending: paying, go } = useDelayedNavigation(900)

  const plan = getPlan(planId)
  const pricing = planPricing(plan, billing)

  const pay = () =>
    go(`/payment/result?status=success&plan=${planId}&billing=${billing}`)

  return { plan, setPlanId, billing, setBilling, pricing, paying, pay }
}

export { usePlanCheckout }
