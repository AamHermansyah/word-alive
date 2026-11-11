import { Loader2Icon } from "lucide-react"

import { AdminCatalogueCard } from "@/components/molecules/admin-catalogue-card"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BIBLE_TEST_PASSAGES } from "@/lib/data/admin-catalogue"
import type {
  AdminBibleTestPassage,
  AdminPassageState,
} from "@/types/admin-catalogue"

type Row = AdminBibleTestPassage & { state: AdminPassageState }

/**
 * Test passages: "Run tests" resets the table and the results come in one by
 * one (Running, then Passed with the response time).
 */
function AdminBibleTestPassagesCard({
  states,
  running,
  onRun,
}: {
  states: AdminPassageState[]
  running: boolean
  onRun: () => void
}) {
  const rows: Row[] = BIBLE_TEST_PASSAGES.map((passage, index) => ({
    ...passage,
    state: states[index] ?? "waiting",
  }))

  const columns: DataTableColumn<Row>[] = [
    {
      id: "passage",
      header: "Passage",
      primary: true,
      className: "w-[50%]",
      cell: (row) => row.passage,
    },
    {
      id: "result",
      header: "Result",
      className: "w-[25%]",
      cell: (row) =>
        row.state === "passed" ? (
          <Badge variant="success">Passed</Badge>
        ) : row.state === "running" ? (
          <Badge variant="info">
            <Loader2Icon className="animate-spin" aria-hidden="true" />
            Running
          </Badge>
        ) : (
          <Badge variant="neutral">Not run</Badge>
        ),
    },
    {
      id: "time",
      header: "Time",
      className: "w-[25%]",
      cell: (row) => <bdi>{row.state === "passed" ? `${row.ms} ms` : "—"}</bdi>,
    },
  ]

  return (
    <AdminCatalogueCard
      title="Test passages"
      action={
        <Button
          variant="outline"
          size="sm"
          disabled={running}
          onClick={onRun}
          className="w-full sm:w-auto"
        >
          {running ? (
            <>
              <Loader2Icon className="animate-spin" />
              Running…
            </>
          ) : (
            "Run tests"
          )}
        </Button>
      }
    >
      <div role="status" aria-live="polite">
        <DataTable
          aria-label="Test passages"
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.passage}
        />
      </div>
    </AdminCatalogueCard>
  )
}

export { AdminBibleTestPassagesCard }
