"use client"

import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"

import { FadeIn } from "@/components/atoms/fade-in"
import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { OnboardingSpinner } from "@/components/atoms/onboarding-spinner"
import { OnboardingStatusIcon } from "@/components/atoms/onboarding-status-icon"
import { OnboardingNoticeCard } from "@/components/molecules/onboarding-notice-card"
import { PAYMENT } from "@/lib/data/onboarding"
import {
  formatMoney,
  getPlan,
  planPricing,
  PRICE_PLACEHOLDER,
} from "@/lib/onboarding"
import type { BillingPeriod, PlanId } from "@/types/onboarding"

type PaymentStatus = "success" | "failed"

/**
 * Payment result. It always opens on "Confirming your payment" for a moment
 * (the mock server "checking"), then shows the real outcome: confirmed, or
 * failed with a way back to the plan page. Each state fades in.
 */
function PaymentResultCard({
  status,
  planId,
  billing,
}: {
  status: PaymentStatus
  planId: PlanId
  billing: BillingPeriod
}) {
  const [confirming, setConfirming] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setConfirming(false), PAYMENT.confirmMs)
    return () => clearTimeout(timer)
  }, [])

  const plan = getPlan(planId)
  const { total } = planPricing(plan, billing)
  const state = confirming ? "confirming" : status

  return (
    <div role="status" aria-live="polite" className="w-full max-w-94">
      <FadeIn key={state} className="flex">
        {state === "confirming" ? (
          <OnboardingNoticeCard
            titleAs="h1"
            icon={<OnboardingSpinner />}
            title="Confirming your payment"
            description="This usually takes a few seconds. Please keep this page open."
            actions={
              <p className="text-center text-xs text-muted-foreground">
                <bdi>Reference {PAYMENT.reference}</bdi>
              </p>
            }
            actionsClassName="pt-3.5"
          />
        ) : state === "success" ? (
          <OnboardingNoticeCard
            titleAs="h1"
            icon={
              <OnboardingStatusIcon tone="success">
                <CheckIcon />
              </OnboardingStatusIcon>
            }
            title="Payment confirmed"
            description={
              <>
                <bdi>
                  {plan.name}, {billing} ·{" "}
                  {total === null ? PRICE_PLACEHOLDER : formatMoney(total)}
                </bdi>
                <br />
                Next renewal <bdi>{PAYMENT.nextRenewal[billing]}</bdi>
              </>
            }
            actions={
              <OnboardingButton href="/live">
                Open the live console
              </OnboardingButton>
            }
          />
        ) : (
          <OnboardingNoticeCard
            titleAs="h1"
            icon={
              <OnboardingStatusIcon tone="danger">
                <XIcon />
              </OnboardingStatusIcon>
            }
            title="Your payment did not go through"
            description="Google Pay may not be available on this device, or the card was declined. You have not been charged."
            actions={
              <>
                <OnboardingButton href={`/plan?plan=${planId}`}>
                  Try again
                </OnboardingButton>
                <OnboardingButton
                  href="/#support"
                  variant="outline"
                  className="mt-2"
                >
                  Contact support
                </OnboardingButton>
              </>
            }
          />
        )}
      </FadeIn>
    </div>
  )
}

export { PaymentResultCard }
export type { PaymentStatus }
