import { FadeIn } from "@/components/atoms/fade-in"
import { Button } from "@/components/ui/button"
import type { AdminSupportMessage } from "@/types/admin-customers"

/**
 * Body of the message panel: the full text, "Reply by email" (opens the
 * admin's own mail program) and "Mark as handled", which toggles the status.
 */
function AdminCustomersSupportPanel({
  message,
  onToggleHandled,
}: {
  message: AdminSupportMessage
  onToggleHandled: (message: AdminSupportMessage) => void
}) {
  const handled = message.status === "handled"
  const mailto = `mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`

  return (
    <FadeIn key={message.id} className="flex flex-col gap-3.5">
      <p
        dir="auto"
        className="rounded-lg bg-background p-3.5 text-sm leading-5.5 wrap-break-word whitespace-pre-line"
      >
        {message.body}
      </p>

      <div className="flex flex-col gap-2">
        <Button nativeButton={false} render={<a href={mailto} />}>
          Reply by email
        </Button>
        <Button variant="outline" onClick={() => onToggleHandled(message)}>
          {handled ? "Mark as new" : "Mark as handled"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        <bdi>Replies are sent from your own email program.</bdi>
      </p>
    </FadeIn>
  )
}

export { AdminCustomersSupportPanel }
