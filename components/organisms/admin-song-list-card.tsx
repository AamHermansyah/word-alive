import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type {
  CatalogueSong,
  CatalogueSongStatus,
} from "@/types/admin-catalogue"

const STATUS: Record<
  CatalogueSongStatus,
  { label: string; variant: "warning" | "destructive" | "success" | "neutral" }
> = {
  pending: { label: "Pending", variant: "warning" },
  reported: { label: "Reported", variant: "destructive" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "neutral" },
  removed: { label: "Removed", variant: "neutral" },
}

/** The coloured status pill of a catalogue song. */
function AdminSongStatusBadge({ status }: { status: CatalogueSongStatus }) {
  const { label, variant } = STATUS[status]
  return <Badge variant={variant}>{label}</Badge>
}

/**
 * The songs of the review queue or of the whole catalogue. Picking a song
 * shows it in the detail card; a long list shows a first page and "Show all".
 */
function AdminSongListCard({
  songs,
  total,
  selectedId,
  onSelect,
  expanded,
  onToggleExpanded,
  previewCount,
  emptyMessage,
  label,
}: {
  /** The rows to show (already filtered and paged by the caller). */
  songs: CatalogueSong[]
  /** How many songs match, before paging. */
  total: number
  selectedId: string | undefined
  onSelect: (id: string) => void
  expanded: boolean
  onToggleExpanded: () => void
  previewCount: number
  emptyMessage: string
  label: string
}) {
  const columns: DataTableColumn<CatalogueSong>[] = [
    {
      id: "song",
      header: "Song",
      primary: true,
      className: "w-[34%]",
      cell: (song) => (
        <button
          type="button"
          aria-current={song.id === selectedId ? "true" : undefined}
          onClick={() => onSelect(song.id)}
          className="block rounded-sm text-start outline-none hover:text-brand-text focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span className="block text-[13px] font-bold md:text-sm">
            <bdi>{song.title}</bdi>
          </span>
          <span className="block text-xs font-normal text-muted-foreground">
            {song.language}
          </span>
        </button>
      ),
    },
    {
      id: "submitted",
      header: "Submitted by",
      className: "w-[28%]",
      cell: (song) => <bdi>{song.submittedBy}</bdi>,
    },
    {
      id: "reports",
      header: "Reports",
      className: "w-[14%]",
      cell: (song) => <bdi>{song.reports}</bdi>,
    },
    {
      id: "status",
      header: "Status",
      className: "w-[18%]",
      cell: (song) => <AdminSongStatusBadge status={song.status} />,
    },
  ]

  const canExpand = total > previewCount

  return (
    <Card className="min-w-0 gap-0">
      <CardContent>
        <DataTable
          aria-label={label}
          columns={columns}
          rows={songs}
          getRowKey={(song) => song.id}
          empty={<bdi>{emptyMessage}</bdi>}
        />
        {canExpand ? (
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border pt-1 text-xs text-muted-foreground">
            <p>
              <bdi>
                Showing {songs.length} of {total}
              </bdi>
            </p>
            <Button
              variant="link"
              aria-expanded={expanded}
              className="h-auto px-0 py-2.5 text-[13px] text-brand-text hover:no-underline"
              onClick={onToggleExpanded}
            >
              <bdi>{expanded ? "Show fewer" : `Show all ${total}`}</bdi>
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export { AdminSongListCard, AdminSongStatusBadge }
