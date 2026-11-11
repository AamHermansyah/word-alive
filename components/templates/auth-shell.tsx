"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { BrandMark } from "@/components/atoms/brand-mark"
import { getPage } from "@/lib/data/navigation"

/**
 * Frame for the sign-in / set-up / payment / device flow: logo on the start
 * side, the step note (from the navigation registry's `headerNote`) on the
 * end side, content centred underneath. No sidebar, so a first-time visitor
 * only sees the one task in front of them. The header stays put while the
 * content below it transitions between pages.
 *
 * Bottom padding clears the floating page switcher.
 */
function AuthShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const page = getPage(pathname)
  const note = page?.headerNote

  return (
    <div className="animate-in fade-in-0 duration-300 motion-reduce:animate-none flex min-h-dvh flex-col bg-background px-4 pt-5 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-8 md:px-12 md:pt-7 xl:px-14">
      <header className="flex items-center gap-2.5">
        <BrandMark />
        <Link href="/" className="shrink-0 text-lg font-bold">
          WordAlive
        </Link>
        {note ? (
          <span className="min-w-0 flex-1 text-end text-xs wrap-break-word text-muted-foreground">
            {page?.headerNoteHref ? (
              <Link href={page.headerNoteHref} className="font-semibold text-brand-text hover:underline">
                {note}
              </Link>
            ) : (
              note
            )}
          </span>
        ) : null}
      </header>
      <main className="flex min-w-0 flex-1 flex-col items-center justify-center gap-7 py-8">
        {children}
      </main>
    </div>
  )
}

export { AuthShell }
