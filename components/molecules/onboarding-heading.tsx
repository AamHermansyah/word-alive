import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Title + one-line description at the top of a sign-in / set-up card. 20px on
 * phones, the mockup's 26 or 28px from `md`. Spacing below is up to the caller
 * (`className`), because it differs per screen.
 */
function OnboardingHeading({
  title,
  description,
  size = 26,
  className,
  descriptionClassName,
}: {
  title: string
  description?: React.ReactNode
  size?: 26 | 28
  className?: string
  descriptionClassName?: string
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <h1
        className={cn(
          "text-xl font-bold wrap-break-word",
          size === 26 ? "md:text-[26px]" : "md:text-[28px]"
        )}
      >
        <bdi>{title}</bdi>
      </h1>
      {description ? (
        <p
          className={cn(
            "mt-1.5 text-[13px] text-muted-foreground md:text-sm",
            descriptionClassName
          )}
        >
          <bdi>{description}</bdi>
        </p>
      ) : null}
    </div>
  )
}

export { OnboardingHeading }
