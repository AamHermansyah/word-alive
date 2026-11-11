"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminCustomersSearch } from "@/components/molecules/admin-customers-search"
import { ChipGroup } from "@/components/molecules/chip-group"
import { AdminCustomersSplitLayout } from "@/components/organisms/admin-customers-split-layout"
import { AdminCustomersUserPanel } from "@/components/organisms/admin-customers-user-panel"
import { AdminCustomersUsersTable } from "@/components/organisms/admin-customers-users-table"
import { Button } from "@/components/ui/button"
import { useAdminCustomersUsers } from "@/hooks/use-admin-customers-users"
import {
  ADMIN_USERS_TOTAL,
  ADMIN_USER_FILTERS,
} from "@/lib/data/admin-customers"

/** Users: status filter + search, the table, and the detail panel / sheet. */
function AdminUsersTemplate() {
  const users = useAdminCustomersUsers()

  return (
    <>
      <AdminPageHeader
        title="Users"
        subtitle={`${ADMIN_USERS_TOTAL} registered churches and individuals`}
      >
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={users.exportCsv}
        >
          Export CSV
        </Button>
      </AdminPageHeader>

      <div className="flex flex-wrap items-center gap-2.5">
        <AdminCustomersSearch
          value={users.query}
          onValueChange={users.setQuery}
          placeholder="Search name or email"
        />
        <ChipGroup
          label="Filter by status"
          value={users.filter}
          onValueChange={users.setFilter}
          options={ADMIN_USER_FILTERS}
        />
      </div>

      <AdminCustomersSplitLayout
        panelLabel="Selected user"
        title={users.selected.name}
        subtitle={
          <>
            <bdi>
              {users.selected.email} · {users.selected.location}
            </bdi>
          </>
        }
        open={users.panelOpen}
        onOpenChange={users.setPanelOpen}
        list={
          <AdminCustomersUsersTable
            users={users.visible}
            fadeKey={users.filter}
            onView={users.view}
          />
        }
      >
        <AdminCustomersUserPanel
          user={users.selected}
          actions={users.actions}
        />
      </AdminCustomersSplitLayout>
    </>
  )
}

export { AdminUsersTemplate }
