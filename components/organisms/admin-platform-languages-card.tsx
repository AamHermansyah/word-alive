"use client"

import { Loader2Icon } from "lucide-react"

import { AdminPlatformStatusBadge } from "@/components/atoms/admin-platform-status-badge"
import { AdminPlatformSwitch } from "@/components/atoms/admin-platform-switch"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { DataTable, type DataTableColumn } from "@/components/organisms/data-table"
import type {
  AdminTone,
  LanguageRow,
  LanguageTest,
  ProviderSupport,
} from "@/types/admin-platform"

const SUPPORT: Record<ProviderSupport, { tone: AdminTone; label: string }> = {
  listed: { tone: "success", label: "Listed" },
  unverified: { tone: "warning", label: "Unverified" },
  "not-listed": { tone: "neutral", label: "Not listed" },
}

const TEST: Record<LanguageTest, { tone: AdminTone; label: string }> = {
  passed: { tone: "success", label: "Passed" },
  failed: { tone: "danger", label: "Failed" },
  "not-run": { tone: "neutral", label: "Not run" },
  running: { tone: "info", label: "Running" },
}

/** Pill that fades in again whenever its status changes. */
function StatusPill({ tone, label, busy }: { tone: AdminTone; label: string; busy?: boolean }) {
  return (
    <span
      key={label}
      className="inline-flex max-w-full animate-in fade-in-0 duration-300 motion-reduce:animate-none"
    >
      <AdminPlatformStatusBadge tone={tone}>
        {busy ? <Loader2Icon aria-hidden="true" className="animate-spin" /> : null}
        {label}
      </AdminPlatformStatusBadge>
    </span>
  )
}

function buildColumns(
  evaluating: boolean,
  onToggle: (code: string, enabled: boolean) => void
): DataTableColumn<LanguageRow>[] {
  return [
    {
      id: "language",
      header: "Language",
      primary: true,
      className: "md:w-4/15",
      cell: (row) => (
        <div>
          <div className="text-sm font-bold">{row.name}</div>
          {row.isDefault ? (
            <div className="text-xs font-normal text-muted-foreground">Default</div>
          ) : null}
        </div>
      ),
    },
    {
      id: "gemini",
      header: "Gemini Live",
      className: "md:w-1/5",
      cell: (row) => <StatusPill {...SUPPORT[row.gemini]} />,
    },
    {
      id: "deepgram",
      header: "Deepgram",
      className: "md:w-1/5",
      cell: (row) => <StatusPill {...SUPPORT[row.deepgram]} />,
    },
    {
      id: "test",
      header: "WordAlive test",
      className: "md:w-1/5",
      cell: (row) => <StatusPill {...TEST[row.test]} busy={row.test === "running"} />,
    },
    {
      id: "enabled",
      header: "Enabled",
      className: "md:w-2/15",
      cell: (row) => (
        <AdminPlatformSwitch
          className="data-disabled:opacity-70"
          aria-label={`${row.name} enabled`}
          checked={row.enabled}
          disabled={row.test !== "passed" || evaluating}
          onCheckedChange={(enabled) => onToggle(row.code, enabled)}
        />
      ),
    },
  ]
}

/** Every language with the providers that list it, its WordAlive test result and an Enabled switch. */
function AdminPlatformLanguagesCard({
  rows,
  evaluating,
  onToggle,
}: {
  rows: LanguageRow[]
  evaluating: boolean
  onToggle: (code: string, enabled: boolean) => void
}) {
  return (
    <AdminPlatformPanel>
      <DataTable
        aria-label="Languages"
        columns={buildColumns(evaluating, onToggle)}
        rows={rows}
        getRowKey={(row) => row.code}
        empty="No languages are configured yet."
      />
      <p className="mt-2.5 text-[13px] text-muted-foreground">
        Listed means the provider documents support. Unverified means it must be
        confirmed before use.
      </p>
    </AdminPlatformPanel>
  )
}

export { AdminPlatformLanguagesCard }
