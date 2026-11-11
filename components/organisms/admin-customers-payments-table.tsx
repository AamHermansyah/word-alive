import { PaymentStatusBadge } from "@/components/atoms/admin-customers-badges"
import { FadeIn } from "@/components/atoms/fade-in"
import { AdminCustomersTextAction } from "@/components/molecules/admin-customers-text-action"
import { Card, CardContent } from "@/components/ui/card"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { formatDateTime } from "@/lib/data/admin-customers"
import type { AdminPayment } from "@/types/admin-customers"

/**
 * Payments list card. Failed and pending payments get "Mark as verified",
 * which opens the override dialog; verified and refunded ones have no action.
 */
function AdminCustomersPaymentsTable({
  payments,
  fadeKey,
  onOverride,
}: {
  payments: AdminPayment[]
  fadeKey: string
  onOverride: (reference: string) => void
}) {
  const columns: DataTableColumn<AdminPayment>[] = [
    {
      id: "reference",
      header: "Reference",
      primary: true,
      className: "w-[12%]",
      cell: (payment) => (
        <bdi className="text-[13px] font-normal wrap-break-word">
          {payment.reference}
        </bdi>
      ),
    },
    {
      id: "customer",
      header: "Customer",
      className: "w-[18%]",
      cell: (payment) => (
        <bdi className="wrap-anywhere">{payment.customer}</bdi>
      ),
    },
    {
      id: "plan",
      header: "Plan",
      className: "w-[10%]",
      cell: (payment) => payment.plan,
    },
    {
      id: "amount",
      header: "Amount",
      className: "w-[10%]",
      cell: (payment) => <bdi>{payment.amount}</bdi>,
    },
    {
      id: "status",
      header: "Status",
      className: "w-[11%]",
      cell: (payment) => <PaymentStatusBadge status={payment.status} />,
    },
    {
      id: "date",
      header: "Date",
      className: "w-[13%]",
      cell: (payment) => (
        <bdi className="wrap-break-word">
          {formatDateTime(payment.paidAt)}
        </bdi>
      ),
    },
    {
      id: "paystack",
      header: "Paystack ref",
      className: "w-[11%]",
      cell: (payment) => (
        <bdi className="wrap-break-word">{payment.paystackRef}</bdi>
      ),
    },
    {
      id: "override",
      header: "Action",
      actions: true,
      className: "w-[15%]",
      cell: (payment) =>
        payment.status === "failed" || payment.status === "pending" ? (
          <AdminCustomersTextAction
            onClick={() => onOverride(payment.reference)}
            aria-label={`Mark ${payment.reference} as verified`}
            className="text-start whitespace-normal md:py-0"
          >
            Mark as verified
          </AdminCustomersTextAction>
        ) : null,
    },
  ]

  return (
    <Card className="gap-0">
      <CardContent>
        <FadeIn key={fadeKey}>
          <DataTable
            aria-label="Payments"
            className="**:data-[slot=table-cell]:py-2.5"
            columns={columns}
            rows={payments}
            getRowKey={(payment) => payment.reference}
            empty="No payments match these filters."
          />
        </FadeIn>
      </CardContent>
    </Card>
  )
}

export { AdminCustomersPaymentsTable }
