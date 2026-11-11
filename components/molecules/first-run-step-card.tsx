import * as React from "react"

import { ConsoleToneTile } from "@/components/atoms/console-tone-tile"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * One card of the first-run flow: round status icon, title, a short text and
 * one full-width action. The text takes the free height, so when cards sit
 * side by side their buttons line up at the bottom whatever the text length.
 */
function FirstRunStepCard({
  tone,
  icon,
  title,
  action,
  children,
  className,
}: {
  tone: React.ComponentProps<typeof ConsoleToneTile>["tone"]
  icon: React.ReactNode
  title: string
  /** The card's button (full width, 48px tall). */
  action: React.ReactNode
  /** Body text or list. */
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card
      className={cn(
        "min-w-0 flex-1 gap-0 text-center [--card-spacing:--spacing(5)] md:[--card-spacing:--spacing(7)]",
        className
      )}
    >
      <CardContent className="flex flex-1 flex-col items-center">
        <ConsoleToneTile tone={tone} shape="round">
          {icon}
        </ConsoleToneTile>
        <h2 className="mt-4 text-[15px] font-bold wrap-break-word md:text-lg">
          {title}
        </h2>
        <div className="mt-2 mb-4.5 w-full flex-1 text-[13px] leading-5.5 text-muted-foreground wrap-break-word md:text-sm">
          {children}
        </div>
        <div className="w-full">{action}</div>
      </CardContent>
    </Card>
  )
}

export { FirstRunStepCard }
