import { AccountRowAction } from "@/components/molecules/account-row-action"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  CONTRIBUTION_STATUS_LABEL,
  CONTRIBUTION_STATUS_VARIANT,
} from "@/lib/data/account"
import type { Contribution } from "@/types/account"

/** What a row's end action does, by status: open the approved song, edit a rejected one. */
function rowAction(row: Contribution, onEdit: (row: Contribution) => void) {
  if (row.status === "approved" && row.songId) {
    return (
      <AccountRowAction
        href={`/songs/${row.songId}`}
        label={`View ${row.title}`}
      >
        View
      </AccountRowAction>
    )
  }
  if (row.status === "rejected") {
    return (
      <AccountRowAction onClick={() => onEdit(row)} label={`Edit ${row.title}`}>
        Edit
      </AccountRowAction>
    )
  }
  return null
}

/** Songs the church shared with the library, with their review status and a note. */
function ContributionTableCard({
  rows,
  onEdit,
}: {
  rows: Contribution[]
  onEdit: (row: Contribution) => void
}) {
  const columns: DataTableColumn<Contribution>[] = [
    {
      id: "song",
      header: "Song",
      primary: true,
      className: "w-[31%]",
      cell: (row) => (
        <>
          <div className="text-sm font-bold">{row.title}</div>
          <div className="text-xs font-normal text-muted-foreground">
            {row.language}
          </div>
        </>
      ),
    },
    {
      id: "status",
      header: "Status",
      className: "w-[17%]",
      cell: (row) => (
        <Badge variant={CONTRIBUTION_STATUS_VARIANT[row.status]}>
          {CONTRIBUTION_STATUS_LABEL[row.status]}
        </Badge>
      ),
    },
    {
      id: "note",
      header: "Note",
      className: "w-[41%]",
      cell: (row) => (
        <span className="text-muted-foreground">
          <bdi>{row.note}</bdi>
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      actions: true,
      className: "w-[11%]",
      cell: (row) => rowAction(row, onEdit),
    },
  ]

  return (
    <Card className="min-w-0 gap-0">
      <CardContent>
        <DataTable
          aria-label="Songs you added"
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.id}
          empty="You have not added a song yet. Use Add a song to share one."
        />
      </CardContent>
    </Card>
  )
}

export { ContributionTableCard }
