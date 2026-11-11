"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/**
 * Compact dropdown button over a list of plain string options ("All
 * statuses", "Last 30 days"), styled like the mockup's outlined admin button.
 * The visible label is the selected option, so `label` names the control for
 * screen readers.
 */
function AdminCustomersSelect<T extends string>({
  value,
  onValueChange,
  options,
  label,
  className,
}: {
  value: T
  onValueChange: (value: T) => void
  options: readonly T[]
  label: string
  className?: string
}) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next) onValueChange(next as T)
      }}
    >
      <SelectTrigger aria-label={label} className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { AdminCustomersSelect }
