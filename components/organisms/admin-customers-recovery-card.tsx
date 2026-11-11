"use client"

import * as React from "react"
import { toast } from "sonner"

import { FormField } from "@/components/molecules/form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useDelayedNavigation } from "@/hooks/use-delayed-navigation"
import {
  formatRecoveryCode,
  isCompleteRecoveryCode,
  isValidEmail,
} from "@/lib/admin-customers-validation"
import { ADMIN_DEMO_LOGIN } from "@/lib/data/admin-customers"

/** "Lost your authenticator?": sign in with one of the one-time recovery codes. */
function AdminCustomersRecoveryCard() {
  const [email, setEmail] = React.useState(ADMIN_DEMO_LOGIN.email)
  const [code, setCode] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const { pending, go } = useDelayedNavigation()

  const emailError = !email.trim()
    ? "Enter your admin email."
    : !isValidEmail(email)
      ? "That email does not look right."
      : undefined
  const codeError = !isCompleteRecoveryCode(code)
    ? "Enter one of your 8-character recovery codes, like A7K2-9QX4."
    : undefined

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    if (pending || emailError || codeError) return
    toast.success("Signed in with a recovery code", {
      description:
        "That code is used up. Set up your authenticator again soon.",
    })
    go("/admin")
  }

  return (
    <Card className="w-full max-w-100 gap-0 [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(8)]">
      <CardContent>
        <form noValidate onSubmit={handleSubmit}>
          <h2 className="mb-1 text-lg font-bold md:text-xl">
            <bdi>Lost your authenticator?</bdi>
          </h2>
          <p className="mb-4 text-[13px] text-muted-foreground md:text-sm">
            <bdi>Sign in with one of your recovery codes.</bdi>
          </p>

          <div className="flex flex-col gap-3">
            <FormField label="Email" htmlFor="admin-recovery-email">
              <Input
                id="admin-recovery-email"
                name="email"
                type="email"
                dir="ltr"
                inputMode="email"
                autoComplete="username"
                value={email}
                disabled={pending}
                aria-invalid={submitted && emailError ? true : undefined}
                aria-describedby={
                  submitted && emailError
                    ? "admin-recovery-email-error"
                    : undefined
                }
                onChange={(event) => setEmail(event.target.value)}
              />
              {submitted && emailError ? (
                <FieldError id="admin-recovery-email-error" className="text-xs">
                  {emailError}
                </FieldError>
              ) : null}
            </FormField>

            <FormField label="Recovery code" htmlFor="admin-recovery-code">
              <Input
                id="admin-recovery-code"
                name="code"
                type="text"
                dir="ltr"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                value={code}
                disabled={pending}
                aria-invalid={submitted && codeError ? true : undefined}
                aria-describedby={
                  submitted && codeError
                    ? "admin-recovery-code-error"
                    : undefined
                }
                onChange={(event) =>
                  setCode(formatRecoveryCode(event.target.value))
                }
                className="font-mono"
              />
              {submitted && codeError ? (
                <FieldError id="admin-recovery-code-error" className="text-xs">
                  {codeError}
                </FieldError>
              ) : null}
            </FormField>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="mt-4.5 h-11.5 w-full"
          >
            {pending ? "Signing in…" : "Sign in with a recovery code"}
          </Button>
        </form>

        <p className="mt-3.5 text-[13px] leading-5 text-muted-foreground">
          <bdi>
            No codes left? Ask a Super Admin to reset your authenticator.
          </bdi>
        </p>
      </CardContent>
    </Card>
  )
}

export { AdminCustomersRecoveryCard }
