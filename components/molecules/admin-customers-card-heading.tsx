import * as React from "react"

import { cn } from "@/lib/utils"

/** Card title (15px bold) with an optional action at the end ("View all"). */
function AdminCustomersCardHeading({
  title,
  action,
  className,
}: {
  title: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-3.5 flex items-center justify-between gap-3",
        className
      )}
    >
      <h2 className="min-w-0 text-sm font-bold wrap-break-word md:text-[15px]">
        {title}
      </h2>
      {action}
    </div>
  )
}

export { AdminCustomersCardHeading }
