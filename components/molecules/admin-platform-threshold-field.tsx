"use client"

import * as React from "react"

import { Slider } from "@/components/ui/slider"
import { formatThreshold, parseThreshold } from "@/lib/admin-platform"
import { cn } from "@/lib/utils"

/**
 * A confidence threshold as a slider and a number box that stay in sync:
 * drag the slider, or type 0.85 or 85 in the box. The value is kept as a
 * whole percentage.
 */
function AdminPlatformThresholdField({
  id,
  label,
  percent,
  invalid,
  onPercentChange,
  className,
}: {
  id: string
  label: string
  percent: number
  invalid?: boolean
  onPercentChange: (percent: number) => void
  className?: string
}) {
  // Text being typed; null while the box just mirrors the slider.
  const [typed, setTyped] = React.useState<string | null>(null)

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <label htmlFor={id} className="min-w-0 wrap-break-word">
          {label}
        </label>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          aria-invalid={invalid || undefined}
          value={typed ?? formatThreshold(percent)}
          onChange={(event) => {
            setTyped(event.target.value)
            const next = parseThreshold(event.target.value)
            if (next !== null) onPercentChange(next)
          }}
          onBlur={() => setTyped(null)}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur()
          }}
          className={cn(
            "w-12 shrink-0 rounded-sm bg-transparent px-1 text-end text-xs font-bold text-foreground tabular-nums outline-none hover:ring-1 hover:ring-input focus-visible:ring-2 focus-visible:ring-ring/50",
            invalid && "text-destructive"
          )}
        />
      </div>
      <Slider
        min={0}
        max={100}
        step={1}
        value={[percent]}
        getAriaLabel={() => label}
        onValueChange={(next) => {
          setTyped(null)
          const value = Array.isArray(next) ? next[0] : next
          onPercentChange(value)
        }}
      />
    </div>
  )
}

export { AdminPlatformThresholdField }
