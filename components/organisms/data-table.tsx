import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type DataTableColumn<Row> = {
  id: string
  /** Column heading from `md`; the caption in front of the value on phones. */
  header: string
  cell: (row: Row) => React.ReactNode
  /** Identity column (name, reference…): the card title on phones, no caption. */
  primary?: boolean
  /** Buttons / links: pinned to the card's end on phones, no caption. */
  actions?: boolean
  /** Extra classes for the heading and cells from `md` (use it for widths). */
  className?: string
}

/**
 * The one table for the whole app (receipts, service history, admin lists…).
 *
 *  - from `md`: a real shadcn <Table> with a muted header row;
 *  - phones: a stacked card per row. The `primary` cell is the title, `actions`
 *    sit at the end of the title line, every other column is a "Caption: value"
 *    line. Nothing scrolls sideways and nothing is hidden.
 *
 * Text wraps (no truncation), so long names or references grow the row instead
 * of being cut. Empty data renders `empty`, never an empty frame.
 */
function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  empty = "Nothing to show yet.",
  className,
  phoneExtra,
  "aria-label": ariaLabel,
}: {
  columns: DataTableColumn<Row>[]
  rows: Row[]
  getRowKey: (row: Row) => string
  empty?: React.ReactNode
  className?: string
  /** Full-width content under a row's card on phones (e.g. an expandable detail). Not shown from md. */
  phoneExtra?: (row: Row) => React.ReactNode
  "aria-label"?: string
}) {
  if (rows.length === 0) {
    return (
      <p
        className={cn(
          "border-t border-border py-8 text-center text-sm text-muted-foreground",
          className
        )}
      >
        {empty}
      </p>
    )
  }

  const primary = columns.find((column) => column.primary)
  const actions = columns.filter((column) => column.actions)
  const details = columns.filter((column) => column !== primary && !column.actions)

  return (
    <div className={className}>
      <div className="hidden md:block">
        <Table aria-label={ariaLabel}>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={cn(
                    "h-auto px-0 pe-3 pb-2.5 text-xs font-normal whitespace-normal text-muted-foreground",
                    column.className
                  )}
                >
                  {column.actions ? (
                    <span className="sr-only">{column.header}</span>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={getRowKey(row)} className="border-t border-b-0">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    className={cn(
                      "px-0 py-2.5 pe-3 text-[13px] whitespace-normal wrap-break-word",
                      column.className
                    )}
                  >
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul aria-label={ariaLabel} className="md:hidden">
        {rows.map((row) => (
          <li
            key={getRowKey(row)}
            className="flex flex-col border-t border-border py-3 first:border-t-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 text-[13px] font-bold wrap-break-word">
                {primary ? primary.cell(row) : null}
              </div>
              {actions.length > 0 ? (
                <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                  {actions.map((column) => (
                    <React.Fragment key={column.id}>
                      {column.cell(row)}
                    </React.Fragment>
                  ))}
                </div>
              ) : null}
            </div>
            {details.map((column) => (
              <div
                key={column.id}
                className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs"
              >
                <span className="text-muted-foreground">
                  <bdi>{column.header}:</bdi>
                </span>
                <span className="min-w-0 wrap-break-word">{column.cell(row)}</span>
              </div>
            ))}
            {phoneExtra?.(row)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { DataTable }
