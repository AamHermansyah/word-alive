"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminCustomersSearch } from "@/components/molecules/admin-customers-search"
import { AdminCustomersSelect } from "@/components/molecules/admin-customers-select"
import { AdminCustomersStatGrid } from "@/components/molecules/admin-customers-stat-card"
import { AdminCustomersTextAction } from "@/components/molecules/admin-customers-text-action"
import { AdminCustomersOverrideDialog } from "@/components/organisms/admin-customers-override-dialog"
import { AdminCustomersOverrideRulesDialog } from "@/components/organisms/admin-customers-override-rules-dialog"
import { AdminCustomersPaymentsTable } from "@/components/organisms/admin-customers-payments-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAdminCustomersPayments } from "@/hooks/use-admin-customers-payments"
import {
  ADMIN_PAYMENT_STATUS_FILTERS,
  ADMIN_PAYMENT_WEBHOOK_ERRORS,
  ADMIN_PERIODS,
} from "@/lib/data/admin-customers"
import type { AdminStat } from "@/types/admin-customers"

/**
 * Payments: KPI cards for the chosen period, search + status + period
 * filters, the table and the "Mark as verified" override.
 *
 * One template serves two routes. `/admin/payments` is the list;
 * `/admin/payments/override` passes `overrideRef` and renders the same page
 * with the override dialog already open for that payment.
 */
function AdminPaymentsTemplate({ overrideRef }: { overrideRef?: string }) {
  const payments = useAdminCustomersPayments(overrideRef)
  const { stats, period } = payments

  const cards: AdminStat[] = [
    {
      label: "Verified",
      value: stats.verified.toLocaleString("en-US"),
      note: period,
      tone: "success",
    },
    {
      label: "Failed",
      value: stats.failed.toLocaleString("en-US"),
      note: stats.failedRate,
      tone: "danger",
    },
    {
      label: "Refunded",
      value: stats.refunded.toLocaleString("en-US"),
      note: period,
      tone: "muted",
    },
    {
      label: "Webhook errors",
      value: String(ADMIN_PAYMENT_WEBHOOK_ERRORS),
      note: "Needs review",
      tone: "warning",
    },
  ]

  return (
    <>
      <AdminPageHeader
        title="Payments"
        subtitle="Every payment is verified with Paystack before it counts"
      >
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={payments.exportCsv}
        >
          Export CSV
        </Button>
      </AdminPageHeader>

      <AdminCustomersStatGrid stats={cards} />

      <div className="flex flex-wrap items-center gap-2.5">
        <AdminCustomersSearch
          value={payments.query}
          onValueChange={payments.setQuery}
          placeholder="Search reference or email"
        />
        <AdminCustomersSelect
          label="Filter by status"
          value={payments.status}
          onValueChange={payments.setStatus}
          options={ADMIN_PAYMENT_STATUS_FILTERS}
          className="flex-1 sm:flex-none"
        />
        <AdminCustomersSelect
          label="Filter by period"
          value={payments.period}
          onValueChange={payments.setPeriod}
          options={ADMIN_PERIODS}
          className="flex-1 sm:flex-none"
        />
      </div>

      <AdminCustomersPaymentsTable
        payments={payments.visible}
        fadeKey={`${payments.status}-${payments.period}`}
        onOverride={payments.openOverride}
      />

      <Card className="gap-0 bg-background [--card-spacing:--spacing(3.5)]">
        <CardContent className="flex flex-col items-start gap-x-3 gap-y-0 sm:flex-row sm:items-center sm:px-5">
          <p className="min-w-0 flex-1 text-[13px]">
            <bdi>
              Unverified payments can be marked successful only by a Super
              Admin, with a written reason. Every override is added to the audit
              log.
            </bdi>
          </p>
          <AdminCustomersTextAction onClick={() => payments.setRulesOpen(true)}>
            View override rules
          </AdminCustomersTextAction>
        </CardContent>
      </Card>

      <AdminCustomersOverrideDialog
        payment={payments.dialogPayment}
        open={payments.dialogOpen}
        onCancel={payments.closeDialog}
        onConfirm={payments.confirmOverride}
      />
      <AdminCustomersOverrideRulesDialog
        open={payments.rulesOpen}
        onOpenChange={payments.setRulesOpen}
      />
    </>
  )
}

export { AdminPaymentsTemplate }
