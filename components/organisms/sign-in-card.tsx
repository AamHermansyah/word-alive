"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"

import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { FormField } from "@/components/molecules/form-field"
import { OnboardingCard } from "@/components/molecules/onboarding-card"
import { OnboardingHeading } from "@/components/molecules/onboarding-heading"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useDelayedNavigation } from "@/hooks/use-delayed-navigation"
import { saveOnboardingProfile } from "@/hooks/use-onboarding-session"
import { AFTER_SIGN_IN, DEMO_PROFILE } from "@/lib/data/onboarding"
import { isValidEmail } from "@/lib/onboarding"

/** Sign in: one email field, then a 6-digit code on the next page. */
function SignInCard() {
  const [email, setEmail] = React.useState(DEMO_PROFILE.email)
  const [touched, setTouched] = React.useState(false)
  const { pending, go } = useDelayedNavigation()

  const valid = isValidEmail(email)
  const error = touched
    ? !email.trim()
      ? "Enter your email address."
      : !valid
        ? "That email does not look right. Check it and try again."
        : undefined
    : undefined

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTouched(true)
    if (!valid || pending) return
    const address = email.trim()
    saveOnboardingProfile({ email: address })
    toast.success("Code sent", { description: address })
    go(`/confirm-email?next=${AFTER_SIGN_IN}`)
  }

  return (
    <OnboardingCard width="sm" padding="roomy">
      <OnboardingHeading
        title="Welcome back"
        description="Enter the email you used for WordAlive. We will send you a code."
        className="mb-5.5"
        descriptionClassName="mt-2"
      />

      <form noValidate onSubmit={handleSubmit} className="text-start">
        <FormField label="Email" htmlFor="sign-in-email">
          <Input
            id="sign-in-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            disabled={pending}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "sign-in-email-error" : undefined}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched(true)}
          />
          {error ? (
            <FieldError id="sign-in-email-error" className="text-xs">
              <bdi>{error}</bdi>
            </FieldError>
          ) : null}
        </FormField>

        <OnboardingButton
          type="submit"
          className="mt-4.5"
          disabled={!valid}
          loading={pending}
          loadingLabel="Sending code…"
        >
          Send code
        </OnboardingButton>
      </form>

      <p className="mt-4 text-[13px]">
        <span className="text-muted-foreground">
          <bdi>New here?</bdi>{" "}
        </span>
        <Link
          href="/setup"
          className="font-semibold text-brand-text hover:underline"
        >
          <bdi>Start your free trial</bdi>
        </Link>
      </p>

      <p className="mt-4 border-t border-border pt-3.5 text-start text-[13px] text-muted-foreground">
        <bdi>
          On a new device? After the code you can switch your subscription to
          this device.
        </bdi>
      </p>
    </OnboardingCard>
  )
}

export { SignInCard }
