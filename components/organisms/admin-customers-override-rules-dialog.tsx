"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ADMIN_OVERRIDE_RULES } from "@/lib/data/admin-customers"

/** The rules behind the payment override, opened from "View override rules". */
function AdminCustomersOverrideRulesDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-5 rounded-xl p-5 sm:max-w-120 sm:p-7"
      >
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-lg leading-snug font-bold md:text-xl">
            <bdi>Payment override rules</bdi>
          </DialogTitle>
          <DialogDescription>
            <bdi>
              An override is the only way to count a payment Paystack has not
              confirmed.
            </bdi>
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col gap-2.5 text-[13px] leading-5">
          {ADMIN_OVERRIDE_RULES.map((rule, index) => (
            <li key={rule} className="flex gap-2.5">
              <span
                aria-hidden="true"
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold"
              >
                {index + 1}
              </span>
              <span className="min-w-0 wrap-break-word">{rule}</span>
            </li>
          ))}
        </ul>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/audit" />}
          >
            Open audit log
          </Button>
          <DialogClose render={<Button />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AdminCustomersOverrideRulesDialog }
