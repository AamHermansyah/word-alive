import { CreditCardIcon } from "lucide-react"

import { OnboardingCard } from "@/components/molecules/onboarding-card"
import { Button } from "@/components/ui/button"
import { PLAN_BLURBS } from "@/lib/data/onboarding"
import { formatMoney, PRICE_PLACEHOLDER } from "@/lib/onboarding"
import type { Plan } from "@/types"
import type { BillingPeriod } from "@/types/onboarding"

function SummaryRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <dt className="text-muted-foreground">
        <bdi>{label}</bdi>
      </dt>
      <dd className="min-w-0 text-end font-semibold wrap-break-word">
        <bdi>{children}</bdi>
      </dd>
    </div>
  )
}

/**
 * What is being bought and what it costs today, with the Google Pay button.
 * Annual billing charges ten months for the year; the totals come from the
 * pricing the page already worked out.
 */
function OrderSummaryCard({
  plan,
  billing,
  total,
  paying,
  onPay,
}: {
  plan: Plan
  billing: BillingPeriod
  /** Charged today; `null` while the plan has no price yet. */
  total: number | null
  paying: boolean
  onPay: () => void
}) {
  const blurb = PLAN_BLURBS[plan.id]

  return (
    <OnboardingCard
      width="fluid"
      padding="compact"
      align="start"
      contentClassName="min-w-0"
    >
      <h2 className="mb-2.5 text-base font-bold">Order summary</h2>

      <dl>
        <SummaryRow label="Plan">
          {plan.name}, {billing}
        </SummaryRow>
        <SummaryRow label="Talk hours">{blurb.talkHours}</SummaryRow>
        <SummaryRow label="Bible versions">{blurb.bibleVersions}</SummaryRow>
        <SummaryRow label="Songs">Shared library</SummaryRow>
      </dl>

      <div className="mt-2.5 flex items-baseline justify-between gap-4 border-t border-border pt-3.5">
        <span className="text-[15px] font-semibold">Total today</span>
        <span className="text-2xl font-bold md:text-[28px]" aria-live="polite">
          <bdi>{total === null ? PRICE_PLACEHOLDER : formatMoney(total)}</bdi>
        </span>
      </div>

      <Button
        type="button"
        onClick={onPay}
        disabled={paying}
        aria-busy={paying || undefined}
        className="mt-4.5 h-13 w-full gap-2.5 rounded-full border-black bg-black text-base font-medium text-white hover:bg-black/85"
      >
        <CreditCardIcon className="size-5" aria-hidden="true" />
        {paying ? "Opening Google Pay…" : "Pay with Google Pay"}
      </Button>

      <p className="mt-3.5 text-center text-xs text-muted-foreground">
        <bdi>
          Secured by Paystack. Works with Visa and Mastercard cards saved to
          Google Pay.
        </bdi>
      </p>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        <bdi>
          Google Pay appears when your device and card support it. Renews every{" "}
          {billing === "annual" ? "year" : "month"}. Cancel anytime.
        </bdi>
      </p>
    </OnboardingCard>
  )
}

export { OrderSummaryCard }
