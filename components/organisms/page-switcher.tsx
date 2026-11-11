"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CheckIcon, LayoutGridIcon } from "lucide-react"

import { NAV_ICONS } from "@/components/atoms/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NAV_GROUPS } from "@/lib/data/navigation"

/**
 * Floating button at the bottom end of the screen. Opens a menu with every
 * page of the app, grouped by category, so any page can be reached in two
 * clicks. On phones it sits above the bottom tab bar.
 */
function PageSwitcher() {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="All pages"
        className="fixed inset-e-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg outline-none transition-transform hover:scale-105 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95 md:inset-e-6 md:bottom-6"
      >
        <LayoutGridIcon className="size-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="end"
        sideOffset={10}
        className="w-64"
      >
        {NAV_GROUPS.map(({ group, items }, index) => (
          <React.Fragment key={group}>
            {index > 0 ? <DropdownMenuSeparator /> : null}
            <DropdownMenuGroup>
              <DropdownMenuLabel>{group}</DropdownMenuLabel>
              {items.map((item) => {
                const Icon = NAV_ICONS[item.key]
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)

                return (
                  <DropdownMenuItem
                    key={item.key}
                    render={
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                      />
                    }
                    className={active ? "bg-accent font-semibold" : undefined}
                  >
                    <Icon className="size-4" />
                    <span className="min-w-0 flex-1 wrap-break-word">
                      {item.label}
                    </span>
                    {active ? (
                      <CheckIcon className="text-success" />
                    ) : (
                      <bdi className="text-xs text-muted-foreground">
                        {item.href}
                      </bdi>
                    )}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { PageSwitcher }
