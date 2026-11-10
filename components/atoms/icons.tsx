import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Icon set copied path-for-path from the mockup so strokes match exactly
 * (lucide's equivalents differ by a pixel or two). Every icon inherits
 * `currentColor` and uses the same 24px grid / 2px stroke as the mockup.
 */
function BaseIcon({
  className,
  children,
  ...props
}: React.ComponentProps<"svg">) {
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

type IconProps = React.ComponentProps<"svg">

export function MicIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </BaseIcon>
  )
}

export function MusicIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </BaseIcon>
  )
}

export function BookIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 4h14v16H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h12" />
    </BaseIcon>
  )
}

export function GaugeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 14l4-4M4 18a9 9 0 1 1 16 0" />
    </BaseIcon>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </BaseIcon>
  )
}

export function CheckMarkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12l5 5 9-10" />
    </BaseIcon>
  )
}

export const NAV_ICONS = {
  live: MicIcon,
  songs: MusicIcon,
  bible: BookIcon,
  usage: GaugeIcon,
  settings: SettingsIcon,
} as const
