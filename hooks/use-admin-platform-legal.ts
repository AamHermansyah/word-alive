"use client"

import * as React from "react"
import { toast } from "sonner"

import { canonicalHtml, htmlToText } from "@/lib/admin-platform"
import { LEGAL_TABS, createLegalDocs } from "@/lib/data/admin-platform"
import type { LegalDocId, LegalDocState } from "@/types/admin-platform"

export type LegalDraftState = "unsaved" | "saved" | "clean"

export function isLegalDirty(doc: LegalDocState): boolean {
  return (
    doc.title !== doc.savedTitle ||
    canonicalHtml(doc.html) !== canonicalHtml(doc.savedHtml)
  )
}

function matchesPublished(doc: LegalDocState): boolean {
  return (
    doc.title === doc.publishedTitle &&
    canonicalHtml(doc.html) === canonicalHtml(doc.publishedHtml)
  )
}

function savedMatchesPublished(doc: LegalDocState): boolean {
  return (
    doc.savedTitle === doc.publishedTitle &&
    canonicalHtml(doc.savedHtml) === canonicalHtml(doc.publishedHtml)
  )
}

function todayLabel(): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
    new Date()
  )
}

function tabLabel(id: LegalDocId): string {
  return LEGAL_TABS.find((tab) => tab.id === id)?.label ?? id
}

/**
 * Legal pages editor: three documents, each with a saved draft and a
 * published version. Tracks unsaved edits, guards tab switches, saves drafts
 * and publishes.
 */
function useAdminPlatformLegal() {
  const [docs, setDocs] = React.useState(createLegalDocs)
  const [activeId, setActiveId] = React.useState<LegalDocId>("privacy")
  const [pendingId, setPendingId] = React.useState<LegalDocId | null>(null)
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [effectiveError, setEffectiveError] = React.useState<string | null>(null)

  const doc = docs[activeId]
  const dirty = isLegalDirty(doc)
  const draftVersion = doc.published.version + 1
  const draftState: LegalDraftState = dirty
    ? "unsaved"
    : savedMatchesPublished(doc)
      ? "clean"
      : "saved"
  const canPublish = !matchesPublished(doc)

  const patchActive = React.useCallback(
    (patch: Partial<LegalDocState>) => {
      setDocs((current) => ({
        ...current,
        [activeId]: { ...current[activeId], ...patch },
      }))
    },
    [activeId]
  )

  function selectTab(id: LegalDocId) {
    if (id === activeId) return
    if (dirty) setPendingId(id)
    else setActiveId(id)
  }

  /** Drops the unsaved edits of the open document and opens the requested tab. */
  function discardAndSwitch() {
    if (!pendingId) return
    setDocs((current) => ({
      ...current,
      [activeId]: {
        ...current[activeId],
        title: current[activeId].savedTitle,
        html: current[activeId].savedHtml,
        revision: current[activeId].revision + 1,
      },
    }))
    setActiveId(pendingId)
    setPendingId(null)
    toast("Unsaved changes discarded", { description: tabLabel(activeId) })
  }

  function keepEditing() {
    setPendingId(null)
  }

  function validateContent(): string | null {
    if (!doc.title.trim()) return "Give the document a title first."
    if (!htmlToText(doc.html)) return "The document is empty. Write something first."
    return null
  }

  function saveDraft() {
    const problem = validateContent()
    if (problem) {
      toast.error("Cannot save the draft", { description: problem })
      return
    }
    if (!dirty) {
      toast("Nothing to save", { description: `Draft v${draftVersion} is up to date.` })
      return
    }
    patchActive({ savedTitle: doc.title, savedHtml: doc.html })
    toast.success(`Draft v${draftVersion} saved`, {
      description: `${tabLabel(activeId)} · not visible to users yet.`,
    })
  }

  function publish() {
    const problem = validateContent()
    if (problem) {
      toast.error("Cannot publish", { description: problem })
      return
    }
    if (Number.isNaN(Date.parse(doc.effectiveDate))) {
      setEffectiveError("Enter a date such as Dec 1, 2026.")
      toast.error("Cannot publish", {
        description: "The effective date is not a valid date.",
      })
      return
    }
    if (!canPublish) {
      toast("Nothing new to publish", {
        description: `v${doc.published.version} is already live.`,
      })
      return
    }
    setEffectiveError(null)
    patchActive({
      published: { version: draftVersion, date: todayLabel() },
      history: [doc.published, ...doc.history],
      publishedTitle: doc.title,
      publishedHtml: doc.html,
      savedTitle: doc.title,
      savedHtml: doc.html,
    })
    toast.success(`${tabLabel(activeId)} v${draftVersion} published`, {
      description: doc.emailUsers
        ? `Takes effect ${doc.effectiveDate}. Users will be emailed.`
        : `Takes effect ${doc.effectiveDate}.`,
    })
  }

  function setEffectiveDate(value: string) {
    setEffectiveError(null)
    patchActive({ effectiveDate: value })
  }

  return {
    docs,
    doc,
    activeId,
    pendingId,
    dirty,
    draftVersion,
    draftState,
    canPublish,
    effectiveError,
    previewOpen,
    setPreviewOpen,
    patchActive,
    setEffectiveDate,
    selectTab,
    discardAndSwitch,
    keepEditing,
    saveDraft,
    publish,
  }
}

export { useAdminPlatformLegal }
