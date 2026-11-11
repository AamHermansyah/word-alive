"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_ICONS } from "@/components/atoms/icons"
import { BrandMark } from "@/components/atoms/brand-mark"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ADMIN_NAV_GROUPS,
  CURRENT_ADMIN,
  getActiveKey,
} from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

/**
 * Admin navigation: dark navy panel with the pages grouped by category, and
 * the signed-in admin + "Sign out" at the bottom. Rendered twice by AdminShell:
 * as the fixed 248px panel from `xl`, and inside a Sheet drawer below it.
 * `onNavigate` lets the drawer close itself when a link is chosen.
 */
function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const activeKey = getActiveKey(pathname)

  return (
    <div className="admin-surface flex min-h-full flex-col bg-sidebar px-3.5 py-6 text-sidebar-foreground">
      <div className="flex items-center gap-2.5 px-2 pb-2">
        <BrandMark />
        <span className="text-lg font-bold text-white">WordAlive</span>
        <span className="rounded-full bg-white/16 px-2 py-0.5 text-[11px] font-semibold text-white">
          Admin
        </span>
      </div>

      <nav aria-label="Admin" className="mt-2 flex flex-1 flex-col">
        {ADMIN_NAV_GROUPS.map(({ group, items }) => (
          <div key={group} className="flex flex-col">
            {group !== "Overview" ? (
              <div className="px-3 pt-2.5 pb-1 text-[11px] font-semibold tracking-wider text-sidebar-muted uppercase">
                {group}
              </div>
            ) : null}
            {items.map((item) => {
              const Icon = NAV_ICONS[item.key]
              const active = activeKey === item.key
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-10 items-center gap-2.5 rounded-sm px-3 py-1.5 text-[13px] font-medium text-sidebar-foreground no-underline outline-none hover:bg-sidebar-accent/60 focus-visible:ring-[3px] focus-visible:ring-sidebar-ring/60 md:min-h-8",
                    active &&
                      "bg-sidebar-accent font-semibold text-sidebar-accent-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="size-4.25 shrink-0" />
                  <span className="min-w-0 wrap-break-word">{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="mt-4 flex items-center gap-2.5 border-t border-sidebar-border px-2 pt-3">
        <Avatar className="size-9">
          <AvatarFallback className="bg-brand text-[13px] font-semibold text-brand-foreground">
            {CURRENT_ADMIN.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-white">
            <bdi>{CURRENT_ADMIN.name}</bdi>
          </div>
          <div className="text-xs">{CURRENT_ADMIN.role}</div>
        </div>
        <Link
          href="/admin/login"
          onClick={onNavigate}
          className="text-xs font-semibold text-white no-underline hover:underline"
        >
          Sign out
        </Link>
      </div>
    </div>
  )
}

export { AdminNav }
