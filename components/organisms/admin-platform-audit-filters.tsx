"use client"

import { Input } from "@/components/ui/input"
import { AdminPlatformSelect } from "@/components/molecules/admin-platform-select"
import { AUDIT_PERIODS } from "@/lib/data/admin-platform"

/** Search box and the admin / action / period filters of the audit log. */
function AdminPlatformAuditFilters({
  query,
  admin,
  action,
  periodId,
  admins,
  actions,
  onQueryChange,
  onAdminChange,
  onActionChange,
  onPeriodChange,
}: {
  query: string
  admin: string
  action: string
  periodId: string
  admins: readonly string[]
  actions: readonly string[]
  onQueryChange: (value: string) => void
  onAdminChange: (value: string) => void
  onActionChange: (value: string) => void
  onPeriodChange: (periodId: string) => void
}) {
  const period = AUDIT_PERIODS.find((item) => item.id === periodId) ?? AUDIT_PERIODS[2]

  return (
    <div
      role="search"
      className="flex flex-wrap items-center gap-2.5 [&>*]:basis-full sm:[&>*]:basis-auto"
    >
      <Input
        type="search"
        aria-label="Search target or admin"
        placeholder="Search target or admin"
        autoComplete="off"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="sm:w-75"
      />
      <AdminPlatformSelect
        className="sm:w-fit"
        ariaLabel="Filter by admin"
        value={admin}
        options={admins}
        onValueChange={onAdminChange}
      />
      <AdminPlatformSelect
        className="sm:w-fit"
        ariaLabel="Filter by action"
        value={action}
        options={actions}
        onValueChange={onActionChange}
      />
      <AdminPlatformSelect
        className="sm:w-fit"
        ariaLabel="Filter by period"
        value={period.label}
        options={AUDIT_PERIODS.map((item) => item.label)}
        onValueChange={(label) =>
          onPeriodChange(AUDIT_PERIODS.find((item) => item.label === label)?.id ?? "30d")
        }
      />
    </div>
  )
}

export { AdminPlatformAuditFilters }
