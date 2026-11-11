"use client"

import * as React from "react"
import { toast } from "sonner"

import { downloadTextFile, toCsv } from "@/lib/admin-platform"
import {
  AUDIT_ALL_ACTIONS,
  AUDIT_ALL_ADMINS,
  AUDIT_ENTRIES,
  AUDIT_NOW,
  AUDIT_PERIODS,
} from "@/lib/data/admin-platform"
import type { AuditEntry } from "@/types/admin-platform"

const DAY_MS = 24 * 60 * 60 * 1000

/** "$24.99 → $29.99 (note)" as plain text, for search and the CSV. */
export function describeChange(entry: AuditEntry): string {
  const arrow = entry.from && entry.to ? `${entry.from} → ${entry.to}` : ""
  return [arrow, entry.note].filter(Boolean).join(" ")
}

/** Audit log with working search, admin, action and period filters, and CSV export. */
function useAdminPlatformAudit(entries: AuditEntry[] = AUDIT_ENTRIES) {
  const [query, setQuery] = React.useState("")
  const [admin, setAdmin] = React.useState(AUDIT_ALL_ADMINS)
  const [action, setAction] = React.useState(AUDIT_ALL_ACTIONS)
  const [periodId, setPeriodId] = React.useState<string>("30d")

  const admins = React.useMemo(
    () => [AUDIT_ALL_ADMINS, ...Array.from(new Set(entries.map((entry) => entry.admin)))],
    [entries]
  )
  const actions = React.useMemo(
    () => [AUDIT_ALL_ACTIONS, ...Array.from(new Set(entries.map((entry) => entry.action)))],
    [entries]
  )

  const period = AUDIT_PERIODS.find((item) => item.id === periodId) ?? AUDIT_PERIODS[2]

  const rows = React.useMemo(() => {
    const since = Date.parse(AUDIT_NOW) - period.days * DAY_MS
    const needle = query.trim().toLowerCase()

    return entries.filter((entry) => {
      if (Date.parse(entry.at) < since) return false
      if (admin !== AUDIT_ALL_ADMINS && entry.admin !== admin) return false
      if (action !== AUDIT_ALL_ACTIONS && entry.action !== action) return false
      if (!needle) return true
      return [entry.target, entry.admin, entry.action, describeChange(entry)].some(
        (field) => field.toLowerCase().includes(needle)
      )
    })
  }, [entries, period.days, query, admin, action])

  const filtered =
    query.trim() !== "" ||
    admin !== AUDIT_ALL_ADMINS ||
    action !== AUDIT_ALL_ACTIONS

  function reset() {
    setQuery("")
    setAdmin(AUDIT_ALL_ADMINS)
    setAction(AUDIT_ALL_ACTIONS)
  }

  /** Downloads exactly the rows that are on screen. */
  function exportCsv() {
    if (rows.length === 0) {
      toast.error("Nothing to export", {
        description: "No entries match the current filters.",
      })
      return
    }
    const csv = toCsv([
      ["Time", "Admin", "Action", "Target", "Change", "IP"],
      ...rows.map((row) => [
        row.when,
        row.admin,
        row.action,
        row.target,
        describeChange(row),
        row.ip,
      ]),
    ])
    downloadTextFile("wordalive-audit-log.csv", csv)
    toast.success("Audit log exported", {
      description: `${rows.length} ${rows.length === 1 ? "entry" : "entries"} saved to wordalive-audit-log.csv.`,
    })
  }

  return {
    rows,
    query,
    admin,
    action,
    periodId,
    admins,
    actions,
    filtered,
    setQuery,
    setAdmin,
    setAction,
    setPeriodId,
    reset,
    exportCsv,
  }
}

export { useAdminPlatformAudit }
