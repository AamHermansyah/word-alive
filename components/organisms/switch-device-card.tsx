"use client"

import * as React from "react"
import { ArrowRightIcon, LaptopIcon } from "lucide-react"
import { toast } from "sonner"

import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { OnboardingStatusIcon } from "@/components/atoms/onboarding-status-icon"
import { DeviceSwitchTile } from "@/components/molecules/device-switch-tile"
import { OnboardingCard } from "@/components/molecules/onboarding-card"
import { OnboardingHeading } from "@/components/molecules/onboarding-heading"
import { OtpField } from "@/components/molecules/otp-field"
import { Button } from "@/components/ui/button"
import { useCountdown } from "@/hooks/use-countdown"
import { useDelayedNavigation } from "@/hooks/use-delayed-navigation"
import { useOnboardingProfile } from "@/hooks/use-onboarding-session"
import {
  AFTER_SIGN_IN,
  CURRENT_DEVICE,
  DEVICE_SWITCHES,
  NEW_DEVICE,
  REJECTED_CODE,
  RESEND_SECONDS,
} from "@/lib/data/onboarding"
import { formatCountdown } from "@/lib/onboarding"

const CODE_LENGTH = 6

/**
 * "Use WordAlive on this device?": a subscription works on one device at a
 * time, so moving it needs the emailed 6-digit code. The other device is
 * signed out when the switch happens.
 */
function SwitchDeviceCard() {
  const { email } = useOnboardingProfile()
  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState<string>()
  const { pending, go } = useDelayedNavigation()
  const { remaining, done, restart } = useCountdown(RESEND_SECONDS)

  function submit(value: string) {
    if (value.length !== CODE_LENGTH || pending) return
    if (value === REJECTED_CODE) {
      setError(
        "That code does not match. Check your email or ask for a new one."
      )
      return
    }
    setError(undefined)
    toast.success("Switched to this device", {
      description: "Your other device has been signed out.",
    })
    go(AFTER_SIGN_IN)
  }

  function resend() {
    restart()
    setCode("")
    setError(undefined)
    toast.success("Code sent", { description: email })
  }

  return (
    <OnboardingCard width="lg" padding="regular">
      <OnboardingStatusIcon tone="info" className="mb-4">
        <LaptopIcon />
      </OnboardingStatusIcon>

      <OnboardingHeading
        title="Use WordAlive on this device?"
        description="Your subscription works on one device at a time."
        className="mb-5.5"
        descriptionClassName="mt-2"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <DeviceSwitchTile device={CURRENT_DEVICE} />
        <ArrowRightIcon
          aria-hidden="true"
          className="size-5 shrink-0 rotate-90 self-center text-muted-foreground sm:rotate-0 rtl:sm:rotate-180"
        />
        <DeviceSwitchTile device={NEW_DEVICE} highlighted />
      </div>

      <p className="my-4 text-start text-[13px] leading-5.5 text-muted-foreground">
        <bdi className="block">
          Your other device will be signed out right away.
        </bdi>
        <bdi className="block">
          You have {DEVICE_SWITCHES.left} of {DEVICE_SWITCHES.total} switches
          left this year.
        </bdi>
      </p>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          submit(code)
        }}
      >
        <p className="mb-2.5 text-[13px] text-muted-foreground">
          <bdi className="wrap-break-word">
            Enter the code we sent to {email}
          </bdi>
        </p>
        {/* A code reads left to right in any language. */}
        <div dir="ltr">
          <OtpField
            value={code}
            onChange={(value) => {
              setCode(value)
              setError(undefined)
            }}
            onComplete={submit}
            invalid={Boolean(error)}
            disabled={pending}
            autoFocus
            aria-label="6-digit code from your email"
          />
        </div>
        <div aria-live="polite">
          {error ? (
            <p
              role="alert"
              className="mt-3 animate-in text-xs text-destructive fade-in-0 slide-in-from-top-1 motion-reduce:animate-none"
            >
              <bdi>{error}</bdi>
            </p>
          ) : null}
        </div>

        <div className="mt-3 flex min-h-10 items-center justify-center text-[13px] text-muted-foreground md:min-h-0">
          {done ? (
            <Button
              type="button"
              variant="link"
              onClick={resend}
              className="h-10 px-2 text-[13px] text-brand-text md:h-auto md:p-0"
            >
              Resend code
            </Button>
          ) : (
            <bdi>Resend code in {formatCountdown(remaining)}</bdi>
          )}
        </div>

        <OnboardingButton
          type="submit"
          className="mt-4.5"
          disabled={code.length !== CODE_LENGTH}
          loading={pending}
          loadingLabel="Switching…"
        >
          Switch to this device
        </OnboardingButton>
      </form>

      <OnboardingButton href="/sign-in" variant="outline" className="mt-2">
        Not now
      </OnboardingButton>
    </OnboardingCard>
  )
}

export { SwitchDeviceCard }
