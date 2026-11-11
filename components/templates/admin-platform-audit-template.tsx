"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminPlatformAuditFilters } from "@/components/organisms/admin-platform-audit-filters"
import { AdminPlatformAuditTableCard } from "@/components/organisms/admin-platform-audit-table-card"
import { Button } from "@/components/ui/button"
import { useAdminPlatformAudit } from "@/hooks/use-admin-platform-audit"

/** Audit log: filters on top, the matching entries below, CSV export in the header. */
function AdminPlatformAuditTemplate() {
  const audit = useAdminPlatformAudit()

  return (
    <>
      <AdminPageHeader
        title="Audit log"
        subtitle="Every admin change is recorded and cannot be edited"
      >
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          onClick={audit.exportCsv}
        >
          Export CSV
        </Button>
      </AdminPageHeader>

      <AdminPlatformAuditFilters
        query={audit.query}
        admin={audit.admin}
        action={audit.action}
        periodId={audit.periodId}
        admins={audit.admins}
        actions={audit.actions}
        onQueryChange={audit.setQuery}
        onAdminChange={audit.setAdmin}
        onActionChange={audit.setAction}
        onPeriodChange={audit.setPeriodId}
      />

      <AdminPlatformAuditTableCard
        rows={audit.rows}
        onResetFilters={audit.reset}
      />
    </>
  )
}

export { AdminPlatformAuditTemplate }
