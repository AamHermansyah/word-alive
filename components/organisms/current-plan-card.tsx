"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"

import { AccountDetailRow } from "@/components/molecules/account-detail-row"
import { Badge } from "@/components/ui/badge"
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
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { formatUsd } from "@/lib/data/account"
import { cn } from "@/lib/utils"
import type { BillingSummary } from "@/types/account"

/**
 * The plan the church pays for: price, next renewal, payment method, and the
 * two things to do with it. "Cancel" asks first (alert dialog) and then marks
 * the plan as ending, the church keeps access until the renewal date;
 * "Resume plan" undoes that. "Change plan" goes to the plan picker.
 */
function CurrentPlanCard({
  billing,
  className,
}: {
  billing: BillingSummary
  className?: string
}) {
  const [ending, setEnding] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  function confirmCancel() {
    setEnding(true)
    setConfirmOpen(false)
    toast("Cancellation scheduled", {
      description: `You keep access until ${billing.renewsOn}.`,
    })
  }

  function resume() {
    setEnding(false)
    toast.success("Plan resumed", {
      description: `It renews on ${billing.renewsOn}.`,
    })
  }

  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <CardTitle className="text-base font-bold">Current plan</CardTitle>
          <Badge variant={ending ? "warning" : "success"}>
            {ending ? "Ending" : "Active"}
          </Badge>
        </div>

        <div className="mt-2.5 mb-0.5 text-2xl font-bold wrap-break-word md:text-[28px]">
          {billing.planName}
        </div>
        <div className="text-xs text-muted-foreground">
          <bdi>{formatUsd(billing.monthlyPrice)}</bdi> per month
        </div>

        <dl className="my-4 border-t border-border pt-2.5">
          <AccountDetailRow label={ending ? "Access until" : "Next renewal"}>
            <bdi>{billing.renewsOn}</bdi>
          </AccountDetailRow>
          <AccountDetailRow label="Payment method">
            {billing.paymentMethod}
          </AccountDetailRow>
          <AccountDetailRow label="Renewal">
            <Badge variant={ending ? "neutral" : "success"} className="leading-7.5">
              {ending ? "Off" : "Automatic"}
            </Badge>
          </AccountDetailRow>
        </dl>

        <div className="grid gap-2.5 sm:grid-cols-2">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/usage" />}
            className="h-auto min-h-10 whitespace-normal"
          >
            Change plan
          </Button>
          {ending ? (
            <Button
              variant="outline"
              onClick={resume}
              className="h-auto min-h-10 whitespace-normal"
            >
              Resume plan
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(true)}
              className="h-auto min-h-10 whitespace-normal text-destructive hover:text-destructive"
            >
              Cancel
            </Button>
          )}
        </div>

        <p
          role="status"
          className="mt-3 text-[13px] text-muted-foreground"
        >
          {ending
            ? "Your plan will not renew. You keep access until "
            : "If you cancel, you keep access until "}
          <bdi className="wrap-break-word">{billing.renewsOn}</bdi>.
        </p>
      </CardContent>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancel your {billing.planName} plan?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You keep access until <bdi>{billing.renewsOn}</bdi>. After that
              your plan will not renew and you will not be charged again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my plan</AlertDialogCancel>
            <AlertDialogAction
              className="border-destructive bg-destructive hover:bg-destructive/90"
              onClick={confirmCancel}
            >
              Cancel plan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export { CurrentPlanCard }
