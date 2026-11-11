"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  ADMIN_USERS,
  ADMIN_USER_STATUS_LABEL,
  addDays,
  describeRenewal,
} from "@/lib/data/admin-customers"
import { downloadCsv } from "@/lib/admin-customers-download"
import type { AdminUser, AdminUserFilter } from "@/types/admin-customers"

const TODAY = "2026-11-11"

/**
 * State and actions of the Users page: status filter, search, the selected
 * user (detail panel / sheet) and the per-user admin actions, which really
 * change the list (status, hours, device) and answer with a toast.
 */
function useAdminCustomersUsers() {
  const [users, setUsers] = React.useState<AdminUser[]>(ADMIN_USERS)
  const [filter, setFilter] = React.useState<AdminUserFilter>("all")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState(ADMIN_USERS[0].id)
  const [panelOpen, setPanelOpen] = React.useState(false)

  const visible = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return users.filter(
      (user) =>
        (filter === "all" || user.status === filter) &&
        (needle === "" ||
          user.name.toLowerCase().includes(needle) ||
          user.email.toLowerCase().includes(needle))
    )
  }, [users, filter, query])

  const selected = users.find((user) => user.id === selectedId) ?? users[0]

  function view(id: string) {
    setSelectedId(id)
    setPanelOpen(true)
  }

  function patch(id: string, changes: Partial<AdminUser>) {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, ...changes } : user))
    )
  }

  const actions = {
    resetDevice(user: AdminUser) {
      patch(user.id, { device: null })
      toast.success("Device reset", {
        description: `${user.name} can sign in on a new device.`,
      })
    },
    extend(user: AdminUser) {
      const date = addDays(user.renewal.date, 30)
      patch(user.id, {
        status: user.status === "expired" ? "active" : user.status,
        renewal:
          user.renewal.kind === "trial"
            ? { ...user.renewal, date }
            : {
                kind: "renews",
                date,
                billing: user.renewal.billing ?? "monthly",
              },
      })
      toast.success("Plan extended by 30 days", { description: user.name })
    },
    grantHours(user: AdminUser) {
      patch(user.id, { hoursTotal: user.hoursTotal + 5 })
      toast.success("5 talk hours granted", { description: user.name })
    },
    toggleSuspend(user: AdminUser) {
      if (user.status === "suspended") {
        patch(user.id, {
          status: user.plan === "Trial" ? "trial" : "active",
          renewal:
            user.plan === "Trial"
              ? { kind: "trial", date: addDays(TODAY, 7) }
              : {
                  kind: "renews",
                  date: addDays(TODAY, 30),
                  billing: "monthly",
                },
        })
        toast.success("Account reinstated", { description: user.name })
      } else {
        patch(user.id, {
          status: "suspended",
          renewal: { kind: "paused", date: TODAY },
        })
        toast.success("Account suspended", { description: user.name })
      }
    },
    grantTrial(user: AdminUser) {
      if (user.status === "trial") {
        toast.info("Already on a free trial", { description: user.name })
        return
      }
      patch(user.id, {
        plan: "Trial",
        status: "trial",
        hoursUsed: 0,
        hoursTotal: 1,
        renewal: { kind: "trial", date: addDays(TODAY, 14) },
      })
      toast.success("Free trial granted", { description: user.name })
    },
    endTrial(user: AdminUser) {
      if (user.status !== "trial") {
        toast.info("Not on a free trial", { description: user.name })
        return
      }
      patch(user.id, {
        status: "expired",
        renewal: { kind: "ended", date: TODAY },
      })
      toast.success("Free trial ended", { description: user.name })
    },
  }

  function exportCsv() {
    if (visible.length === 0) {
      toast.info("Nothing to export", {
        description: "No users match the current filter.",
      })
      return
    }
    downloadCsv(
      "wordalive-users.csv",
      [
        "Name",
        "Email",
        "Location",
        "Plan",
        "Status",
        "Hours used",
        "Hours total",
        "Last active",
        "Renewal",
      ],
      visible.map((user) => [
        user.name,
        user.email,
        user.location,
        user.plan,
        ADMIN_USER_STATUS_LABEL[user.status],
        user.hoursUsed,
        user.hoursTotal,
        user.lastActive,
        `${describeRenewal(user).caption} ${describeRenewal(user).value}`,
      ])
    )
    toast.success("Users exported", {
      description: `${visible.length} ${visible.length === 1 ? "user" : "users"} saved as wordalive-users.csv`,
    })
  }

  return {
    visible,
    filter,
    setFilter,
    query,
    setQuery,
    selected,
    view,
    panelOpen,
    setPanelOpen,
    actions,
    exportCsv,
  }
}

export { useAdminCustomersUsers }
