import { AdminPlatformStatusBadge } from "@/components/atoms/admin-platform-status-badge"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { DataTable, type DataTableColumn } from "@/components/organisms/data-table"
import type { AdminTone, ErrorState, HealthError } from "@/types/admin-platform"

const STATE: Record<ErrorState, { tone: AdminTone; label: string }> = {
  retried: { tone: "warning", label: "Retried" },
  open: { tone: "danger", label: "Open" },
  resolved: { tone: "success", label: "Resolved" },
}

const COLUMNS: DataTableColumn<HealthError>[] = [
  {
    id: "time",
    header: "Time",
    primary: true,
    cell: (row) => <bdi>{row.time}</bdi>,
    className: "md:w-1/5",
  },
  {
    id: "message",
    header: "Error",
    cell: (row) => row.message,
    className: "md:w-11/20",
  },
  {
    id: "state",
    header: "State",
    cell: (row) => (
      <AdminPlatformStatusBadge tone={STATE[row.state].tone}>
        {STATE[row.state].label}
      </AdminPlatformStatusBadge>
    ),
    className: "md:w-1/4",
  },
]

/** The latest errors the platform logged, with what happened to each. */
function AdminPlatformErrorsCard({
  errors,
  className,
}: {
  errors: HealthError[]
  className?: string
}) {
  return (
    <AdminPlatformPanel title="Recent errors" className={className}>
      <DataTable
        aria-label="Recent errors"
        columns={COLUMNS}
        rows={errors}
        getRowKey={(row) => row.id}
        empty="No errors in the last 24 hours."
      />
    </AdminPlatformPanel>
  )
}

export { AdminPlatformErrorsCard }
