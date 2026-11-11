import Link from "next/link"

import { AccountRowAction } from "@/components/molecules/account-row-action"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RIGHTS_LABEL, RIGHTS_VARIANT } from "@/lib/data/songs"
import type { SetSong } from "@/types/account"

/** Songs in the church's own set, with the way to take one out. */
function SetSongsTableCard({
  rows,
  onRemove,
}: {
  rows: SetSong[]
  onRemove: (row: SetSong) => void
}) {
  const columns: DataTableColumn<SetSong>[] = [
    {
      id: "song",
      header: "Song",
      primary: true,
      className: "w-[34%]",
      cell: (row) => (
        <>
          {row.songId ? (
            <Link
              href={`/songs/${row.songId}`}
              className="text-sm font-bold hover:underline"
            >
              {row.title}
            </Link>
          ) : (
            <div className="text-sm font-bold">{row.title}</div>
          )}
          <div className="text-xs font-normal text-muted-foreground">
            {row.author}
          </div>
        </>
      ),
    },
    {
      id: "rights",
      header: "Rights",
      className: "w-[20%]",
      cell: (row) => (
        <Badge variant={RIGHTS_VARIANT[row.rights]}>
          {RIGHTS_LABEL[row.rights]}
        </Badge>
      ),
    },
    {
      id: "used-by",
      header: "Used by",
      className: "w-[28%]",
      cell: (row) => (
        <span className="text-muted-foreground">
          <bdi>{row.usedBy}</bdi>
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      actions: true,
      className: "w-[18%]",
      cell: (row) => (
        <AccountRowAction
          onClick={() => onRemove(row)}
          label={`Remove ${row.title} from your set`}
        >
          Remove
        </AccountRowAction>
      ),
    },
  ]

  return (
    <Card className="min-w-0 gap-0">
      <CardContent>
        <DataTable
          aria-label="Songs in your set"
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.id}
          empty={
            <>
              Your set is empty. Add songs from the{" "}
              <Link
                href="/songs"
                className="font-semibold text-brand-text hover:underline"
              >
                song library
              </Link>
              .
            </>
          }
        />
      </CardContent>
    </Card>
  )
}

export { SetSongsTableCard }
