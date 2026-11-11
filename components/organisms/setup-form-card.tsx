"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"

import { OnboardingButton } from "@/components/atoms/onboarding-button"
import { FormField } from "@/components/molecules/form-field"
import { OnboardingCard } from "@/components/molecules/onboarding-card"
import { OnboardingHeading } from "@/components/molecules/onboarding-heading"
import { SelectField } from "@/components/molecules/select-field"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDelayedNavigation } from "@/hooks/use-delayed-navigation"
import { saveOnboardingProfile } from "@/hooks/use-onboarding-session"
import { AFTER_SETUP, DEMO_PROFILE } from "@/lib/data/onboarding"
import { BIBLE_VERSIONS } from "@/lib/data/plans"
import { COUNTRIES, PRESENTATION_LANGUAGES } from "@/lib/data/settings"
import { isValidEmail } from "@/lib/onboarding"
import type { OnboardingProfile } from "@/types/onboarding"

const BIBLE_VERSION_CODES = BIBLE_VERSIONS.map((version) => version.code)

type RequiredField = "name" | "email" | "city" | "terms"

const REQUIRED_FIELDS: RequiredField[] = ["name", "email", "city", "terms"]

/** What is wrong with a field, or `undefined` when it is fine. */
function getFieldError(
  field: RequiredField,
  values: OnboardingProfile,
  agreed: boolean
) {
  switch (field) {
    case "name":
      return values.name.trim()
        ? undefined
        : "Enter the name of your church, or your own name."
    case "email":
      if (!values.email.trim()) return "Enter your email address."
      return isValidEmail(values.email)
        ? undefined
        : "That email does not look right. Check it and try again."
    case "city":
      return values.city.trim() ? undefined : "Enter your city."
    case "terms":
      return agreed
        ? undefined
        : "Agree to the Terms of Service and Privacy Policy to continue."
  }
}

/** Step 1 of 2: who is using WordAlive. No password, the code comes next. */
function SetupFormCard() {
  const [values, setValues] = React.useState<OnboardingProfile>(DEMO_PROFILE)
  const [agreed, setAgreed] = React.useState(true)
  const [touched, setTouched] = React.useState<
    Partial<Record<RequiredField, boolean>>
  >({})
  const { pending, go } = useDelayedNavigation()

  const errors = Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [
      field,
      getFieldError(field, values, agreed),
    ])
  ) as Record<RequiredField, string | undefined>
  const valid = REQUIRED_FIELDS.every((field) => !errors[field])
  const shown = (field: RequiredField) =>
    touched[field] ? errors[field] : undefined

  const update = (patch: Partial<OnboardingProfile>) =>
    setValues((current) => ({ ...current, ...patch }))
  const touch = (field: RequiredField) =>
    setTouched((current) => ({ ...current, [field]: true }))

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!valid) {
      setTouched({ name: true, email: true, city: true, terms: true })
      return
    }
    if (pending) return
    const profile = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      city: values.city.trim(),
      licence: values.licence.trim(),
    }
    saveOnboardingProfile(profile)
    toast.success("Code sent", { description: profile.email })
    go(`/confirm-email?next=${AFTER_SETUP}`)
  }

  const nameError = shown("name")
  const emailError = shown("email")
  const cityError = shown("city")
  const termsError = shown("terms")

  return (
    <OnboardingCard
      width="fluid"
      padding="regular"
      align="start"
      className="md:max-w-181 xl:max-w-150"
    >
      <OnboardingHeading
        title="Set up WordAlive"
        description="Tell us who is using it. It takes a minute, and there is no password."
        size={28}
        className="mb-6"
      />

      <form noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3.5">
          <FormField label="Name of church or individual" htmlFor="setup-name">
            <Input
              id="setup-name"
              name="name"
              autoComplete="organization"
              value={values.name}
              disabled={pending}
              aria-invalid={nameError ? true : undefined}
              aria-describedby={nameError ? "setup-name-error" : undefined}
              onChange={(event) => update({ name: event.target.value })}
              onBlur={() => touch("name")}
            />
            {nameError ? (
              <FieldError id="setup-name-error" className="text-xs">
                <bdi>{nameError}</bdi>
              </FieldError>
            ) : null}
          </FormField>

          <FormField label="Email" htmlFor="setup-email">
            <Input
              id="setup-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              disabled={pending}
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? "setup-email-error" : undefined}
              onChange={(event) => update({ email: event.target.value })}
              onBlur={() => touch("email")}
            />
            {emailError ? (
              <FieldError id="setup-email-error" className="text-xs">
                <bdi>{emailError}</bdi>
              </FieldError>
            ) : null}
          </FormField>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <FormField label="City" htmlFor="setup-city">
              <Input
                id="setup-city"
                name="city"
                autoComplete="address-level2"
                value={values.city}
                disabled={pending}
                aria-invalid={cityError ? true : undefined}
                aria-describedby={cityError ? "setup-city-error" : undefined}
                onChange={(event) => update({ city: event.target.value })}
                onBlur={() => touch("city")}
              />
              {cityError ? (
                <FieldError id="setup-city-error" className="text-xs">
                  <bdi>{cityError}</bdi>
                </FieldError>
              ) : null}
            </FormField>
            <SelectField
              id="setup-country"
              label="Country"
              value={values.country}
              onValueChange={(country) => update({ country })}
              options={COUNTRIES}
            />
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <SelectField
              id="setup-language"
              label="Presentation language"
              value={values.language}
              onValueChange={(language) => update({ language })}
              options={PRESENTATION_LANGUAGES}
            />
            <SelectField
              id="setup-bible-version"
              label="Default Bible version"
              value={values.bibleVersion}
              onValueChange={(bibleVersion) => update({ bibleVersion })}
              options={BIBLE_VERSION_CODES}
            />
          </div>

          <FormField
            label="Church music licence number (optional)"
            htmlFor="setup-licence"
          >
            <Input
              id="setup-licence"
              name="licence"
              value={values.licence}
              disabled={pending}
              onChange={(event) => update({ licence: event.target.value })}
            />
          </FormField>
        </div>

        <div className="mt-4.5 flex flex-col gap-4.5">
          <div className="flex flex-col gap-1">
            <Label className="gap-2.5 text-[13px] leading-normal font-normal">
              <Checkbox
                checked={agreed}
                disabled={pending}
                aria-invalid={termsError ? true : undefined}
                aria-describedby={termsError ? "setup-terms-error" : undefined}
                onCheckedChange={(checked) => {
                  setAgreed(checked === true)
                  touch("terms")
                }}
              />
              <bdi className="min-w-0">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="underline decoration-foreground/40 underline-offset-2 hover:decoration-foreground"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline decoration-foreground/40 underline-offset-2 hover:decoration-foreground"
                >
                  Privacy Policy
                </Link>
                .
              </bdi>
            </Label>
            {termsError ? (
              <FieldError id="setup-terms-error" className="text-xs">
                <bdi>{termsError}</bdi>
              </FieldError>
            ) : null}
          </div>

          <OnboardingButton
            type="submit"
            disabled={!valid}
            loading={pending}
            loadingLabel="Sending code…"
          >
            Continue
          </OnboardingButton>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          <bdi>We will email you a 6-digit code to confirm it is you.</bdi>
        </p>
      </form>
    </OnboardingCard>
  )
}

export { SetupFormCard }
