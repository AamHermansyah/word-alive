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
import { NAV_GROUPS, getPage } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

/**
 * Floating button at the bottom end of the screen. Opens a menu with every
 * page of the app, grouped by category, so any page can be reached in two
 * clicks. Rendered once in the root layout, so it is on every surface (app,
 * sign-in flow, audience screen, admin, website). On phones it sits above the
 * bottom tab bar, which only exists on the customer app surface.
 */
function PageSwitcher() {
  const pathname = usePathname()
  const hasTabBar = getPage(pathname)?.surface === "app"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="All pages"
        className={cn(
          "fixed inset-e-4 z-50 flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg outline-none transition-[transform,bottom] duration-200 hover:scale-105 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95 md:inset-e-6 md:bottom-6",
          hasTabBar
            ? "bottom-[calc(5rem+env(safe-area-inset-bottom))]"
            : "bottom-[calc(1rem+env(safe-area-inset-bottom))]"
        )}
      >
        <LayoutGridIcon className="size-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="end"
        sideOffset={10}
        className="w-64"
      >
        {NAV_GROUPS.map(({ id, label, items }, index) => (
          <React.Fragment key={id}>
            {index > 0 ? <DropdownMenuSeparator /> : null}
            <DropdownMenuGroup>
              <DropdownMenuLabel>{label}</DropdownMenuLabel>
              {items.map((item) => {
                const Icon = NAV_ICONS[item.key]
                const active = pathname === item.href

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
                    <Icon className="size-4 self-start mt-0.5" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="wrap-break-word">{item.label}</span>
                      <bdi className="text-xs font-normal wrap-break-word text-muted-foreground">
                        {item.href}
                      </bdi>
                    </span>
                    {active ? <CheckIcon className="text-success" /> : null}
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
