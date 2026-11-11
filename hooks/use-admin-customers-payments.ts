"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useAdminCustomersOverrides } from "@/hooks/use-admin-customers-overrides"
import {
  ADMIN_PAYMENTS,
  ADMIN_PAYMENT_STATS,
  ADMIN_PAYMENT_STATUS_LABEL,
  formatDateTime,
  periodCutoff,
} from "@/lib/data/admin-customers"
import { downloadCsv } from "@/lib/admin-customers-download"
import type {
  AdminPayment,
  AdminPaymentStatusFilter,
  AdminPeriod,
} from "@/types/admin-customers"

const PAYMENTS_HREF = "/admin/payments"

/**
 * State of the Payments page: search, status and period filters, the stat
 * cards for the chosen period, and the "Mark as verified" override.
 *
 * `overrideReference` is set by the /admin/payments/override route: the same
 * page opens with the override dialog already showing that payment, and
 * Cancel / Confirm send the admin back to /admin/payments.
 */
function useAdminCustomersPayments(overrideReference?: string) {
  const router = useRouter()
  const { references: overridden, markVerified } = useAdminCustomersOverrides()
  const [query, setQuery] = React.useState("")
  const [status, setStatus] =
    React.useState<AdminPaymentStatusFilter>("All statuses")
  const [period, setPeriod] = React.useState<AdminPeriod>("Last 30 days")
  const [dialogReference, setDialogReference] = React.useState<string | null>(
    overrideReference ?? null
  )
  const [rulesOpen, setRulesOpen] = React.useState(false)

  const payments = React.useMemo<AdminPayment[]>(
    () =>
      ADMIN_PAYMENTS.map((payment) =>
        overridden.includes(payment.reference)
          ? { ...payment, status: "verified" }
          : payment
      ),
    [overridden]
  )

  const visible = React.useMemo(() => {
    const cutoff = periodCutoff(period)
    const needle = query.trim().toLowerCase()
    return payments.filter(
      (payment) =>
        payment.paidAt >= cutoff &&
        (status === "All statuses" ||
          ADMIN_PAYMENT_STATUS_LABEL[payment.status] === status) &&
        (needle === "" ||
          [
            payment.reference,
            payment.customer,
            payment.email,
            payment.paystackRef,
          ].some((value) => value.toLowerCase().includes(needle)))
    )
  }, [payments, period, status, query])

  const stats = React.useMemo(() => {
    const base = ADMIN_PAYMENT_STATS[period]
    const cutoff = periodCutoff(period)
    const fixed = ADMIN_PAYMENTS.filter(
      (payment) =>
        overridden.includes(payment.reference) && payment.paidAt >= cutoff
    )
    return {
      ...base,
      verified: base.verified + fixed.length,
      failed:
        base.failed -
        fixed.filter((payment) => payment.status === "failed").length,
    }
  }, [period, overridden])

  const dialogPayment = payments.find(
    (payment) => payment.reference === dialogReference
  )
  const dialogOpen = Boolean(
    dialogPayment && dialogPayment.status !== "verified"
  )

  function closeDialog() {
    if (overrideReference) router.push(PAYMENTS_HREF)
    else setDialogReference(null)
  }

  function confirmOverride(payment: AdminPayment) {
    markVerified(payment.reference)
    toast.success("Payment marked as verified", {
      description: `${payment.reference} · ${payment.customer}. Added to the audit log.`,
    })
    closeDialog()
  }

  function exportCsv() {
    if (visible.length === 0) {
      toast.info("Nothing to export", {
        description: "No payments match the current filters.",
      })
      return
    }
    downloadCsv(
      "wordalive-payments.csv",
      [
        "Reference",
        "Customer",
        "Email",
        "Plan",
        "Amount",
        "Status",
        "Date",
        "Paystack ref",
      ],
      visible.map((payment) => [
        payment.reference,
        payment.customer,
        payment.email,
        payment.plan,
        payment.amount,
        ADMIN_PAYMENT_STATUS_LABEL[payment.status],
        formatDateTime(payment.paidAt),
        payment.paystackRef,
      ])
    )
    toast.success("Payments exported", {
      description: `${visible.length} ${visible.length === 1 ? "payment" : "payments"} saved as wordalive-payments.csv`,
    })
  }

  return {
    query,
    setQuery,
    status,
    setStatus,
    period,
    setPeriod,
    visible,
    stats,
    dialogPayment,
    dialogOpen,
    openOverride: setDialogReference,
    closeDialog,
    confirmOverride,
    rulesOpen,
    setRulesOpen,
    exportCsv,
  }
}

export { useAdminCustomersPayments }
