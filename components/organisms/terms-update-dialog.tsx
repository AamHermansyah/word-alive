"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { TermsUpdate } from "@/types/account"

/**
 * The "we updated our Terms" gate. It is a dialog that cannot be dismissed
 * (no close button, Escape and an outside click do nothing): the church reads
 * the changes, ticks the box, and only then "Accept and continue" works.
 *
 * It is not modal on purpose, and sits one layer under the floating page
 * switcher (`z-40` against the switcher's `z-50`), so the switcher stays
 * usable for checking the flow. The dimmed backdrop uses the mockup's navy
 * tint instead of the default black.
 */
function TermsUpdateDialog({ terms }: { terms: TermsUpdate }) {
  const router = useRouter()
  const [accepted, setAccepted] = React.useState(false)
  const popupRef = React.useRef<HTMLDivElement>(null)

  function accept() {
    if (!accepted) return
    toast.success("Terms accepted", {
      description: "Thank you. You can keep using WordAlive.",
    })
    router.push("/live")
  }

  return (
    <Dialog open modal={false} disablePointerDismissal onOpenChange={() => undefined}>
      <DialogPortal>
        <DialogOverlay className="z-40 bg-navy/58 supports-backdrop-filter:backdrop-blur-none" />
        <DialogPrimitive.Popup
          ref={popupRef}
          initialFocus={popupRef}
          data-slot="dialog-content"
          className="fixed top-1/2 start-1/2 z-40 max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 sm:max-w-130 sm:p-8 rtl:translate-x-1/2"
        >
          <DialogTitle className="text-xl leading-tight font-bold md:text-[26px]">
            We have updated our Terms of Service
          </DialogTitle>
          <DialogDescription className="mt-2 mb-5.5 text-sm">
            Effective <bdi>{terms.effective}</bdi>
          </DialogDescription>

          <div className="mb-3 text-sm leading-6">
            What is new:
            <ul>
              {terms.changes.map((change) => (
                <li key={change} className="flex gap-1">
                  <span aria-hidden="true">•</span>
                  <span className="min-w-0 wrap-break-word">{change}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="link"
            nativeButton={false}
            render={<Link href="/terms" />}
            className="mb-4 h-10 px-0 text-[13px] text-brand-text hover:no-underline md:h-auto md:py-1"
          >
            Read the full terms
          </Button>

          <Label className="mb-4 min-h-10 items-center gap-2.5 text-[13px] leading-snug font-normal md:min-h-0">
            <Checkbox
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked === true)}
            />
            I have read and accept the updated terms.
          </Label>

          <Button
            disabled={!accepted}
            onClick={accept}
            className="h-12 w-full rounded-lg text-[15px]"
          >
            Accept and continue
          </Button>

          <p className="mt-2.5 text-center text-xs text-muted-foreground">
            You need to accept to keep using WordAlive.
          </p>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}

export { TermsUpdateDialog }
