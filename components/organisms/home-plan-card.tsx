import Link from "next/link"

import { FadeIn } from "@/components/atoms/fade-in"
import { CheckMarkIcon } from "@/components/atoms/icons"
import type { Billing } from "@/components/organisms/plan-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatMoney, planPricing, PRICE_PLACEHOLDER } from "@/lib/onboarding"
import { cn } from "@/lib/utils"
import type { Plan } from "@/types"

/**
 * A pricing tier on the public homepage. Differs from the in-app `PlanCard`:
 * every plan has the same "Start free trial" button (to /setup), there is no
 * "current plan" state, and only the highlighted plan carries its badge.
 */
function HomePlanCard({
  plan,
  billing,
  cta,
}: {
  plan: Plan
  billing: Billing
  cta: string
}) {
  const { perMonth } = planPricing(plan, billing)
  const badge = plan.highlighted ? plan.badge : undefined

  return (
    <Card
      className={cn(
        "min-w-0 gap-0",
        plan.highlighted && "border-2 border-brand-text"
      )}
    >
      <CardContent className="flex flex-1 flex-col">
        <div className="flex min-h-6.5 flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <h3 className="text-lg font-bold wrap-break-word">{plan.name}</h3>
          {badge ? <Badge variant={badge.variant}>{badge.label}</Badge> : null}
        </div>

        <FadeIn key={billing}>
          <p
            className={cn(
              "mt-3 font-bold wrap-break-word",
              perMonth === null
                ? "text-2xl leading-11"
                : "text-[34px] leading-11"
            )}
          >
            <bdi>{perMonth === null ? PRICE_PLACEHOLDER : formatMoney(perMonth)}</bdi>
          </p>
          <p className="mb-3.5 text-xs text-muted-foreground">
            {billing === "annual" ? "per month, billed yearly" : "per month"}
          </p>
        </FadeIn>

        <ul className="mb-8 border-t border-border pt-2">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 py-1.5 text-sm leading-5"
            >
              <span className="mt-px flex shrink-0 text-success">
                <CheckMarkIcon className="size-4.5" />
              </span>
              <span className="min-w-0 wrap-break-word">
                <bdi>{feature}</bdi>
              </span>
            </li>
          ))}
        </ul>

        <Button
          nativeButton={false}
          render={<Link href="/setup" />}
          size="lg"
          variant={plan.highlighted ? "default" : "outline"}
          className="mt-auto h-12"
        >
          {cta}
        </Button>
      </CardContent>
    </Card>
  )
}

export { HomePlanCard }
