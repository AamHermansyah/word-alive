"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminCustomersTabs } from "@/components/molecules/admin-customers-tabs"
import { AdminCustomersSplitLayout } from "@/components/organisms/admin-customers-split-layout"
import { AdminCustomersSupportPanel } from "@/components/organisms/admin-customers-support-panel"
import { AdminCustomersSupportTable } from "@/components/organisms/admin-customers-support-table"
import { Button } from "@/components/ui/button"
import { useAdminCustomersSupport } from "@/hooks/use-admin-customers-support"

/** Support inbox: All / New / Handled tabs, the message list and its panel. */
function AdminSupportTemplate() {
  const support = useAdminCustomersSupport()

  return (
    <>
      <AdminPageHeader
        title="Support inbox"
        subtitle="Messages from the landing page contact form"
      >
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={support.exportCsv}
        >
          Export CSV
        </Button>
      </AdminPageHeader>

      <AdminCustomersTabs
        label="Filter messages"
        value={support.filter}
        onValueChange={support.setFilter}
        tabs={[
          { value: "all", label: `All · ${support.counts.all}` },
          { value: "new", label: `New · ${support.counts.new}` },
          { value: "handled", label: "Handled" },
        ]}
      />

      <AdminCustomersSplitLayout
        panelLabel="Selected message"
        title={support.selected.name}
        subtitle={
          <>
            <bdi>
              {support.selected.email} · {support.selected.receivedAt}
            </bdi>
          </>
        }
        open={support.panelOpen}
        onOpenChange={support.setPanelOpen}
        list={
          <AdminCustomersSupportTable
            messages={support.visible}
            fadeKey={support.filter}
            onOpen={support.open}
          />
        }
      >
        <AdminCustomersSupportPanel
          message={support.selected}
          onToggleHandled={support.toggleHandled}
        />
      </AdminCustomersSplitLayout>
    </>
  )
}

export { AdminSupportTemplate }
