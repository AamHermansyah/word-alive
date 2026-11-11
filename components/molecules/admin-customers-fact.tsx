import * as React from "react"

import { cn } from "@/lib/utils"

/** Detail-panel fact: small muted caption, a 14px semibold value, optional note. */
function AdminCustomersFact({
  caption,
  value,
  note,
  className,
}: {
  caption: string
  value: React.ReactNode
  note?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="text-xs text-muted-foreground">{caption}</div>
      <div className="text-sm font-semibold wrap-break-word">{value}</div>
      {note ? (
        <div className="text-xs text-muted-foreground">{note}</div>
      ) : null}
    </div>
  )
}

export { AdminCustomersFact }
