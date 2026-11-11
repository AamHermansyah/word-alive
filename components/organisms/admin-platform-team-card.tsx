"use client"

import { FadeIn } from "@/components/atoms/fade-in"
import { AdminPlatformStatusBadge } from "@/components/atoms/admin-platform-status-badge"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { DataTable, type DataTableColumn } from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import { ROLE_LABEL } from "@/lib/data/admin-platform"
import type { TeamMember } from "@/types/admin-platform"

/** Rows as tall as the mockup: 10px above and below the content. */
const CELL = "md:[&:is(td)]:py-2.5"

/** Name and email; a member invited just now fades in. */
function MemberName({ member }: { member: TeamMember }) {
  const content = (
    <>
      <div className="text-sm font-bold wrap-break-word">
        <bdi>{member.name}</bdi>
      </div>
      <div className="text-xs font-normal text-muted-foreground wrap-break-word">
        <bdi>{member.email}</bdi>
      </div>
    </>
  )
  return member.added ? (
    <FadeIn className="min-w-0">{content}</FadeIn>
  ) : (
    <div className="min-w-0">{content}</div>
  )
}

function buildColumns(
  onReset: (member: TeamMember) => void,
  onResend: (member: TeamMember) => void
): DataTableColumn<TeamMember>[] {
  return [
    {
      id: "admin",
      header: "Admin",
      primary: true,
      className: `md:w-3/10 ${CELL}`,
      cell: (member) => <MemberName member={member} />,
    },
    {
      id: "role",
      header: "Role",
      className: `md:w-1/5 ${CELL}`,
      cell: (member) => (
        <AdminPlatformStatusBadge tone={member.role === "super" ? "brand" : "info"}>
          {ROLE_LABEL[member.role]}
        </AdminPlatformStatusBadge>
      ),
    },
    {
      id: "authenticator",
      header: "Authenticator",
      className: `md:w-1/5 ${CELL}`,
      cell: (member) => (
        <span key={member.authenticator} className="inline-flex max-w-full animate-in fade-in-0 duration-300 motion-reduce:animate-none">
          <AdminPlatformStatusBadge
            tone={member.authenticator === "enabled" ? "success" : "warning"}
          >
            {member.authenticator === "enabled" ? "Enabled" : "Setup pending"}
          </AdminPlatformStatusBadge>
        </span>
      ),
    },
    {
      id: "lastActive",
      header: "Last active",
      className: `md:w-1/7 ${CELL}`,
      cell: (member) => <bdi>{member.lastActive}</bdi>,
    },
    {
      id: "actions",
      header: "Actions",
      actions: true,
      className: `md:w-1/6 ${CELL}`,
      cell: (member) => (
        <Button
          variant="link"
          size="sm"
          className="px-0 text-[13px] font-semibold whitespace-normal text-start text-brand-text hover:no-underline md:hover:underline"
          aria-label={
            member.authenticator === "pending"
              ? `Resend invite to ${member.name}`
              : `Reset two-factor for ${member.name}`
          }
          onClick={() =>
            member.authenticator === "pending" ? onResend(member) : onReset(member)
          }
        >
          {member.authenticator === "pending" ? "Resend invite" : "Reset 2FA"}
        </Button>
      ),
    },
  ]
}

/** Who can sign in to the admin console, with each person's role and authenticator state. */
function AdminPlatformTeamCard({
  members,
  onReset,
  onResend,
}: {
  members: TeamMember[]
  onReset: (member: TeamMember) => void
  onResend: (member: TeamMember) => void
}) {
  return (
    <AdminPlatformPanel>
      <DataTable
        aria-label="Admin team"
        columns={buildColumns(onReset, onResend)}
        rows={members}
        getRowKey={(member) => member.id}
        empty="No admins yet. Invite the first one."
      />
    </AdminPlatformPanel>
  )
}

export { AdminPlatformTeamCard }
