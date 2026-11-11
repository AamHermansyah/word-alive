"use client"

import * as React from "react"
import { toast } from "sonner"

import { FadeIn } from "@/components/atoms/fade-in"
import { CheckMarkIcon } from "@/components/atoms/icons"
import { AccountRowAction } from "@/components/molecules/account-row-action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { DataExport } from "@/types/account"

/**
 * Ask for a copy of the church's data. A request shows what happens next
 * (the link is emailed) and the button rests until the file arrives; the
 * last finished export can be downloaded while its link is valid.
 */
function DataExportCard({
  email,
  lastExport,
  className,
}: {
  email: string
  lastExport: DataExport
  className?: string
}) {
  const [requested, setRequested] = React.useState(false)

  function requestExport() {
    setRequested(true)
    toast.success("Export requested", {
      description: `We will email a link to ${email}.`,
    })
  }

  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent>
        <CardTitle className="mb-3 text-base font-bold">Export my data</CardTitle>
        <p className="mb-3.5 text-[13px] leading-[1.6] text-muted-foreground md:text-sm md:leading-[22px]">
          We will email you a link to a file with your account details, songs
          and service history.
        </p>

        <Button
          variant="outline"
          disabled={requested}
          onClick={requestExport}
          className="w-full whitespace-normal sm:w-auto"
        >
          {requested ? (
            <>
              <CheckMarkIcon />
              Export requested
            </>
          ) : (
            "Request export"
          )}
        </Button>

        {requested ? (
          <FadeIn
            role="status"
            className="mt-2.5 text-xs text-muted-foreground wrap-break-word"
          >
            We are preparing your file. The link will be sent to{" "}
            <bdi className="font-semibold text-foreground">{email}</bdi>.
          </FadeIn>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border pt-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold">Last export ready</div>
            <div className="text-xs text-muted-foreground">
              {lastExport.expiry}
            </div>
          </div>
          <AccountRowAction
            onClick={() =>
              toast.success("Download started", {
                description: "Your data export is on its way to your device.",
              })
            }
            label="Download last export"
          >
            Download
          </AccountRowAction>
        </div>
      </CardContent>
    </Card>
  )
}

export { DataExportCard }
