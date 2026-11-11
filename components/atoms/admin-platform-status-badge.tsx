import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { AdminTone } from "@/types/admin-platform"

const VARIANT = {
  success: "success",
  warning: "warning",
  danger: "destructive",
  neutral: "secondary",
  info: "info",
  brand: "brand",
} as const

/**
 * Status pill (Listed, Healthy, Setup pending…). The tone picks the colour
 * token; the label wraps instead of widening its column.
 */
function AdminPlatformStatusBadge({
  tone,
  className,
  children,
}: {
  tone: AdminTone
  className?: string
  children: React.ReactNode
}) {
  return (
    <Badge
      variant={VARIANT[tone]}
      className={cn(
        "max-w-full whitespace-normal",
        tone === "neutral" && "text-muted-foreground",
        className
      )}
    >
      {children}
    </Badge>
  )
}

export { AdminPlatformStatusBadge }
