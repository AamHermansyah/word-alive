import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { OnboardingCard } from "@/components/molecules/onboarding-card"
import { cn } from "@/lib/utils"

/**
 * A short status card: round icon (or spinner), optional pill, title, one
 * paragraph, then the actions pinned to the bottom. Used for the payment
 * result, the account / subscription states and the switch-not-available
 * screens, so they all share one rhythm. Cards side by side in a grid stretch
 * to the same height, with their buttons on one line.
 */
function OnboardingNoticeCard({
  icon,
  badge,
  title,
  titleAs: Title = "h2",
  description,
  actions,
  className,
  descriptionClassName,
  actionsClassName,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  icon: React.ReactNode
  badge?: { label: string; variant: "warning" | "destructive" | "neutral" }
  title: string
  titleAs?: "h1" | "h2"
  description?: React.ReactNode
  actions?: React.ReactNode
  descriptionClassName?: string
  actionsClassName?: string
}) {
  return (
    <OnboardingCard
      width="fluid"
      padding="compact"
      className={className}
      {...props}
    >
      {icon}
      {badge ? (
        <div className="mt-4 flex justify-center">
          <Badge variant={badge.variant}>{badge.label}</Badge>
        </div>
      ) : null}
      <Title
        className={cn(
          "text-base font-bold wrap-break-word md:text-lg",
          badge ? "mt-2.5" : "mt-4"
        )}
      >
        <bdi>{title}</bdi>
      </Title>
      {description ? (
        <p
          className={cn(
            "mt-2 text-[13px] wrap-break-word text-muted-foreground md:text-sm",
            descriptionClassName
          )}
        >
          <bdi>{description}</bdi>
        </p>
      ) : null}
      {actions ? (
        <div className={cn("mt-auto flex flex-col pt-4.5", actionsClassName)}>
          {actions}
        </div>
      ) : null}
    </OnboardingCard>
  )
}

export { OnboardingNoticeCard }
