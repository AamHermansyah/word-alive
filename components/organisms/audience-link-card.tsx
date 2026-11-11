"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"

import { AudienceQrCode } from "@/components/atoms/audience-qr-code"
import { FadeIn } from "@/components/atoms/fade-in"
import { FormField } from "@/components/molecules/form-field"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  audienceUrl,
  createAudienceCode,
  INITIAL_AUDIENCE_CODE,
} from "@/lib/console"
import { cn } from "@/lib/utils"

/** The projector screen the "Open in a new window" button shows. */
const PROJECTOR_HREF = "/present/scripture"

const BIG_BUTTON = "h-12 w-full rounded-lg text-[15px]"

/**
 * Audience link: the address of the projector screen with a Copy button, its
 * QR picture, the three set-up steps, and the two actions. "Reset link" asks
 * first, because it disconnects every open audience screen; the new code then
 * fades in.
 */
function AudienceLinkCard() {
  const [code, setCode] = React.useState(INITIAL_AUDIENCE_CODE)
  const [confirming, setConfirming] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const url = audienceUrl(code)

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied")
    } catch {
      // Clipboard blocked (insecure page, denied): select it for Ctrl+C.
      inputRef.current?.select()
      toast("Link selected. Press Ctrl+C to copy it.")
    }
  }, [url])

  const reset = React.useCallback(() => {
    setCode((current) => createAudienceCode(current))
    setConfirming(false)
    toast.success("New link ready. Open it on the projector computer.")
  }, [])

  return (
    <Card className="w-full max-w-140 gap-0 [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(9)]">
      <CardContent>
        <h1 className="text-xl font-bold md:text-[26px]">Audience screen</h1>
        <p className="mt-2 mb-5.5 text-[13px] text-muted-foreground md:text-sm">
          <bdi>Open this link on the projector computer.</bdi>
        </p>

        <FadeIn key={code}>
          <FormField label="Link" htmlFor="audience-link-url">
            <div className="flex gap-2.5">
              <Input
                ref={inputRef}
                id="audience-link-url"
                readOnly
                dir="ltr"
                value={url}
                onFocus={(event) => event.currentTarget.select()}
              />
              <Button variant="outline" onClick={copy}>
                Copy
              </Button>
            </div>
          </FormField>

          <div className="my-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="size-37.5 shrink-0 self-center rounded-lg border border-input bg-white p-3 sm:self-auto">
              <AudienceQrCode code={code} />
            </div>
            <ol className="min-w-0 list-inside list-decimal text-[13px] leading-5.5 text-muted-foreground wrap-break-word md:text-sm">
              <li>
                <bdi>Open the link in a new window on the projector.</bdi>
              </li>
              <li>
                <bdi>Press F11 for full screen.</bdi>
              </li>
              <li>
                <bdi>It updates by itself as you go live.</bdi>
              </li>
            </ol>
          </div>
        </FadeIn>

        <Button
          className={BIG_BUTTON}
          nativeButton={false}
          render={
            <Link href={PROJECTOR_HREF} target="_blank" rel="noopener" />
          }
        >
          Open in a new window
        </Button>
        <Button
          variant="outline"
          className={cn(BIG_BUTTON, "mt-2")}
          onClick={() => setConfirming(true)}
        >
          Reset link
        </Button>
        <p className="mt-2.5 text-xs text-muted-foreground">
          <bdi>Resetting the link disconnects any open audience screens.</bdi>
        </p>
      </CardContent>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Reset the audience link?</AlertDialogTitle>
            <AlertDialogDescription>
              Any open audience screen disconnects right away. You will need to
              open the new link on the projector computer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep this link</AlertDialogCancel>
            <AlertDialogAction onClick={reset}>Reset link</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export { AudienceLinkCard }
