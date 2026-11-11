"use client"

import * as React from "react"
import { toast } from "sonner"

import { AdminCustomersTextAction } from "@/components/molecules/admin-customers-text-action"
import { FormField } from "@/components/molecules/form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useDelayedNavigation } from "@/hooks/use-delayed-navigation"
import { ADMIN_DEMO_LOGIN } from "@/lib/data/admin-customers"
import {
  formatAuthenticatorCode,
  isCompleteAuthenticatorCode,
  isValidEmail,
} from "@/lib/admin-customers-validation"

/**
 * Admin sign-in: email, password and the 6-digit authenticator code. The
 * fields start with the mockup's demo values; every field is checked on
 * submit (and again as it is edited) and the first wrong one gets focus.
 */
function AdminCustomersLoginCard() {
  const [email, setEmail] = React.useState(ADMIN_DEMO_LOGIN.email)
  const [password, setPassword] = React.useState(ADMIN_DEMO_LOGIN.password)
  const [code, setCode] = React.useState(ADMIN_DEMO_LOGIN.code)
  const [submitted, setSubmitted] = React.useState(false)
  const { pending, go } = useDelayedNavigation()
  const formRef = React.useRef<HTMLFormElement>(null)

  const errors = {
    email: !email.trim()
      ? "Enter your admin email."
      : !isValidEmail(email)
        ? "That email does not look right."
        : undefined,
    password:
      password.length < 8
        ? "Enter your password (at least 8 characters)."
        : undefined,
    code: !isCompleteAuthenticatorCode(code)
      ? "Enter the 6-digit code from your authenticator app."
      : undefined,
  }
  const show = (field: keyof typeof errors) =>
    submitted ? errors[field] : undefined

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    if (pending) return
    if (errors.email || errors.password || errors.code) {
      const first = errors.email
        ? "email"
        : errors.password
          ? "password"
          : "code"
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${first}"]`)
        ?.focus()
      return
    }
    toast.success("Signed in", {
      description: "Welcome back to the admin console.",
    })
    go("/admin")
  }

  return (
    <Card className="w-full max-w-100 gap-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(9)]">
      <CardContent>
        <h1 className="text-xl font-bold md:text-2xl">
          <bdi>Sign in</bdi>
        </h1>
        <p className="mt-1.5 mb-5.5 text-sm text-muted-foreground">
          <bdi>Admin access only. Two-step verification is required.</bdi>
        </p>

        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-3.5"
        >
          <FormField label="Email" htmlFor="admin-login-email">
            <Input
              id="admin-login-email"
              name="email"
              type="email"
              dir="ltr"
              inputMode="email"
              autoComplete="username"
              value={email}
              disabled={pending}
              aria-invalid={show("email") ? true : undefined}
              aria-describedby={
                show("email") ? "admin-login-email-error" : undefined
              }
              onChange={(event) => setEmail(event.target.value)}
            />
            {show("email") ? (
              <FieldError id="admin-login-email-error" className="text-xs">
                {show("email")}
              </FieldError>
            ) : null}
          </FormField>

          <FormField label="Password" htmlFor="admin-login-password">
            <Input
              id="admin-login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              disabled={pending}
              aria-invalid={show("password") ? true : undefined}
              aria-describedby={
                show("password") ? "admin-login-password-error" : undefined
              }
              onChange={(event) => setPassword(event.target.value)}
            />
            {show("password") ? (
              <FieldError id="admin-login-password-error" className="text-xs">
                {show("password")}
              </FieldError>
            ) : null}
          </FormField>

          <FormField label="Authenticator code" htmlFor="admin-login-code">
            <Input
              id="admin-login-code"
              name="code"
              type="text"
              dir="ltr"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              disabled={pending}
              aria-invalid={show("code") ? true : undefined}
              aria-describedby={
                show("code") ? "admin-login-code-error" : undefined
              }
              onChange={(event) =>
                setCode(formatAuthenticatorCode(event.target.value))
              }
            />
            {show("code") ? (
              <FieldError id="admin-login-code-error" className="text-xs">
                {show("code")}
              </FieldError>
            ) : null}
          </FormField>

          <Button
            type="submit"
            disabled={pending}
            className="mt-2 h-12 text-[15px]"
          >
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="mt-3.5 text-center">
          <AdminCustomersTextAction href="/admin/setup-2fa">
            Lost your authenticator?
          </AdminCustomersTextAction>
        </div>
      </CardContent>
    </Card>
  )
}

export { AdminCustomersLoginCard }
