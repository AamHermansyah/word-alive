"use client"

import Link from "next/link"

import { AdminPlatformFieldNote } from "@/components/atoms/admin-platform-field-note"
import { AdminPlatformStatusBadge } from "@/components/atoms/admin-platform-status-badge"
import { FormField } from "@/components/molecules/form-field"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { AdminPlatformToggleRow } from "@/components/molecules/admin-platform-toggle-row"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { LegalDraftState } from "@/hooks/use-admin-platform-legal"
import type { LegalVersion } from "@/types/admin-platform"

const DRAFT_BADGE = {
  unsaved: { tone: "warning", label: "Unsaved" },
  saved: { tone: "success", label: "Saved" },
  clean: { tone: "neutral", label: "No changes" },
} as const

const ROW = "flex items-center justify-between gap-3 py-1.5"

/** Published version, the draft and its state, and the older versions. */
function AdminPlatformLegalVersionsCard({
  published,
  history,
  draftVersion,
  draftState,
}: {
  published: LegalVersion
  history: LegalVersion[]
  draftVersion: number
  draftState: LegalDraftState
}) {
  const badge = DRAFT_BADGE[draftState]

  return (
    <AdminPlatformPanel title="Versions">
      <ul className="text-[13px]">
        <li className={ROW}>
          <span className="font-semibold">Published v{published.version}</span>
          <span className="text-xs text-muted-foreground">{published.date}</span>
        </li>
        <li className={`${ROW} border-t border-border`}>
          <span className="font-semibold">Draft v{draftVersion}</span>
          <AdminPlatformStatusBadge key={draftState} tone={badge.tone}>
            {badge.label}
          </AdminPlatformStatusBadge>
        </li>
        {history.map((entry) => (
          <li key={entry.version} className={`${ROW} border-t border-border`}>
            <span>v{entry.version}</span>
            <span className="text-xs text-muted-foreground">{entry.date}</span>
          </li>
        ))}
      </ul>
    </AdminPlatformPanel>
  )
}

/** What happens on publish: email users, ask to accept again, effective date. */
function AdminPlatformLegalPublishCard({
  docId,
  emailUsers,
  askToAccept,
  effectiveDate,
  effectiveError,
  onEmailUsersChange,
  onAskToAcceptChange,
  onEffectiveDateChange,
}: {
  docId: string
  emailUsers: boolean
  askToAccept: boolean
  effectiveDate: string
  effectiveError: string | null
  onEmailUsersChange: (value: boolean) => void
  onAskToAcceptChange: (value: boolean) => void
  onEffectiveDateChange: (value: string) => void
}) {
  return (
    <AdminPlatformPanel title="When you publish">
      <AdminPlatformToggleRow
        id={`legal-email-${docId}`}
        label="Email users about this change"
        checked={emailUsers}
        onCheckedChange={onEmailUsersChange}
        className="mb-3"
      />
      <AdminPlatformToggleRow
        id={`legal-accept-${docId}`}
        label="Ask users to accept again"
        checked={askToAccept}
        onCheckedChange={onAskToAcceptChange}
        className="mb-3"
      />
      <FormField label="Effective date" htmlFor={`legal-date-${docId}`}>
        <Input
          id={`legal-date-${docId}`}
          value={effectiveDate}
          onChange={(event) => onEffectiveDateChange(event.target.value)}
          aria-invalid={Boolean(effectiveError)}
          aria-describedby={`legal-date-note-${docId}`}
        />
      </FormField>
      {effectiveError ? (
        <AdminPlatformFieldNote id={`legal-date-note-${docId}`} className="mt-1">
          {effectiveError}
        </AdminPlatformFieldNote>
      ) : null}
    </AdminPlatformPanel>
  )
}

/** Pointer to the page that lists who receives the audio. */
function AdminPlatformLegalProvidersNote() {
  return (
    <Card className="min-w-0 gap-0 bg-background">
      <CardContent className="text-[13px]">
        Providers that receive audio are listed from{" "}
        <Link
          href="/admin/ai"
          className="font-bold underline-offset-4 hover:underline"
        >
          AI providers
        </Link>
        .
      </CardContent>
    </Card>
  )
}

export {
  AdminPlatformLegalProvidersNote,
  AdminPlatformLegalPublishCard,
  AdminPlatformLegalVersionsCard,
}
