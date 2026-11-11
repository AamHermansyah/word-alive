import { FadeIn } from "@/components/atoms/fade-in"
import {
  UserPlanBadge,
  UserStatusBadge,
} from "@/components/atoms/admin-customers-badges"
import { AdminCustomersFact } from "@/components/molecules/admin-customers-fact"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { describeRenewal } from "@/lib/data/admin-customers"
import type { AdminUser } from "@/types/admin-customers"

export type AdminCustomersUserActions = {
  resetDevice: (user: AdminUser) => void
  extend: (user: AdminUser) => void
  grantHours: (user: AdminUser) => void
  toggleSuspend: (user: AdminUser) => void
  grantTrial: (user: AdminUser) => void
  endTrial: (user: AdminUser) => void
}

/**
 * Body of the user detail panel: plan and status, talk hours, renewal,
 * device, and the six account actions. Shown beside the table from `xl` and
 * inside a Sheet below it.
 */
function AdminCustomersUserPanel({
  user,
  actions,
}: {
  user: AdminUser
  actions: AdminCustomersUserActions
}) {
  const renewal = describeRenewal(user)
  const percentUsed = Math.min(
    100,
    Math.round((user.hoursUsed / user.hoursTotal) * 100)
  )
  const suspended = user.status === "suspended"

  return (
    <FadeIn key={user.id} className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <UserPlanBadge plan={user.plan} />
        <UserStatusBadge status={user.status} />
      </div>

      <div>
        <Progress
          value={percentUsed}
          aria-label="Talk hours used this cycle"
          trackClassName="h-2"
          indicatorClassName="duration-500"
          className="gap-0"
        >
          <span className="mb-1.5 w-full text-xs text-muted-foreground">
            Talk hours this cycle
          </span>
        </Progress>
        <div className="mt-1 text-xs text-muted-foreground">
          <bdi>
            {user.hoursUsed} of {user.hoursTotal} hours used
          </bdi>
        </div>
      </div>

      <AdminCustomersFact
        caption={renewal.caption}
        value={<bdi>{renewal.value}</bdi>}
      />

      <AdminCustomersFact
        caption="Device"
        value={user.device ? <bdi>{user.device}</bdi> : "No device registered"}
        note={
          user.device ? (
            <bdi>{`${user.deviceSwitches} ${user.deviceSwitches === 1 ? "switch" : "switches"} in the last year`}</bdi>
          ) : (
            "The next sign-in claims a new device"
          )
        }
      />

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="px-2"
          onClick={() => actions.resetDevice(user)}
        >
          Reset device
        </Button>
        <Button
          variant="outline"
          className="px-2"
          onClick={() => actions.extend(user)}
        >
          Extend
        </Button>
        <Button
          variant="outline"
          className="px-2"
          onClick={() => actions.grantHours(user)}
        >
          Grant hours
        </Button>
        <Button
          variant="outline"
          className="px-2 text-destructive"
          onClick={() => actions.toggleSuspend(user)}
        >
          {suspended ? "Reinstate" : "Suspend"}
        </Button>
        <Button
          variant="outline"
          className="px-2"
          onClick={() => actions.grantTrial(user)}
        >
          Grant trial
        </Button>
        <Button
          variant="outline"
          className="px-2"
          onClick={() => actions.endTrial(user)}
        >
          End trial
        </Button>
      </div>
    </FadeIn>
  )
}

export { AdminCustomersUserPanel }
