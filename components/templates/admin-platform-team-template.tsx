"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import {
  AdminPlatformInviteDialog,
  AdminPlatformReset2faDialog,
} from "@/components/organisms/admin-platform-team-dialogs"
import { AdminPlatformRoleMatrixCard } from "@/components/organisms/admin-platform-role-matrix-card"
import { AdminPlatformTeamCard } from "@/components/organisms/admin-platform-team-card"
import { Button } from "@/components/ui/button"
import { useAdminPlatformTeam } from "@/hooks/use-admin-platform-team"

/** Admin team: the member table, what each role can do, invite and 2FA reset dialogs. */
function AdminPlatformTeamTemplate() {
  const team = useAdminPlatformTeam()

  return (
    <>
      <AdminPageHeader
        title="Admin team"
        subtitle="Who can sign in to the admin console"
      >
        <Button
          className="flex-1 sm:flex-none"
          onClick={() => team.setInviteOpen(true)}
        >
          Invite admin
        </Button>
      </AdminPageHeader>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-[600fr_356fr] lg:items-start">
        <AdminPlatformTeamCard
          members={team.members}
          onReset={team.setResetTarget}
          onResend={team.resendInvite}
        />
        <AdminPlatformRoleMatrixCard />
      </div>

      <AdminPlatformInviteDialog
        open={team.inviteOpen}
        onOpenChange={team.setInviteOpen}
        onInvite={team.invite}
      />
      <AdminPlatformReset2faDialog
        member={team.resetTarget}
        onCancel={() => team.setResetTarget(null)}
        onConfirm={team.confirmReset}
      />
    </>
  )
}

export { AdminPlatformTeamTemplate }
