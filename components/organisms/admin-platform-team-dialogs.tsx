"use client"

import * as React from "react"

import { AdminPlatformFieldNote } from "@/components/atoms/admin-platform-field-note"
import { FormField } from "@/components/molecules/form-field"
import { AdminPlatformSelect } from "@/components/molecules/admin-platform-select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { InviteErrors } from "@/hooks/use-admin-platform-team"
import { ROLE_LABEL } from "@/lib/data/admin-platform"
import type { AdminRole, TeamMember } from "@/types/admin-platform"

const ROLE_OPTIONS = [ROLE_LABEL.super, ROLE_LABEL.support] as const
const ROLE_HINT: Record<AdminRole, string> = {
  super: "Full access, including pricing, provider keys and the admin team.",
  support: "Customers, devices and songs. No pricing, keys or team changes.",
}

function roleFromLabel(label: string): AdminRole {
  return label === ROLE_LABEL.super ? "super" : "support"
}

/** The form is mounted only while the dialog is open, so it always starts empty. */
function InviteForm({
  onInvite,
  onCancel,
}: {
  onInvite: (email: string, role: AdminRole) => InviteErrors | null
  onCancel: () => void
}) {
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState<AdminRole>("support")
  const [errors, setErrors] = React.useState<InviteErrors>({})

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const result = onInvite(email, role)
    if (result) setErrors(result)
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <div className="grid gap-1">
        <FormField label="Email address" htmlFor="team-invite-email">
          <Input
            id="team-invite-email"
            type="email"
            autoComplete="off"
            autoFocus
            placeholder="name@wordalive.app"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setErrors({})
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="team-invite-email-note"
          />
        </FormField>
        {errors.email ? (
          <AdminPlatformFieldNote id="team-invite-email-note">
            {errors.email}
          </AdminPlatformFieldNote>
        ) : null}
      </div>

      <div className="grid gap-1">
        <AdminPlatformSelect
          id="team-invite-role"
          label="Role"
          value={ROLE_LABEL[role]}
          onValueChange={(label) => setRole(roleFromLabel(label))}
          options={ROLE_OPTIONS}
        />
        <p className="text-xs text-muted-foreground">{ROLE_HINT[role]}</p>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Send invite</Button>
      </DialogFooter>
    </form>
  )
}

/** "Invite admin": email and role, validated before a pending row is added. */
function AdminPlatformInviteDialog({
  open,
  onOpenChange,
  onInvite,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvite: (email: string, role: AdminRole) => InviteErrors | null
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Invite admin</DialogTitle>
          <DialogDescription>
            They get an email to set up an authenticator before they can sign in.
          </DialogDescription>
        </DialogHeader>
        <InviteForm onInvite={onInvite} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

/** Confirms resetting someone's authenticator. */
function AdminPlatformReset2faDialog({
  member,
  onCancel,
  onConfirm,
}: {
  member: TeamMember | null
  onCancel: () => void
  onConfirm: () => void
}) {
  // Keep the name while the dialog animates out.
  const [shown, setShown] = React.useState<TeamMember | null>(member)
  if (member && member !== shown) setShown(member)

  return (
    <AlertDialog
      open={member !== null}
      onOpenChange={(next) => {
        if (!next) onCancel()
      }}
    >
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Reset two-factor for {shown?.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            Their current authenticator stops working and{" "}
            <bdi>{shown?.email}</bdi> must set up a new one the next time they
            sign in. Their status becomes Setup pending.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Reset 2FA
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { AdminPlatformInviteDialog, AdminPlatformReset2faDialog }
