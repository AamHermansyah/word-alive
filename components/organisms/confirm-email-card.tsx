"use client"

import * as React from "react"
import Link from "next/link"
import { MailIcon } from "lucide-react"
import { toast } from "sonner"

import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { OnboardingStatusIcon } from "@/components/atoms/onboarding-status-icon"
import { OnboardingCard } from "@/components/molecules/onboarding-card"
import { OnboardingHeading } from "@/components/molecules/onboarding-heading"
import { OtpField } from "@/components/molecules/otp-field"
import { Button } from "@/components/ui/button"
import { useCountdown } from "@/hooks/use-countdown"
import { useDelayedNavigation } from "@/hooks/use-delayed-navigation"
import { useOnboardingProfile } from "@/hooks/use-onboarding-session"
import { REJECTED_CODE, RESEND_SECONDS } from "@/lib/data/onboarding"
import { formatCountdown } from "@/lib/onboarding"

const CODE_LENGTH = 6

/**
 * Step 2 of 2: the 6-digit email code. The sixth digit submits by itself;
 * the button does the same for people who prefer to press it. Any code works
 * except 000000, which shows the "wrong code" state.
 */
function ConfirmEmailCard({ next }: { next: string }) {
  const { email } = useOnboardingProfile()
  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState<string>()
  const { pending, go } = useDelayedNavigation()
  const { remaining, done, restart } = useCountdown(RESEND_SECONDS)

  function verify(value: string) {
    if (value.length !== CODE_LENGTH || pending) return
    if (value === REJECTED_CODE) {
      setError(
        "That code does not match. Check your email or ask for a new one."
      )
      return
    }
    setError(undefined)
    go(next)
  }

  function resend() {
    restart()
    setCode("")
    setError(undefined)
    toast.success("Code sent", { description: email })
  }

  return (
    <OnboardingCard
      width="sm"
      padding="roomy"
      className="md:max-w-140 xl:max-w-120"
    >
      <OnboardingStatusIcon tone="brand" className="mb-4.5">
        <MailIcon />
      </OnboardingStatusIcon>

      <OnboardingHeading
        title="Check your email"
        size={28}
        description={
          <>
            We sent a 6-digit code to
            <br />
            <bdi className="font-semibold wrap-break-word text-foreground">
              {email}
            </bdi>
          </>
        }
        className="mb-6.5"
        descriptionClassName="mt-2"
      />

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          verify(code)
        }}
      >
        {/* A code reads left to right in any language. */}
        <div dir="ltr">
          <OtpField
            value={code}
            onChange={(value) => {
              setCode(value)
              setError(undefined)
            }}
            onComplete={verify}
            invalid={Boolean(error)}
            disabled={pending}
            autoFocus
            aria-label="6-digit code from your email"
          />
        </div>
        <div aria-live="polite" className="min-h-0">
          {error ? (
            <p
              role="alert"
              className="mt-3 animate-in text-xs text-destructive fade-in-0 slide-in-from-top-1 motion-reduce:animate-none"
            >
              <bdi>{error}</bdi>
            </p>
          ) : null}
        </div>

        <OnboardingButton
          type="submit"
          className="mt-6.5"
          disabled={code.length !== CODE_LENGTH}
          loading={pending}
          loadingLabel="Verifying…"
        >
          Verify and continue
        </OnboardingButton>
      </form>

      <div className="mt-2 flex min-h-10 items-center justify-center text-[13px] text-muted-foreground md:mt-4 md:min-h-0">
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

      <Link
        href="/setup"
        className="mx-auto inline-flex min-h-10 items-center text-[13px] font-semibold text-brand-text hover:underline md:mt-2 md:min-h-0"
      >
        <bdi>Use a different email</bdi>
      </Link>

      <p className="mt-4.5 border-t border-border pt-3.5 text-xs text-muted-foreground">
        <bdi>
          This is a one-time step on this device. After it, WordAlive opens
          straight to the live console.
        </bdi>
      </p>
    </OnboardingCard>
  )
}

export { ConfirmEmailCard }
