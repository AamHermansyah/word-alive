"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_ICONS } from "@/components/atoms/icons"
import { getActiveKey, getPage, type NavKey } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

/**
 * Sidebar link. Three shapes, one element:
 *  - phones: a tab in the bottom bar (icon over a short label)
 *  - tablet: 48px icon button in the rail
 *  - `xl`:   full-width labelled row, exactly like the desktop mockup
 */
function NavItem({
  href,
  trialHref,
  label,
  shortLabel,
  navKey,
}: {
  href: string
  /** Used instead of `href` while a free-trial page is open. */
  trialHref?: string
  label: string
  shortLabel: string
  navKey: NavKey
}) {
  const Icon = NAV_ICONS[navKey]
  const pathname = usePathname()
  const active = getActiveKey(pathname) === navKey
  const target =
    trialHref && getPage(pathname)?.plan === "trial" ? trialHref : href

  return (
    <Link
      href={target}
      aria-label={label}
      title={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-[11px] font-medium text-sidebar-foreground no-underline outline-none transition-colors hover:bg-sidebar-accent/60 focus-visible:ring-[3px] focus-visible:ring-sidebar-ring/50 md:size-12 md:flex-none md:gap-0 md:px-0 md:text-sm xl:h-11 xl:w-full xl:flex-row xl:justify-start xl:gap-2.5 xl:px-3",
        active &&
          "bg-sidebar-accent font-semibold text-sidebar-accent-foreground hover:bg-sidebar-accent"
      )}
    >
      <Icon className="size-5 shrink-0 xl:size-4.5" />
      <span className="max-w-full truncate md:hidden">{shortLabel}</span>
      <span className="hidden xl:inline">{label}</span>
    </Link>
  )
}

export { NavItem }
