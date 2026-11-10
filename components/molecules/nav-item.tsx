"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_ICONS } from "@/components/atoms/icons"
import type { NavKey } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

/**
 * Sidebar link. Renders as a 48px icon button in the rail (tablet) and as a
 * full-width labelled row from `xl` (desktop), exactly like the two mockups.
 */
function NavItem({
  href,
  label,
  navKey,
}: {
  href: string
  label: string
  navKey: NavKey
}) {
  const Icon = NAV_ICONS[navKey]
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex size-12 items-center justify-center rounded-md text-sm font-medium text-sidebar-foreground no-underline outline-none transition-colors hover:bg-sidebar-accent/60 focus-visible:ring-[3px] focus-visible:ring-sidebar-ring/50 xl:h-11 xl:w-full xl:justify-start xl:gap-2.5 xl:px-3",
        active &&
          "bg-sidebar-accent font-semibold text-sidebar-accent-foreground hover:bg-sidebar-accent"
      )}
    >
      <Icon className="size-5 xl:size-4.5" />
      <span className="hidden xl:inline">{label}</span>
    </Link>
  )
}

export { NavItem }
