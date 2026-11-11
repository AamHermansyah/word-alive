"use client"

import * as React from "react"

import { AdminPlatformSwitch } from "@/components/atoms/admin-platform-switch"
import { cn } from "@/lib/utils"

/** A label (with optional hint) on the start side and a switch on the end side. */
function AdminPlatformToggleRow({
  id,
  label,
  hint,
  checked,
  onCheckedChange,
  disabled,
  strong,
  className,
}: {
  id: string
  label: string
  hint?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  /** Bigger bold label (the main setting of a card). */
  strong?: boolean
  className?: string
}) {
  const labelId = `${id}-label`

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="min-w-0">
        <div
          id={labelId}
          className={cn(
            "wrap-break-word",
            strong ? "text-sm font-semibold" : "text-[13px]"
          )}
        >
          {label}
        </div>
        {hint ? <div className="text-xs text-muted-foreground">{hint}</div> : null}
      </div>
      <AdminPlatformSwitch
        id={id}
        aria-labelledby={labelId}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
    </div>
  )
}

export { AdminPlatformToggleRow }
