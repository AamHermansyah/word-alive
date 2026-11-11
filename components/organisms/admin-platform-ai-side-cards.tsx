"use client"

import { AdminPlatformFieldNote } from "@/components/atoms/admin-platform-field-note"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { AdminPlatformThresholdField } from "@/components/molecules/admin-platform-threshold-field"
import { DataTable, type DataTableColumn } from "@/components/organisms/data-table"
import { AI_THRESHOLDS, AI_USAGE } from "@/lib/data/admin-platform"
import type { AiSettings, AiUsageRow } from "@/types/admin-platform"

/** The three confidence thresholds, each a slider with a typed value beside it. */
function AdminPlatformThresholdsCard({
  thresholds,
  error,
  onChange,
}: {
  thresholds: AiSettings["thresholds"]
  error?: string
  onChange: (key: keyof AiSettings["thresholds"], percent: number) => void
}) {
  return (
    <AdminPlatformPanel title="Confidence thresholds">
      <div className="flex flex-col gap-3.5 pb-3.5">
        {AI_THRESHOLDS.map((threshold) => (
          <AdminPlatformThresholdField
            key={threshold.key}
            id={`ai-threshold-${threshold.key}`}
            label={threshold.label}
            percent={thresholds[threshold.key]}
            invalid={Boolean(error) && threshold.key !== "lock"}
            onPercentChange={(percent) => onChange(threshold.key, percent)}
          />
        ))}
      </div>
      {error ? <AdminPlatformFieldNote className="mt-3">{error}</AdminPlatformFieldNote> : null}
    </AdminPlatformPanel>
  )
}

const USAGE_COLUMNS: DataTableColumn<AiUsageRow>[] = [
  {
    id: "service",
    header: "Service",
    primary: true,
    cell: (row) => row.service,
    className: "md:w-9/20 md:[&:is(td)]:py-2.5",
  },
  {
    id: "calls",
    header: "Calls",
    cell: (row) => <bdi>{row.calls}</bdi>,
    className: "md:w-3/10 md:[&:is(td)]:py-2.5",
  },
  {
    id: "errors",
    header: "Errors",
    cell: (row) => <bdi>{row.errors}</bdi>,
    className: "md:w-1/4 md:[&:is(td)]:py-2.5",
  },
]

/** Calls and error rate of each AI service this month. */
function AdminPlatformUsageCard() {
  return (
    <AdminPlatformPanel title="Usage this month">
      <DataTable
        aria-label="Usage this month"
        columns={USAGE_COLUMNS}
        rows={AI_USAGE}
        getRowKey={(row) => row.service}
      />
    </AdminPlatformPanel>
  )
}

export { AdminPlatformThresholdsCard, AdminPlatformUsageCard }
