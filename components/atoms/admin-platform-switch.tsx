"use client"

import * as React from "react"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type SwitchProps = Omit<React.ComponentProps<typeof Switch>, "className" | "size">

/** The admin console's on/off switch: the mockup's 44 x 26 track, green when on. */
function AdminPlatformSwitch({
  className,
  ...props
}: SwitchProps & { className?: string }) {
  return (
    <Switch
      size="lg"
      className={cn("data-checked:bg-success", className)}
      {...props}
    />
  )
}

export { AdminPlatformSwitch }
