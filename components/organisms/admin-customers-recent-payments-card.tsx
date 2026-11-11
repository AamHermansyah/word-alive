import { PaymentStatusBadge } from "@/components/atoms/admin-customers-badges"
import { AdminCustomersCardHeading } from "@/components/molecules/admin-customers-card-heading"
import { AdminCustomersTextAction } from "@/components/molecules/admin-customers-text-action"
import { Card, CardContent } from "@/components/ui/card"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { formatShortDate } from "@/lib/data/admin-customers"
import type { AdminPayment } from "@/types/admin-customers"

const COLUMNS: DataTableColumn<AdminPayment>[] = [
  {
    id: "customer",
    header: "Customer",
    primary: true,
    className: "w-2/5",
    cell: (payment) => (
      <div className="min-w-0">
        <div className="text-sm font-bold wrap-anywhere">
          <bdi>{payment.customer}</bdi>
        </div>
        <div className="text-xs font-normal text-muted-foreground">
          <bdi>{formatShortDate(payment.paidAt)}</bdi>
        </div>
      </div>
    ),
  },
  {
    id: "plan",
    header: "Plan",
    className: "w-1/5",
    cell: (payment) => payment.plan,
  },
  {
    id: "amount",
    header: "Amount",
    className: "w-1/5",
    cell: (payment) => <bdi>{payment.amount}</bdi>,
  },
  {
    id: "status",
    header: "Status",
    className: "w-1/5",
    cell: (payment) => <PaymentStatusBadge status={payment.status} />,
  },
]

/** The latest payments with a link to the full list. */
function AdminCustomersRecentPaymentsCard({
  payments,
}: {
  payments: AdminPayment[]
}) {
  return (
    <Card className="min-w-0 gap-0 xl:min-h-62.5">
      <CardContent>
        <AdminCustomersCardHeading
          title="Recent payments"
          action={
            <AdminCustomersTextAction
              href="/admin/payments"
              className="md:py-0"
            >
              View all
            </AdminCustomersTextAction>
          }
        />
        <DataTable
          aria-label="Recent payments"
          className="**:data-[slot=table-cell]:py-2.5"
          columns={COLUMNS}
          rows={payments}
          getRowKey={(payment) => payment.reference}
          empty="No payments yet."
        />
      </CardContent>
    </Card>
  )
}

export { AdminCustomersRecentPaymentsCard }
