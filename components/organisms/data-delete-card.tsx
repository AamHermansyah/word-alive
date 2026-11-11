"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { OtpField } from "@/components/molecules/otp-field"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DELETE_CONSEQUENCES } from "@/lib/data/account"
import { cn } from "@/lib/utils"

const CODE_LENGTH = 6

/**
 * Delete the church's account and data. Three things must be true before the
 * red button works: the emailed 6-digit code is complete, "I understand" is
 * ticked, and the final alert dialog is confirmed. Deleting returns to the
 * home page with a toast (there is no backend).
 */
function DataDeleteCard({
  email,
  className,
}: {
  email: string
  className?: string
}) {
  const router = useRouter()
  const [code, setCode] = React.useState("")
  const [understood, setUnderstood] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  const ready = code.length === CODE_LENGTH && understood

  function deleteData() {
    setConfirmOpen(false)
    toast("Your data was deleted", {
      description: "Your account and subscription have ended.",
    })
    router.push("/")
  }

  return (
    <Card className={cn("min-w-0 gap-0 border-destructive/30", className)}>
      <CardContent>
        <CardTitle className="mb-3 text-base font-bold">Delete my data</CardTitle>

        <ul className="mb-3 text-[13px] leading-6 md:text-sm">
          {DELETE_CONSEQUENCES.map((line) => (
            <li key={line} className="flex gap-1">
              <span aria-hidden="true">•</span>
              <span className="min-w-0 wrap-break-word">{line}</span>
            </li>
          ))}
        </ul>

        <div className="mb-2 text-[13px] text-muted-foreground wrap-break-word">
          Enter the code we sent to <bdi>{email}</bdi>
        </div>
        <OtpField
          value={code}
          onChange={setCode}
          length={CODE_LENGTH}
          aria-label={`6-digit code sent to ${email}`}
        />

        <Label className="my-4 min-h-10 gap-2.5 text-[13px] leading-snug font-normal md:min-h-0">
          <Checkbox
            checked={understood}
            onCheckedChange={(checked) => setUnderstood(checked === true)}
          />
          I understand this cannot be undone.
        </Label>

        <Button
          size="lg"
          disabled={!ready}
          onClick={() => setConfirmOpen(true)}
          className="w-full border-destructive bg-destructive hover:bg-destructive/90"
        >
          Delete my data
        </Button>
      </CardContent>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete all your data?</AlertDialogTitle>
            <AlertDialogDescription>
              Your subscription ends and your account is deleted now. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my data</AlertDialogCancel>
            <AlertDialogAction
              className="border-destructive bg-destructive hover:bg-destructive/90"
              onClick={deleteData}
            >
              Delete my data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export { DataDeleteCard }
