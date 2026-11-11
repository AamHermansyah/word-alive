"use client"

import * as React from "react"

import { FadeIn } from "@/components/atoms/fade-in"
import { AdminCatalogueCheckItem } from "@/components/molecules/admin-catalogue-check-item"
import { FormField } from "@/components/molecules/form-field"
import { AdminTakedownStatusBadge } from "@/components/organisms/admin-takedown-list-card"
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
import { Textarea } from "@/components/ui/textarea"
import type { TakedownRequest } from "@/types/admin-catalogue"

type Decision = "remove" | "reject"

/**
 * The selected takedown request: what was asked, the two checks (requester
 * contacted, ownership verified; each can be ticked off), a note for the audit
 * log and the two decisions. Both decisions ask for confirmation first.
 *
 * Give it `key={request.id}` so the note starts empty for every request.
 */
function AdminTakedownDetailCard({
  request,
  onToggleContacted,
  onToggleOwnership,
  onRemove,
  onReject,
  className,
  ref,
}: {
  request: TakedownRequest | undefined
  onToggleContacted: (request: TakedownRequest) => void
  onToggleOwnership: (request: TakedownRequest) => void
  onRemove: (request: TakedownRequest, note: string) => void
  onReject: (request: TakedownRequest, note: string) => void
  className?: string
  ref?: React.Ref<HTMLDivElement>
}) {
  const [note, setNote] = React.useState(request?.note ?? "")
  const [decision, setDecision] = React.useState<Decision | null>(null)

  if (!request) {
    return (
      <Card ref={ref} className={className}>
        <CardContent>
          <h2 className="text-sm font-bold md:text-[15px]">
            No request selected
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">
            <bdi>Pick a takedown request to see what was asked.</bdi>
          </p>
        </CardContent>
      </Card>
    )
  }

  const open = request.status === "open"

  return (
    <Card ref={ref} className={className}>
      <CardContent>
        <FadeIn key={`${request.id}-${request.status}`}>
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <h2 className="min-w-0 text-sm font-bold wrap-break-word md:text-[15px]">
              <bdi>{request.songTitle}</bdi>
            </h2>
            {open ? null : <AdminTakedownStatusBadge status={request.status} />}
          </div>
          <p className="mt-1.5 mb-3 text-xs text-muted-foreground">
            <bdi>{request.meta}</bdi>
          </p>

          <p className="mb-3 rounded-xl bg-background p-3 text-[13px] leading-5 wrap-break-word">
            <bdi>{request.message}</bdi>
          </p>

          <ul className="mb-3">
            <AdminCatalogueCheckItem
              state={request.contacted ? "done" : "pending"}
              pressed={request.contacted}
              onClick={open ? () => onToggleContacted(request) : undefined}
              className="py-0.75"
            >
              {request.contacted
                ? "Requester contacted"
                : "Requester not contacted yet"}
            </AdminCatalogueCheckItem>
            <AdminCatalogueCheckItem
              state={request.ownershipVerified ? "done" : "pending"}
              pressed={request.ownershipVerified}
              onClick={open ? () => onToggleOwnership(request) : undefined}
              className="py-0.75"
            >
              {request.ownershipVerified
                ? "Ownership verified"
                : "Ownership not yet verified"}
            </AdminCatalogueCheckItem>
          </ul>

          <FormField
            label="Notes (saved to the audit log)"
            htmlFor={`takedown-note-${request.id}`}
          >
            <Textarea
              id={`takedown-note-${request.id}`}
              value={open ? note : request.note}
              readOnly={!open}
              onChange={(event) => setNote(event.target.value)}
            />
          </FormField>

          {open ? (
            <div className="mt-3 flex gap-2">
              <Button
                className="flex-1 px-2 whitespace-normal"
                onClick={() => setDecision("remove")}
              >
                Remove song
              </Button>
              <Button
                variant="outline"
                className="flex-1 px-2 whitespace-normal"
                onClick={() => setDecision("reject")}
              >
                Reject
              </Button>
            </div>
          ) : (
            <p role="status" className="mt-3 text-[13px] text-muted-foreground">
              <bdi>
                {request.status === "removed"
                  ? "The song was removed and the requester was told."
                  : "The request was rejected and the song stays in the library."}
              </bdi>
            </p>
          )}
        </FadeIn>
      </CardContent>

      <AlertDialog
        open={decision !== null}
        onOpenChange={(next) => {
          if (!next) setDecision(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {decision === "remove"
                ? `Remove “${request.songTitle}” from the library?`
                : "Reject this takedown request?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <bdi>
                {decision === "remove"
                  ? `The song is hidden from every church and ${request.requester} is told it was removed.${
                      request.ownershipVerified
                        ? ""
                        : " Ownership has not been verified yet."
                    } Your note is saved to the audit log.`
                  : "The song stays in the library and the requester is told why. Your note is saved to the audit log."}
              </bdi>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={decision === "remove" ? "default" : "outline"}
              onClick={() => {
                const chosen = decision
                setDecision(null)
                if (chosen === "remove") onRemove(request, note)
                if (chosen === "reject") onReject(request, note)
              }}
            >
              {decision === "remove" ? "Remove song" : "Reject request"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export { AdminTakedownDetailCard }
