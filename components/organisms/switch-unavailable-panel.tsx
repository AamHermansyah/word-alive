"use client"

import * as React from "react"
import { ClockIcon, TriangleAlertIcon } from "lucide-react"
import { toast } from "sonner"

import { FadeIn } from "@/components/atoms/fade-in"
import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { OnboardingStatusIcon } from "@/components/atoms/onboarding-status-icon"
import { OnboardingNoticeCard } from "@/components/molecules/onboarding-notice-card"
import { Badge } from "@/components/ui/badge"
import { useCountdown } from "@/hooks/use-countdown"
import {
  EMERGENCY_SWITCH_MINUTES,
  SWITCH_COOLDOWN,
} from "@/lib/data/onboarding"
import { formatHoursMinutes } from "@/lib/onboarding"

type EmergencyState = "idle" | "requesting" | "requested"

const EMERGENCY_ID = "emergency-switch"
const REQUEST_DELAY_MS = 700

/** Waiting card: counts the minutes down until this device can take over. */
function EmergencyRequestedCard({ onCancel }: { onCancel: () => void }) {
  const { remaining, done } = useCountdown(EMERGENCY_SWITCH_MINUTES, 60_000)

  return (
    <OnboardingNoticeCard
      id={EMERGENCY_ID}
      icon={
        <OnboardingStatusIcon tone="info">
          <ClockIcon />
        </OnboardingStatusIcon>
      }
      title="Emergency switch requested"
      descriptionClassName="md:leading-5.5"
      actionsClassName="pt-3.5"
      description={
        done ? (
          "Ready now. Use the link we emailed to finish switching."
        ) : (
          <>
            Ready in <bdi>{formatHoursMinutes(remaining)}</bdi>. We emailed a
            link to confirm it is you.
          </>
        )
      }
      actions={
        <OnboardingButton variant="outline" onClick={onCancel}>
          Cancel request
        </OnboardingButton>
      }
    />
  )
}

/**
 * Switch not available: the church switched device too recently. Explains the
 * wait, and offers the emergency route (24 hour wait, confirmed by email) for
 * a lost or broken device. Requesting turns the card into a waiting state;
 * cancelling returns to the offer.
 */
function SwitchUnavailablePanel() {
  const [emergency, setEmergency] = React.useState<EmergencyState>("idle")
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  React.useEffect(() => () => clearTimeout(timer.current), [])

  function request() {
    setEmergency("requesting")
    timer.current = setTimeout(() => {
      setEmergency("requested")
      toast.success("Emergency switch requested", {
        description: "We emailed a link to confirm it is you.",
      })
    }, REQUEST_DELAY_MS)
  }

  function cancel() {
    setEmergency("idle")
    toast("Emergency switch cancelled")
  }

  function jumpToEmergency(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    const card = document.getElementById(EMERGENCY_ID)
    card?.scrollIntoView({ behavior: "smooth", block: "center" })
    card?.querySelector<HTMLElement>("button")?.focus({ preventScroll: true })
  }

  return (
    <>
      <h1 className="sr-only">Switch not available</h1>
      <div className="grid w-full max-w-181 gap-4 md:gap-5 xl:max-w-193 xl:grid-cols-2">
        <OnboardingNoticeCard
          icon={
            <OnboardingStatusIcon tone="warning">
              <ClockIcon />
            </OnboardingStatusIcon>
          }
          title="You switched recently"
          description={`You can switch again on ${SWITCH_COOLDOWN.nextSwitch}.`}
          actionsClassName="pt-3.5"
          actions={
            <>
              <Badge variant="warning" className="self-center">
                <bdi>Next switch: {SWITCH_COOLDOWN.nextSwitch}</bdi>
              </Badge>
              <a
                href={`#${EMERGENCY_ID}`}
                onClick={jumpToEmergency}
                className="mx-auto my-4 inline-flex min-h-10 items-center text-[13px] font-semibold text-brand-text hover:underline md:min-h-0"
              >
                <bdi>Lost or broken device?</bdi>
              </a>
              <OnboardingButton href="/sign-in" variant="outline">
                Back to sign in
              </OnboardingButton>
            </>
          }
        />

        <FadeIn
          key={emergency === "requested" ? "requested" : "offer"}
          className="flex"
        >
          {emergency === "requested" ? (
            <EmergencyRequestedCard onCancel={cancel} />
          ) : (
            <OnboardingNoticeCard
              id={EMERGENCY_ID}
              icon={
                <OnboardingStatusIcon tone="brand">
                  <TriangleAlertIcon />
                </OnboardingStatusIcon>
              }
              title="Emergency switch"
              descriptionClassName="md:leading-5.5"
              actionsClassName="pt-3.5"
              description="For a lost, stolen or broken device. We wait 24 hours and email the address on your old device before this device takes over."
              actions={
                <OnboardingButton
                  onClick={request}
                  loading={emergency === "requesting"}
                  loadingLabel="Requesting…"
                >
                  Request emergency switch
                </OnboardingButton>
              }
            />
          )}
        </FadeIn>
      </div>
    </>
  )
}

export { SwitchUnavailablePanel }
