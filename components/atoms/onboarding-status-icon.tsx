import * as React from "react"

import { cn } from "@/lib/utils"
import type { StatusTone } from "@/types/onboarding"

const TONES: Record<StatusTone, string> = {
  success: "bg-success-soft text-success-soft-foreground",
  warning: "bg-warning-soft text-warning-soft-foreground",
  danger: "bg-danger-soft text-danger-soft-foreground",
  info: "bg-info-soft text-info-soft-foreground",
  brand: "bg-brand-soft text-brand-text",
}

/**
 * The round tinted icon at the top of every sign-in / trial / payment / device
 * card. The glyph is passed in (a lucide icon), the colours come from tokens,
 * so it works in light and dark.
 */
function OnboardingStatusIcon({
  tone,
  className,
  children,
}: {
  tone: StatusTone
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mx-auto flex size-14 shrink-0 items-center justify-center rounded-full [&_svg:not([class*='size-'])]:size-6.5",
        TONES[tone],
        className
      )}
    >
      {children}
    </div>
  )
}

export { OnboardingStatusIcon }
