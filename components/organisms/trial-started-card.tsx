"use client"

import { CheckIcon } from "lucide-react"

import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { OnboardingStatusIcon } from "@/components/atoms/onboarding-status-icon"
import { OnboardingCard } from "@/components/molecules/onboarding-card"
import { OnboardingHeading } from "@/components/molecules/onboarding-heading"
import {
  OnboardingStatGrid,
  OnboardingStatTile,
} from "@/components/molecules/onboarding-stat-tile"
import { useOnboardingProfile } from "@/hooks/use-onboarding-session"
import { TRIAL } from "@/lib/data/plans"
import { plural } from "@/lib/onboarding"

/** "Your free trial has started": what the trial includes, then into the console. */
function TrialStartedCard() {
  const { name, bibleVersion } = useOnboardingProfile()

  return (
    <OnboardingCard width="md" padding="roomy">
      <OnboardingStatusIcon tone="success" className="mb-4">
        <CheckIcon />
      </OnboardingStatusIcon>

      <OnboardingHeading
        title="Your free trial has started"
        description={
          <>
            Welcome, <bdi>{name}</bdi>. Here is what you get.
          </>
        }
        className="mb-5.5"
        descriptionClassName="mt-2"
      />

      <OnboardingStatGrid>
        <OnboardingStatTile
          value={plural(TRIAL.days, "day")}
          label={`Ends ${TRIAL.endsOn}`}
        />
        <OnboardingStatTile
          value={plural(TRIAL.hoursTotal, "hour")}
          label="Talk time"
        />
        <OnboardingStatTile
          value={plural(TRIAL.bibleVersions, "version")}
          label={bibleVersion}
        />
      </OnboardingStatGrid>

      <OnboardingButton href="/live/first-run" className="mt-6">
        Open the live console
      </OnboardingButton>

      <p className="mt-3.5 text-[13px] text-muted-foreground">
        <bdi>No card needed. We will remind you before it ends.</bdi>
      </p>
    </OnboardingCard>
  )
}

export { TrialStartedCard }
