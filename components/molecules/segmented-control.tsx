"use client"

import * as React from "react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type Option<T extends string> = { value: T; label: React.ReactNode }

/**
 * Single-select pill switch built on shadcn ToggleGroup.
 *  - `soft`    : muted track, white thumb  (Auto / Manual)
 *  - `outline` : bordered track, dark thumb (Monthly / Annual)
 */
function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  variant = "soft",
  label,
  className,
}: {
  value: T
  onValueChange: (value: T) => void
  options: Option<T>[]
  variant?: "soft" | "outline"
  label: string
  className?: string
}) {
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      onValueChange={(next) => {
        // Single-select: ignore the "toggle off" event for the active item.
        const picked = next[0] as T | undefined
        if (picked) onValueChange(picked)
      }}
      spacing={0}
      className={cn(
        "box-border w-full p-0.75 text-[13px] font-semibold",
        variant === "soft" && "h-9 rounded-md bg-muted",
        variant === "outline" &&
          "w-fit max-w-full rounded-lg border border-input bg-card",
        className
      )}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={cn(
            "h-auto min-w-0 text-[13px] font-semibold text-muted-foreground",
            variant === "soft" &&
              "flex-1 self-stretch rounded-sm! px-0! aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:hover:bg-card",
            variant === "outline" &&
              "shrink! self-stretch rounded-[9px]! px-4! py-2 text-center text-xs whitespace-normal aria-pressed:text-[13px] aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary aria-pressed:hover:text-primary-foreground"
          )}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { SegmentedControl }
