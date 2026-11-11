import { SupportStatusBadge } from "@/components/atoms/admin-customers-badges"
import { FadeIn } from "@/components/atoms/fade-in"
import { AdminCustomersTextAction } from "@/components/molecules/admin-customers-text-action"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import type { AdminSupportMessage } from "@/types/admin-customers"

/**
 * Support inbox list card. The sender is a button that opens the message in
 * the panel (beside the table from `xl`, in a Sheet below it); below `xl` an
 * explicit "View" action says so, since the panel is not on screen.
 */
function AdminCustomersSupportTable({
  messages,
  fadeKey,
  onOpen,
}: {
  messages: AdminSupportMessage[]
  fadeKey: string
  onOpen: (id: string) => void
}) {
  const columns: DataTableColumn<AdminSupportMessage>[] = [
    {
      id: "from",
      header: "From",
      primary: true,
      className: "w-[28%]",
      cell: (message) => (
        <Button
          variant="ghost"
          onClick={() => onOpen(message.id)}
          className="h-auto min-w-0 flex-col items-start justify-start gap-0 px-0 py-0 text-start whitespace-normal hover:bg-transparent hover:underline"
        >
          <span className="text-sm font-bold wrap-anywhere">
            <bdi>{message.name}</bdi>
          </span>
          <span className="text-xs font-normal wrap-anywhere text-muted-foreground">
            <bdi>{message.email}</bdi>
          </span>
        </Button>
      ),
    },
    {
      id: "message",
      header: "Message",
      className: "w-[42%]",
      cell: (message) => (
        <span className="text-[13px] wrap-anywhere text-muted-foreground">
          <bdi>{message.subject}</bdi>
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      className: "w-[16%]",
      cell: (message) => <SupportStatusBadge status={message.status} />,
    },
    {
      id: "received",
      header: "Received",
      className: "w-[14%]",
      cell: (message) => <bdi>{message.received}</bdi>,
    },
    {
      id: "view",
      header: "View",
      actions: true,
      className: "xl:hidden",
      cell: (message) => (
        <AdminCustomersTextAction
          onClick={() => onOpen(message.id)}
          aria-label={`View message from ${message.name}`}
        >
          View
        </AdminCustomersTextAction>
      ),
    },
  ]

  return (
    <Card className="gap-0">
      <CardContent>
        <FadeIn key={fadeKey}>
          <DataTable
            aria-label="Support messages"
            className="**:data-[slot=table-cell]:py-2.5"
            columns={columns}
            rows={messages}
            getRowKey={(message) => message.id}
            empty="No messages in this tab."
          />
        </FadeIn>
      </CardContent>
    </Card>
  )
}

export { AdminCustomersSupportTable }
