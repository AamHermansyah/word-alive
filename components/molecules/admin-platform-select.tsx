"use client"

import { FormField } from "@/components/molecules/form-field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

/**
 * Dropdown over plain string options whose chosen value wraps onto a second
 * line instead of being cut off (a provider or action name is content).
 *
 * With `label` it sits under a small caption like the other form fields;
 * with `ariaLabel` only (filters) it is just the control.
 */
function AdminPlatformSelect({
  id,
  label,
  ariaLabel,
  value,
  options,
  onValueChange,
  className,
}: {
  id?: string
  label?: string
  ariaLabel?: string
  value: string
  options: readonly string[]
  onValueChange: (value: string) => void
  className?: string
}) {
  const select = (
    <Select value={value} onValueChange={(next) => next && onValueChange(next)}>
      <SelectTrigger
        id={id}
        aria-label={label ? undefined : ariaLabel}
        className={cn(
          "w-full whitespace-normal data-[size=default]:h-auto data-[size=default]:min-h-10 *:data-[slot=select-value]:line-clamp-none",
          className
        )}
      >
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

  if (!label || !id) return select

  return (
    <FormField label={label} htmlFor={id}>
      {select}
    </FormField>
  )
}

export { AdminPlatformSelect }
