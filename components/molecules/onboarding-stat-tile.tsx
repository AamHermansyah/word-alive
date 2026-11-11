import * as React from "react"

/**
 * Row of stat tiles. Three across from 360px; narrower phones stack them, so
 * a longer value ("0.8 of 1 hour") wraps between words instead of inside one.
 */
function OnboardingStatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 min-[22.5rem]:grid-cols-3 md:gap-3">
      {children}
    </div>
  )
}

/** Small tinted tile with a bold value and a muted caption ("7 days / Ends Nov 14"). */
function OnboardingStatTile({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="min-w-0 rounded-lg bg-background px-2.5 py-3.5 text-center">
      <div className="text-base font-bold wrap-break-word sm:text-xl">
        <bdi>{value}</bdi>
      </div>
      <div className="text-xs wrap-break-word text-muted-foreground">
        <bdi>{label}</bdi>
      </div>
    </div>
  )
}

export { OnboardingStatGrid, OnboardingStatTile }
