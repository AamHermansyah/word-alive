"use client"

import * as React from "react"
import { ClockIcon } from "lucide-react"

import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { OnboardingStatusIcon } from "@/components/atoms/onboarding-status-icon"
import { OnboardingCard } from "@/components/molecules/onboarding-card"
import { OnboardingHeading } from "@/components/molecules/onboarding-heading"
import {
  OnboardingStatGrid,
  OnboardingStatTile,
} from "@/components/molecules/onboarding-stat-tile"
import { PlanChoiceGroup } from "@/components/organisms/plan-choice-group"
import { DEFAULT_PLAN, TRIAL_SUMMARY } from "@/lib/data/onboarding"
import { plural } from "@/lib/onboarding"
import type { PlanId } from "@/types/onboarding"

/** "Your free trial has ended": what was used, pick a plan, go to payment. */
function TrialEndedCard() {
  const [plan, setPlan] = React.useState<PlanId>(DEFAULT_PLAN)

  return (
    <OnboardingCard width="xl" padding="regular">
      <OnboardingStatusIcon tone="warning" className="mb-4">
        <ClockIcon />
      </OnboardingStatusIcon>

      <OnboardingHeading
        title="Your free trial has ended"
        description="Pick a plan to keep going. Your songs and settings are saved."
        className="mb-5.5"
        descriptionClassName="mt-2"
      />

      <OnboardingStatGrid>
        <OnboardingStatTile
          value={`${TRIAL_SUMMARY.hoursUsed} of ${plural(TRIAL_SUMMARY.hoursTotal, "hour")}`}
          label="used"
        />
        <OnboardingStatTile
          value={plural(TRIAL_SUMMARY.services, "service")}
          label="run"
        />
        <OnboardingStatTile
          value={plural(TRIAL_SUMMARY.songs, "song")}
          label="added"
        />
      </OnboardingStatGrid>

      <PlanChoiceGroup
        label="Plan"
        value={plan}
        onValueChange={setPlan}
        billing="monthly"
        className="mt-5"
      />

      <OnboardingButton href={`/plan?plan=${plan}`} className="mt-5">
        Continue to payment
      </OnboardingButton>

      <p className="mt-3 text-[13px] text-muted-foreground">
        <bdi>You will pay securely with Google Pay through Paystack.</bdi>
      </p>
    </OnboardingCard>
  )
}

export { TrialEndedCard }
