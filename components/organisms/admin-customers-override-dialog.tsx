"use client"

import * as React from "react"

import { FormField } from "@/components/molecules/form-field"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { AdminPayment } from "@/types/admin-customers"

/**
 * "Mark payment as verified". A destructive action, so the confirm button
 * stays disabled until the admin has written a reason and ticked that they
 * checked the payment in the Paystack dashboard. The form lives inside the
 * dialog content, so it starts empty every time the dialog opens.
 */
function AdminCustomersOverrideDialog({
  payment,
  open,
  onCancel,
  onConfirm,
}: {
  payment: AdminPayment | undefined
  open: boolean
  onCancel: () => void
  onConfirm: (payment: AdminPayment) => void
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onCancel()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="gap-0 rounded-xl p-5 sm:max-w-120 sm:p-7"
      >
        {payment ? (
          <OverrideForm
            payment={payment}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function OverrideForm({
  payment,
  onCancel,
  onConfirm,
}: {
  payment: AdminPayment
  onCancel: () => void
  onConfirm: (payment: AdminPayment) => void
}) {
  const [reason, setReason] = React.useState("")
  const [checked, setChecked] = React.useState(false)
  const canConfirm = reason.trim() !== "" && checked

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (canConfirm) onConfirm(payment)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle className="text-lg leading-snug font-bold md:text-xl">
        <bdi>Mark payment as verified</bdi>
      </DialogTitle>
      <DialogDescription className="mt-3 mb-4 rounded-lg bg-destructive/10 p-3 text-[13px] leading-5 text-destructive">
        <bdi>
          Paystack has not confirmed this payment. Only continue if you have
          checked it yourself.
        </bdi>
      </DialogDescription>

      <dl className="mb-3 text-sm leading-7">
        <OverrideFact term="Reference" value={payment.reference} />
        <OverrideFact term="Customer" value={payment.customer} />
        <OverrideFact term="Amount" value={payment.amount} />
      </dl>

      <FormField label="Reason (required)" htmlFor="override-reason">
        <Textarea
          id="override-reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          aria-required="true"
          className="min-h-18.5 py-2"
        />
      </FormField>

      <Label className="my-3 items-start gap-2.5 text-[13px] leading-snug font-normal">
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
          className="mt-0.5"
        />
        <bdi>I checked this payment in the Paystack dashboard.</bdi>
      </Label>

      <div className="flex flex-col-reverse gap-2.5 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="sm:flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!canConfirm}
          className="border-destructive bg-destructive text-background hover:bg-destructive/90 sm:flex-1"
        >
          Mark as verified
        </Button>
      </div>
      <p className="mt-2.5 text-xs text-muted-foreground">
        <bdi>This action is recorded in the audit log.</bdi>
      </p>
    </form>
  )
}

function OverrideFact({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{term}</dt>
      <dd className="min-w-0 text-end font-bold wrap-break-word">
        <bdi>{value}</bdi>
      </dd>
    </div>
  )
}

export { AdminCustomersOverrideDialog }
