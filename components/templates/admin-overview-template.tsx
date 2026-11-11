"use client"

import * as React from "react"

import { FadeIn } from "@/components/atoms/fade-in"
import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminCustomersSelect } from "@/components/molecules/admin-customers-select"
import { AdminCustomersStatGrid } from "@/components/molecules/admin-customers-stat-card"
import { AdminCustomersAttentionCard } from "@/components/organisms/admin-customers-attention-card"
import { AdminCustomersRecentPaymentsCard } from "@/components/organisms/admin-customers-recent-payments-card"
import { AdminCustomersRevenueChartCard } from "@/components/organisms/admin-customers-revenue-chart-card"
import { AdminCustomersTierCard } from "@/components/organisms/admin-customers-tier-card"
import {
  ADMIN_ATTENTION,
  ADMIN_OVERVIEW,
  ADMIN_PAYMENTS,
  ADMIN_PERIODS,
  ADMIN_TIERS,
} from "@/lib/data/admin-customers"
import type { AdminPeriod } from "@/types/admin-customers"

const RECENT_PAYMENTS = ADMIN_PAYMENTS.slice(0, 3)

/** Two cards side by side from `md`: about two thirds and one third. */
const ROW = "grid gap-4 md:grid-cols-[1.85fr_1fr] md:gap-5"

/**
 * Overview: KPI cards and revenue chart follow the period select; the tier
 * split, recent payments and "Needs attention" are the current state.
 */
function AdminOverviewTemplate() {
  const [period, setPeriod] = React.useState<AdminPeriod>("Last 30 days")
  const data = ADMIN_OVERVIEW[period]

  return (
    <>
      <AdminPageHeader title="Overview" subtitle="Platform health at a glance">
        <AdminCustomersSelect
          label="Reporting period"
          value={period}
          onValueChange={setPeriod}
          options={ADMIN_PERIODS}
          className="w-full sm:w-auto"
        />
      </AdminPageHeader>

      <FadeIn key={period}>
        <AdminCustomersStatGrid stats={data.stats} />
      </FadeIn>

      <div className={ROW}>
        <AdminCustomersRevenueChartCard
          title={data.chartTitle}
          label={data.chartLabel}
          bars={data.bars}
        />
        <AdminCustomersTierCard tiers={ADMIN_TIERS} />
      </div>

      <div className={ROW}>
        <AdminCustomersRecentPaymentsCard payments={RECENT_PAYMENTS} />
        <AdminCustomersAttentionCard items={ADMIN_ATTENTION} />
      </div>
    </>
  )
}

export { AdminOverviewTemplate }
