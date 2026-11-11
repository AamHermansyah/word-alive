"use client"

import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { DataTable, type DataTableColumn } from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import type { AuditEntry } from "@/types/admin-platform"

/** "old → new" (the arrow flips in right-to-left languages) followed by any note. */
function ChangeText({ entry }: { entry: AuditEntry }) {
  return (
    <span className="wrap-break-word">
      {entry.from && entry.to ? (
        <>
          <bdi>{entry.from}</bdi>{" "}
          <span aria-label="to" className="inline-block rtl:rotate-180">
            →
          </span>{" "}
          <bdi>{entry.to}</bdi>
        </>
      ) : null}
      {entry.note ? (
        <>
          {entry.from && entry.to ? " " : null}
          <bdi>{entry.note}</bdi>
        </>
      ) : null}
    </span>
  )
}

/** Rows as tall as the mockup: 10px above and below the text. */
const CELL = "md:[&:is(td)]:py-2.5"

const COLUMNS: DataTableColumn<AuditEntry>[] = [
  { id: "when", header: "Time", cell: (row) => <bdi>{row.when}</bdi>, className: `md:w-3/20 ${CELL}` },
  { id: "admin", header: "Admin", cell: (row) => <bdi>{row.admin}</bdi>, className: `md:w-1/9 ${CELL}` },
  { id: "action", header: "Action", primary: true, cell: (row) => row.action, className: `md:w-1/6 ${CELL}` },
  { id: "target", header: "Target", cell: (row) => <bdi>{row.target}</bdi>, className: `md:w-7/36 ${CELL}` },
  { id: "change", header: "Change", cell: (row) => <ChangeText entry={row} />, className: `md:w-1/4 ${CELL}` },
  { id: "ip", header: "IP", cell: (row) => <bdi>{row.ip}</bdi>, className: `md:w-1/8 ${CELL}` },
]

/** The audit entries that pass the filters, newest first. */
function AdminPlatformAuditTableCard({
  rows,
  onResetFilters,
}: {
  rows: AuditEntry[]
  onResetFilters: () => void
}) {
  return (
    <AdminPlatformPanel>
      <DataTable
        aria-label="Audit log"
        columns={COLUMNS}
        rows={rows}
        getRowKey={(row) => row.id}
        empty={
          <span className="flex flex-col items-center gap-2">
            No entries match these filters.
            <Button variant="outline" size="sm" onClick={onResetFilters}>
              Clear search and filters
            </Button>
          </span>
        }
      />
    </AdminPlatformPanel>
  )
}

export { AdminPlatformAuditTableCard }
