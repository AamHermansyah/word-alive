"use client"

import * as React from "react"
import { CopyIcon, DownloadIcon } from "lucide-react"
import { toast } from "sonner"

import { AdminCustomersQrCode } from "@/components/atoms/admin-customers-qr-code"
import { FormField } from "@/components/molecules/form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useDelayedNavigation } from "@/hooks/use-delayed-navigation"
import { downloadFile } from "@/lib/admin-customers-download"
import {
  formatAuthenticatorCode,
  isCompleteAuthenticatorCode,
} from "@/lib/admin-customers-validation"
import { ADMIN_RECOVERY_CODES } from "@/lib/data/admin-customers"

/**
 * Authenticator set-up: the QR code to scan, the 6-digit confirmation code,
 * the one-time recovery codes (copy or download them) and "Confirm and
 * continue", which checks the code and opens the console.
 */
function AdminCustomersAuthenticatorSetupCard() {
  const [code, setCode] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const { pending, go } = useDelayedNavigation()

  const error =
    submitted && !isCompleteAuthenticatorCode(code)
      ? "Enter the 6-digit code shown in your authenticator app."
      : undefined

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    if (pending || !isCompleteAuthenticatorCode(code)) return
    toast.success("Authenticator confirmed", {
      description: "Two-step verification is on for your account.",
    })
    go("/admin")
  }

  async function copyCodes() {
    try {
      await navigator.clipboard.writeText(ADMIN_RECOVERY_CODES.join("\n"))
      toast.success("Recovery codes copied", {
        description: "Paste them somewhere safe. Each code works once.",
      })
    } catch {
      toast.error("Could not copy the codes", {
        description: "Select them and copy by hand, or download the file.",
      })
    }
  }

  function downloadCodes() {
    downloadFile(
      "wordalive-recovery-codes.txt",
      `WordAlive admin recovery codes\nEach code works once.\n\n${ADMIN_RECOVERY_CODES.join("\n")}\n`,
      "text/plain;charset=utf-8"
    )
    toast.success("Recovery codes downloaded", {
      description: "Keep the file somewhere only you can open it.",
    })
  }

  return (
    <Card className="w-full max-w-125 gap-0 [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(8)]">
      <CardContent>
        <form noValidate onSubmit={handleSubmit}>
          <h1 className="mb-1 text-lg font-bold md:text-xl">
            <bdi>Set up your authenticator</bdi>
          </h1>
          <p className="mb-4 text-[13px] text-muted-foreground md:text-sm">
            <bdi>
              Scan the code with your authenticator app, then enter the 6-digit
              code.
            </bdi>
          </p>

          <AdminCustomersQrCode className="mx-auto mb-4 size-37.5 border border-input" />

          <FormField label="6-digit code" htmlFor="admin-setup-code">
            <Input
              id="admin-setup-code"
              name="code"
              type="text"
              dir="ltr"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              disabled={pending}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "admin-setup-code-error" : undefined}
              onChange={(event) =>
                setCode(formatAuthenticatorCode(event.target.value))
              }
            />
            {error ? (
              <FieldError id="admin-setup-code-error" className="text-xs">
                {error}
              </FieldError>
            ) : null}
          </FormField>

          <h2 className="mt-4 mb-2 text-sm font-bold">
            <bdi>Save your recovery codes</bdi>
          </h2>
          <p className="mb-1.5 text-[13px] text-muted-foreground">
            <bdi>Each code works once. You will not see them again.</bdi>
          </p>
          <ul className="grid grid-cols-2 gap-x-5 rounded-lg bg-background px-3.5 py-2">
            {ADMIN_RECOVERY_CODES.map((recoveryCode) => (
              <li
                key={recoveryCode}
                className="py-1.5 font-mono text-sm font-semibold"
              >
                <bdi>{recoveryCode}</bdi>
              </li>
            ))}
          </ul>

          <div className="mt-2.5 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyCodes}
            >
              <CopyIcon data-icon="inline-start" />
              Copy codes
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={downloadCodes}
            >
              <DownloadIcon data-icon="inline-start" />
              Download
            </Button>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="mt-4 h-11.5 w-full"
          >
            {pending ? "Confirming…" : "Confirm and continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export { AdminCustomersAuthenticatorSetupCard }
