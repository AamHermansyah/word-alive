"use client"

import * as React from "react"

import { SegmentedControl } from "@/components/molecules/segmented-control"
import {
  SiteSection,
  SiteSectionHeading,
} from "@/components/molecules/site-section"
import { HomePlanCard } from "@/components/organisms/home-plan-card"
import type { Billing } from "@/components/organisms/plan-card"
import { PLANS } from "@/lib/data/plans"
import { HOME_PRICING_NOTE, HOME_SECTIONS } from "@/lib/data/site-home"

/**
 * Pricing: monthly / annual switch above the three plans (same `PLANS` data as
 * the in-app Usage page). The switch changes every plan's price in place.
 */
function HomePricingSection() {
  const [billing, setBilling] = React.useState<Billing>("monthly")
  const { id, ...copy } = HOME_SECTIONS.pricing

  return (
    <SiteSection id={id} tone="card">
      <SiteSectionHeading {...copy} className="mb-6 md:mb-6" />
      <SegmentedControl
        variant="outline"
        label="Billing period"
        value={billing}
        onValueChange={setBilling}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "annual", label: "Annual · 2 months free" },
        ]}
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3 xl:gap-6">
        {PLANS.map((plan) => (
          <HomePlanCard
            key={plan.id}
            plan={plan}
            billing={billing}
            cta="Start free trial"
          />
        ))}
      </div>
      <p className="mt-6 text-[13px] leading-5 text-muted-foreground">
        <bdi>{HOME_PRICING_NOTE}</bdi>
      </p>
    </SiteSection>
  )
}

export { HomePricingSection }
