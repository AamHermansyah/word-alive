import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A "Label ........ value" line of a details box (song meta, current plan).
 * Wrap rows in a `<dl>`. The value is bold and wraps instead of being cut.
 */
function AccountDetailRow({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-3 text-sm leading-7.5",
        className
      )}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-end font-bold wrap-break-word">{children}</dd>
    </div>
  )
}

export { AccountDetailRow }
