import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { TakedownRequest, TakedownStatus } from "@/types/admin-catalogue"

const STATUS: Record<
  TakedownStatus,
  { label: string; variant: "warning" | "neutral" }
> = {
  open: { label: "Open", variant: "warning" },
  removed: { label: "Song removed", variant: "neutral" },
  rejected: { label: "Rejected", variant: "neutral" },
}

/** The coloured status pill of a takedown request. */
function AdminTakedownStatusBadge({ status }: { status: TakedownStatus }) {
  const { label, variant } = STATUS[status]
  return <Badge variant={variant}>{label}</Badge>
}

/** Takedown requests from rights holders; picking one opens it in the detail card. */
function AdminTakedownListCard({
  requests,
  selectedId,
  onSelect,
}: {
  requests: TakedownRequest[]
  selectedId: string | undefined
  onSelect: (id: string) => void
}) {
  const columns: DataTableColumn<TakedownRequest>[] = [
    {
      id: "song",
      header: "Song",
      primary: true,
      className: "w-[33%]",
      cell: (request) => (
        <button
          type="button"
          aria-current={request.id === selectedId ? "true" : undefined}
          onClick={() => onSelect(request.id)}
          className="block rounded-sm text-start outline-none hover:text-brand-text focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span className="block text-[13px] font-bold md:text-sm">
            <bdi>{request.songTitle}</bdi>
          </span>
          <span className="block text-xs font-normal text-muted-foreground">
            {request.language}
          </span>
        </button>
      ),
    },
    {
      id: "requester",
      header: "Requested by",
      className: "w-[33%]",
      cell: (request) => (
        <>
          <span className="block text-[13px] font-bold md:text-sm">
            <bdi>{request.requester}</bdi>
          </span>
          <span className="block text-xs text-muted-foreground">
            <bdi>{request.requesterEmail}</bdi>
          </span>
        </>
      ),
    },
    {
      id: "status",
      header: "Status",
      className: "w-[18%]",
      cell: (request) => <AdminTakedownStatusBadge status={request.status} />,
    },
    {
      id: "received",
      header: "Received",
      className: "w-[16%]",
      cell: (request) => <bdi>{request.received}</bdi>,
    },
  ]

  return (
    <Card className="min-w-0 gap-0">
      <CardContent>
        <DataTable
          aria-label="Takedown requests"
          columns={columns}
          rows={requests}
          getRowKey={(request) => request.id}
          empty="No takedown requests."
        />
      </CardContent>
    </Card>
  )
}

export { AdminTakedownListCard, AdminTakedownStatusBadge }
