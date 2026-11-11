"use client"

import * as React from "react"
import { toast } from "sonner"

import { isValidEmail, nameFromEmail } from "@/lib/admin-platform"
import { ROLE_LABEL, TEAM_MEMBERS } from "@/lib/data/admin-platform"
import type { AdminRole, TeamMember } from "@/types/admin-platform"

export type InviteErrors = { email?: string }

/** Admin team: the member list, invites and 2FA resets. */
function useAdminPlatformTeam(initial: TeamMember[] = TEAM_MEMBERS) {
  const [members, setMembers] = React.useState(initial)
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [resetTarget, setResetTarget] = React.useState<TeamMember | null>(null)

  function validateInvite(email: string): InviteErrors {
    const address = email.trim()
    if (!address) return { email: "Enter the email address to invite." }
    if (!isValidEmail(address)) return { email: "Enter a valid email address." }
    if (members.some((member) => member.email.toLowerCase() === address.toLowerCase())) {
      return { email: "This email is already on the admin team." }
    }
    return {}
  }

  /** Adds a pending row. Returns the errors to show, or null once it worked. */
  function invite(email: string, role: AdminRole): InviteErrors | null {
    const errors = validateInvite(email)
    if (errors.email) return errors

    const address = email.trim()
    setMembers((current) => [
      ...current,
      {
        id: `invite-${address.toLowerCase()}`,
        name: nameFromEmail(address) || address,
        email: address,
        role,
        authenticator: "pending",
        lastActive: "Never",
        added: true,
      },
    ])
    setInviteOpen(false)
    toast.success("Invite sent", {
      description: `${address} will join as ${ROLE_LABEL[role]}.`,
    })
    return null
  }

  function confirmReset() {
    if (!resetTarget) return
    const target = resetTarget
    setMembers((current) =>
      current.map((member) =>
        member.id === target.id
          ? { ...member, authenticator: "pending", added: false }
          : member
      )
    )
    setResetTarget(null)
    toast.success(`Two-factor reset for ${target.name}`, {
      description: "They set up a new authenticator the next time they sign in.",
    })
  }

  function resendInvite(member: TeamMember) {
    toast.success("Invite sent again", { description: member.email })
  }

  return {
    members,
    inviteOpen,
    setInviteOpen,
    resetTarget,
    setResetTarget,
    validateInvite,
    invite,
    confirmReset,
    resendInvite,
  }
}

export { useAdminPlatformTeam }
