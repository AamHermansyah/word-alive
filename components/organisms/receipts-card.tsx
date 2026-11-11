"use client"

import { toast } from "sonner"

import { AccountRowAction } from "@/components/molecules/account-row-action"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  RECEIPT_STATUS_LABEL,
  RECEIPT_STATUS_VARIANT,
  formatUsd,
} from "@/lib/data/account"
import { cn } from "@/lib/utils"
import type { Receipt } from "@/types/account"

function downloadReceipt(receipt: Receipt) {
  toast.success("Receipt downloaded", {
    description: `${receipt.plan} · ${receipt.date}`,
  })
}

const COLUMNS: DataTableColumn<Receipt>[] = [
  {
    id: "date",
    header: "Date",
    primary: true,
    className: "w-1/5",
    cell: (receipt) => <bdi>{receipt.date}</bdi>,
  },
  {
    id: "plan",
    header: "Plan",
    className: "w-1/5",
    cell: (receipt) => receipt.plan,
  },
  {
    id: "amount",
    header: "Amount",
    className: "w-1/5",
    cell: (receipt) => <bdi>{formatUsd(receipt.amount)}</bdi>,
  },
  {
    id: "status",
    header: "Status",
    className: "w-1/5",
    cell: (receipt) => (
      <Badge variant={RECEIPT_STATUS_VARIANT[receipt.status]}>
        {RECEIPT_STATUS_LABEL[receipt.status]}
      </Badge>
    ),
  },
  {
    id: "download",
    header: "Download",
    actions: true,
    className: "w-1/5",
    cell: (receipt) => (
      <AccountRowAction
        onClick={() => downloadReceipt(receipt)}
        label={`Download receipt ${receipt.date}`}
      >
        Download
      </AccountRowAction>
    ),
  },
]

/** Past payments, newest first, each with a download action. */
function ReceiptsCard({
  receipts,
  className,
}: {
  receipts: Receipt[]
  className?: string
}) {
  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent>
        <CardTitle className="mb-3 text-base font-bold">Receipts</CardTitle>
        <DataTable
          aria-label="Receipts"
          columns={COLUMNS}
          rows={receipts}
          getRowKey={(receipt) => receipt.id}
          empty="No receipts yet. They appear here after your first payment."
        />
      </CardContent>
    </Card>
  )
}

export { ReceiptsCard }
