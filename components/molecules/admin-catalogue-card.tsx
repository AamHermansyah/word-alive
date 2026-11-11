import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** Title size and the space under the title row for each card kind. */
const TITLE_STYLE = {
  card: { title: "text-sm md:text-[15px]", row: "mb-3.5" },
  summary: { title: "text-[15px] md:text-base", row: "mb-3" },
  tier: { title: "text-base md:text-[17px]", row: "mb-3" },
} as const

/**
 * White admin card with a title row (title on the start side, an optional
 * control such as a switch or a button on the end side) and a body.
 * Cards in a grid row stretch to the tallest one.
 */
function AdminCatalogueCard({
  title,
  action,
  titleSize = "card",
  className,
  children,
}: {
  title: React.ReactNode
  /** Switch, button or badge at the end of the title row. */
  action?: React.ReactNode
  /** card = 15px section title, summary = 16px, tier = 17px plan name. */
  titleSize?: "card" | "summary" | "tier"
  className?: string
  children: React.ReactNode
}) {
  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent className="flex flex-1 flex-col">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-x-3 gap-y-2",
            TITLE_STYLE[titleSize].row
          )}
        >
          <h2
            className={cn(
              "min-w-0 font-bold wrap-break-word",
              TITLE_STYLE[titleSize].title
            )}
          >
            {title}
          </h2>
          {action}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

export { AdminCatalogueCard }
