import * as React from "react"

import { BookIcon } from "@/components/atoms/icons"
import { cn } from "@/lib/utils"
import type { ConsoleBannerIcon } from "@/types/console"

type IconProps = React.ComponentProps<"svg">

/**
 * Status icons of the console warnings and the first-run steps, copied
 * path-for-path from the mockup (24px grid, 2px stroke, `currentColor`).
 */
function ConsoleIcon({ className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <ConsoleIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </ConsoleIcon>
  )
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <ConsoleIcon {...props}>
      <path d="M12 4l10 17H2z" />
      <path d="M12 10v5M12 18h.01" />
    </ConsoleIcon>
  )
}

export function WifiIcon(props: IconProps) {
  return (
    <ConsoleIcon {...props}>
      <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01" />
    </ConsoleIcon>
  )
}

export function GlobeIcon(props: IconProps) {
  return (
    <ConsoleIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </ConsoleIcon>
  )
}

export function ChipIcon(props: IconProps) {
  return (
    <ConsoleIcon {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </ConsoleIcon>
  )
}

export function LockIcon(props: IconProps) {
  return (
    <ConsoleIcon {...props}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </ConsoleIcon>
  )
}

export function CrossIcon(props: IconProps) {
  return (
    <ConsoleIcon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </ConsoleIcon>
  )
}

/** Banner icon by name, so banner data stays plain JSON-like objects. */
export const CONSOLE_BANNER_ICONS: Record<
  ConsoleBannerIcon,
  (props: IconProps) => React.ReactElement
> = {
  clock: ClockIcon,
  alert: AlertTriangleIcon,
  wifi: WifiIcon,
  globe: GlobeIcon,
  book: BookIcon,
  chip: ChipIcon,
}
