import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * White admin card with a bold title (and optional controls on the title
 * line). It grows with its content and stretches to the tallest sibling.
 */
function AdminPlatformPanel({
  title,
  action,
  titleClassName,
  className,
  children,
}: {
  title?: React.ReactNode
  /** Badge / switch shown at the end of the title line. */
  action?: React.ReactNode
  titleClassName?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent className="flex min-w-0 flex-1 flex-col">
        {title ? (
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <h2
              className={cn("min-w-0 text-[15px] font-bold", titleClassName)}
            >
              {title}
            </h2>
            {action}
          </div>
        ) : null}
        {children}
      </CardContent>
    </Card>
  )
}

export { AdminPlatformPanel }
