import { UserStatusBadge } from "@/components/atoms/admin-customers-badges"
import { FadeIn } from "@/components/atoms/fade-in"
import { AdminCustomersTextAction } from "@/components/molecules/admin-customers-text-action"
import { Card, CardContent } from "@/components/ui/card"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import type { AdminUser } from "@/types/admin-customers"

/** Users list card. `fadeKey` changes with the filter so the rows ease in again. */
function AdminCustomersUsersTable({
  users,
  fadeKey,
  onView,
}: {
  users: AdminUser[]
  fadeKey: string
  onView: (id: string) => void
}) {
  const columns: DataTableColumn<AdminUser>[] = [
    {
      id: "user",
      header: "User",
      primary: true,
      className: "w-[34%]",
      cell: (user) => (
        <div className="min-w-0">
          <div className="text-sm font-bold wrap-anywhere">
            <bdi>{user.name}</bdi>
          </div>
          <div className="text-xs font-normal wrap-anywhere text-muted-foreground">
            <bdi>{user.email}</bdi>
          </div>
        </div>
      ),
    },
    {
      id: "plan",
      header: "Plan",
      className: "w-[14%]",
      cell: (user) => user.plan,
    },
    {
      id: "status",
      header: "Status",
      className: "w-[15%]",
      cell: (user) => <UserStatusBadge status={user.status} />,
    },
    {
      id: "hours",
      header: "Hours",
      className: "w-[13%]",
      cell: (user) => (
        <bdi>
          {user.hoursUsed} / {user.hoursTotal}
        </bdi>
      ),
    },
    {
      id: "last-active",
      header: "Last active",
      className: "w-[15%]",
      cell: (user) => <bdi>{user.lastActive}</bdi>,
    },
    {
      id: "view",
      header: "View",
      actions: true,
      className: "w-[9%]",
      cell: (user) => (
        <AdminCustomersTextAction
          onClick={() => onView(user.id)}
          aria-label={`View ${user.name}`}
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
            aria-label="Users"
            className="**:data-[slot=table-cell]:py-2.5"
            columns={columns}
            rows={users}
            getRowKey={(user) => user.id}
            empty="No users match your search."
          />
        </FadeIn>
      </CardContent>
    </Card>
  )
}

export { AdminCustomersUsersTable }
