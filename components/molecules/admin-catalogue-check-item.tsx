import * as React from "react"
import { ClockIcon, TriangleAlertIcon } from "lucide-react"

import { CheckMarkIcon } from "@/components/atoms/icons"
import { cn } from "@/lib/utils"

export type AdminCheckState = "done" | "pending" | "warning"

const ICON_CLASS: Record<AdminCheckState, string> = {
  done: "text-success",
  pending: "text-muted-foreground",
  warning: "text-chart-4",
}

/**
 * One line of an admin checklist: a status icon and a sentence
 * ("Licence recorded", "Ownership not yet verified").
 * With `onClick` the whole line is a button that flips the state.
 */
function AdminCatalogueCheckItem({
  state,
  children,
  onClick,
  pressed,
  className,
}: {
  state: AdminCheckState
  children: React.ReactNode
  onClick?: () => void
  /** For a clickable line: whether the check is currently ticked. */
  pressed?: boolean
  className?: string
}) {
  const Icon =
    state === "done"
      ? CheckMarkIcon
      : state === "pending"
        ? ClockIcon
        : TriangleAlertIcon

  const content = (
    <>
      <Icon
        aria-hidden="true"
        className={cn("size-4 shrink-0", ICON_CLASS[state])}
      />
      <span className="min-w-0 wrap-break-word">{children}</span>
    </>
  )

  const base = "flex w-full items-center gap-2 py-1 text-start text-[13px]"

  if (onClick) {
    return (
      <li className="list-none">
        <button
          type="button"
          aria-pressed={pressed}
          onClick={onClick}
          className={cn(
            base,
            "rounded-md outline-none hover:text-brand-text focus-visible:ring-[3px] focus-visible:ring-ring/50",
            className
          )}
        >
          {content}
        </button>
      </li>
    )
  }

  return <li className={cn(base, className)}>{content}</li>
}

export { AdminCatalogueCheckItem }
