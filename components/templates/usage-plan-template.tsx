"use client"

import * as React from "react"
import Link from "next/link"

import { SegmentedControl } from "@/components/molecules/segmented-control"
import { PlanCard, type Billing } from "@/components/organisms/plan-card"
import { Topbar } from "@/components/organisms/topbar"
import {
  BibleVersionsUsageCard,
  TalkHoursCard,
} from "@/components/organisms/usage-summary-cards"
import {
  BIBLE_VERSIONS,
  BIBLE_VERSION_LIMIT,
  PLANS,
  TALK_HOURS,
} from "@/lib/data/plans"

/** Usage and plan: cycle usage summary, billing switch, three plan tiers. */
function UsagePlanTemplate() {
  const [billing, setBilling] = React.useState<Billing>("monthly")

  return (
    <>
      <Topbar
        title="Usage and plan"
        subtitle="Talk hours reset every billing cycle"
      >
        <SegmentedControl
          variant="outline"
          label="Billing period"
          value={billing}
          onValueChange={setBilling}
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "annual", label: "Annual · 2 months free" },
          ]}
          className="w-full justify-center sm:w-fit"
        />
      </Topbar>

      <div className="flex flex-col gap-4 md:flex-row md:gap-5">
        <TalkHoursCard total={TALK_HOURS.total} used={TALK_HOURS.used} />
        <BibleVersionsUsageCard
          used={BIBLE_VERSIONS.filter((v) => v.inUse).length}
          limit={BIBLE_VERSION_LIMIT}
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:gap-5">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="min-w-0 text-xs text-muted-foreground">
          <bdi>
            A running service is never cut off. Bible versions depend on the
            licences WordAlive holds.
          </bdi>
        </p>
        <Link
          href="/billing"
          className="py-2 text-[13px] font-semibold text-brand-text no-underline hover:underline"
        >
          Billing and receipts
        </Link>
      </div>
    </>
  )
}

export { UsagePlanTemplate }
