"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  ADMIN_SUPPORT_ARCHIVED_HANDLED,
  ADMIN_SUPPORT_MESSAGES,
} from "@/lib/data/admin-customers"
import { downloadCsv } from "@/lib/admin-customers-download"
import type {
  AdminSupportFilter,
  AdminSupportMessage,
} from "@/types/admin-customers"

/**
 * State of the Support inbox: tab filter, the open message (detail panel /
 * sheet) and "Mark as handled", which toggles a message between New and
 * Handled so the tab counts follow.
 */
function useAdminCustomersSupport() {
  const [messages, setMessages] = React.useState<AdminSupportMessage[]>(
    ADMIN_SUPPORT_MESSAGES
  )
  const [filter, setFilter] = React.useState<AdminSupportFilter>("all")
  const [selectedId, setSelectedId] = React.useState(
    ADMIN_SUPPORT_MESSAGES[0].id
  )
  const [panelOpen, setPanelOpen] = React.useState(false)

  const visible = React.useMemo(
    () =>
      messages.filter(
        (message) => filter === "all" || message.status === filter
      ),
    [messages, filter]
  )

  const counts = {
    all: messages.length + ADMIN_SUPPORT_ARCHIVED_HANDLED,
    new: messages.filter((message) => message.status === "new").length,
  }

  const selected =
    messages.find((message) => message.id === selectedId) ?? messages[0]

  function open(id: string) {
    setSelectedId(id)
    setPanelOpen(true)
  }

  function toggleHandled(message: AdminSupportMessage) {
    const next = message.status === "new" ? "handled" : "new"
    setMessages((current) =>
      current.map((item) =>
        item.id === message.id ? { ...item, status: next } : item
      )
    )
    toast.success(
      next === "handled" ? "Marked as handled" : "Moved back to New",
      {
        description: `${message.name}: ${message.subject}`,
      }
    )
  }

  function exportCsv() {
    if (visible.length === 0) {
      toast.info("Nothing to export", {
        description: "This tab has no messages.",
      })
      return
    }
    downloadCsv(
      "wordalive-support.csv",
      ["From", "Email", "Message", "Status", "Received"],
      visible.map((message) => [
        message.name,
        message.email,
        message.body,
        message.status === "new" ? "New" : "Handled",
        message.receivedAt,
      ])
    )
    toast.success("Messages exported", {
      description: `${visible.length} ${visible.length === 1 ? "message" : "messages"} saved as wordalive-support.csv`,
    })
  }

  return {
    visible,
    filter,
    setFilter,
    counts,
    selected,
    open,
    panelOpen,
    setPanelOpen,
    toggleHandled,
    exportCsv,
  }
}

export { useAdminCustomersSupport }
