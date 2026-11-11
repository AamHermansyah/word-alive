import {
  LockIcon,
  ShieldIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react"

import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { OnboardingStatusIcon } from "@/components/atoms/onboarding-status-icon"
import { OnboardingNoticeCard } from "@/components/molecules/onboarding-notice-card"
import { ACCOUNT_STATES } from "@/lib/data/onboarding"
import type { AccountState } from "@/types/onboarding"

const STATE_ICONS: Record<AccountState["id"], LucideIcon> = {
  grace: TriangleAlertIcon,
  expired: LockIcon,
  paused: ShieldIcon,
}

/**
 * The three account / subscription states a church can land in (grace period,
 * expired, paused): one card each, side by side on desktop and stacked
 * below. Cards in a row share one height, with the buttons on one line.
 */
function AccountStatusTemplate() {
  return (
    <>
      <h1 className="sr-only">Account status</h1>
      <div className="grid w-full max-w-181 gap-4 md:gap-5 xl:max-w-none xl:grid-cols-3">
        {ACCOUNT_STATES.map((state) => {
          const Icon = STATE_ICONS[state.id]
          return (
            <OnboardingNoticeCard
              key={state.id}
              icon={
                <OnboardingStatusIcon tone={state.tone}>
                  <Icon />
                </OnboardingStatusIcon>
              }
              badge={state.badge}
              title={state.title}
              description={state.description}
              actions={
                <OnboardingButton
                  href={state.action.href}
                  variant={state.action.variant}
                >
                  {state.action.label}
                </OnboardingButton>
              }
            />
          )
        })}
      </div>
    </>
  )
}

export { AccountStatusTemplate }
