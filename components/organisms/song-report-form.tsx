"use client"

import * as React from "react"
import { toast } from "sonner"

import { FadeIn } from "@/components/atoms/fade-in"
import { CheckMarkIcon } from "@/components/atoms/icons"
import { FormField } from "@/components/molecules/form-field"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { REPORT_DETAILS_MIN, REPORT_REASONS } from "@/lib/data/account"
import { cn } from "@/lib/utils"
import type { ReportReasonId } from "@/types/account"

/**
 * "Report a problem" with a song: pick a reason, say what is wrong, send.
 * The details are required so a reviewer has something to check; an empty
 * submit shows the reason inline and keeps the focus on the field. A sent
 * report swaps the form for a short confirmation (there is no backend).
 */
function SongReportForm({
  songTitle,
  className,
}: {
  songTitle: string
  className?: string
}) {
  const [reason, setReason] = React.useState<ReportReasonId>("wrong-lyrics")
  const [details, setDetails] = React.useState("")
  const [attempted, setAttempted] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const detailsRef = React.useRef<HTMLTextAreaElement>(null)

  const detailsValid = details.trim().length >= REPORT_DETAILS_MIN
  const showError = attempted && !detailsValid

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    if (!detailsValid) {
      detailsRef.current?.focus()
      return
    }
    setSent(true)
    toast.success("Report sent", {
      description: "Thank you. We will check this song.",
    })
  }

  function reset() {
    setReason("wrong-lyrics")
    setDetails("")
    setAttempted(false)
    setSent(false)
  }

  if (sent) {
    return (
      <FadeIn
        key="sent"
        role="status"
        className={cn("flex flex-col items-start gap-2", className)}
      >
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-soft text-success-soft-foreground">
            <CheckMarkIcon className="size-4" />
          </span>
          Thanks, your report was sent
        </div>
        <p className="text-[13px] text-muted-foreground wrap-break-word">
          We will check <bdi>{songTitle}</bdi> and email you if we need more
          details.
        </p>
        <Button
          variant="link"
          className="h-auto px-0 py-2 text-[13px] text-brand-text hover:no-underline"
          onClick={reset}
        >
          Report another problem
        </Button>
      </FadeIn>
    )
  }

  return (
    <div className={className}>
      <form noValidate onSubmit={handleSubmit}>
        <h3 className="mb-2 text-sm font-bold">Report a problem</h3>

        <RadioGroup
          aria-label="Reason for the report"
          value={reason}
          onValueChange={(value) => setReason(value as ReportReasonId)}
          className="gap-0"
        >
          {REPORT_REASONS.map((option) => (
            <Label
              key={option.id}
              className="min-h-10 gap-2 text-[13px] leading-snug font-normal md:min-h-7"
            >
              <RadioGroupItem value={option.id} />
              <span className="min-w-0 wrap-break-word">{option.label}</span>
            </Label>
          ))}
        </RadioGroup>

        <FormField label="Details" htmlFor="report-details" className="mt-2">
          <Textarea
            ref={detailsRef}
            id="report-details"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            aria-invalid={showError || undefined}
            aria-describedby={showError ? "report-details-error" : undefined}
            className="py-2"
          />
        </FormField>
        {showError ? (
          <FadeIn
            id="report-details-error"
            role="alert"
            className="mt-1 text-xs text-destructive"
          >
            Tell us what is wrong so we can check it.
          </FadeIn>
        ) : null}

        <Button type="submit" variant="outline" className="mt-2.5">
          Send report
        </Button>
      </form>
    </div>
  )
}

export { SongReportForm }
