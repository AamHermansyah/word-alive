"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { BrandMark } from "@/components/atoms/brand-mark"
import { AdminNav } from "@/components/organisms/admin-sidebar"
import { useDirection } from "@/components/providers/direction-provider"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getPage } from "@/lib/data/navigation"

/**
 * Frame for the admin console.
 *  - `xl`+: fixed 248px navy sidebar, content to its side (mockup, 1280).
 *  - below `xl`: a slim top bar with a menu button; the same navigation opens
 *    in a Sheet drawer from the start side.
 *  - the "Access" pages (admin login, authenticator setup) have no console
 *    chrome at all and get the full viewport.
 */
function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { direction } = useDirection()
  const [open, setOpen] = React.useState(false)
  const bare = getPage(pathname)?.group === "Access"

  if (bare) return <div className="min-h-dvh bg-background animate-in fade-in-0 duration-300 motion-reduce:animate-none">{children}</div>

  return (
    <div className="flex min-h-dvh bg-background animate-in fade-in-0 duration-300 motion-reduce:animate-none">
      <aside className="sticky top-0 hidden h-dvh w-62 shrink-0 overflow-y-auto xl:block">
        <AdminNav />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2.5 border-b border-border bg-card px-4 py-2.5 md:px-6 xl:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open admin menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent
              side={direction === "rtl" ? "right" : "left"}
              showCloseButton={false}
              className="w-72 max-w-[85vw] border-0 bg-navy p-0"
            >
              <SheetTitle className="sr-only">Admin menu</SheetTitle>
              <SheetDescription className="sr-only">
                All admin console pages
              </SheetDescription>
              <div className="flex-1 overflow-y-auto">
                <AdminNav onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <BrandMark className="size-8" />
          <span className="font-bold">WordAlive</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold">
            Admin
          </span>
        </div>

        <main className="flex min-w-0 flex-1 flex-col p-4 pb-24 md:p-6 md:pb-24 xl:p-7 xl:pb-20">
          {children}
        </main>
      </div>
    </div>
  )
}

export { AdminShell }
