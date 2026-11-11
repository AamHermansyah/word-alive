"use client"

import * as React from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

/** Row of single-select filter chips (All / Public domain / …). */
function ChipGroup<T extends string>({
  value,
  onValueChange,
  options,
  label,
  className,
}: {
  value: T
  onValueChange: (value: T) => void
  options: { value: T; label: string }[]
  label: string
  className?: string
}) {
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      onValueChange={(next) => {
        const picked = next[0] as T | undefined
        if (picked) onValueChange(picked)
      }}
      spacing={2.5}
      className={cn("flex-wrap", className)}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={cn(
            "h-auto min-w-0 rounded-full border border-input bg-card px-3 py-2 text-xs font-semibold md:px-3.5 md:text-[13px] text-foreground",
            "aria-pressed:border-0 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary aria-pressed:hover:text-primary-foreground"
          )}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { ChipGroup }
