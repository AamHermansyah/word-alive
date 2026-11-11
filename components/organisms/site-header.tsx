"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { BrandMark } from "@/components/atoms/brand-mark"
import { useDirection } from "@/components/providers/direction-provider"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SITE_NAV } from "@/lib/data/site"

/**
 * Public website header. From `xl` the section links sit beside the logo; below
 * that they move into a Sheet opened by the menu button (phones keep only the
 * "Get started" button next to it, tablets add "Sign in").
 */
function SiteHeader() {
  const { direction } = useDirection()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 md:px-10 xl:px-20 xl:py-4">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <BrandMark />
          <span className="text-base font-bold sm:text-lg">WordAlive</span>
        </Link>

        <nav
          aria-label="Website"
          className="ms-4 hidden flex-1 items-center gap-5 xl:flex"
        >
          {SITE_NAV.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-muted-foreground no-underline hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-3 xl:ms-0">
          <Link
            href="/sign-in"
            className="hidden text-[13px] font-semibold no-underline hover:underline sm:inline"
          >
            Sign in
          </Link>
          <Button
            nativeButton={false}
            render={<Link href="/setup" />}
            size="lg"
            className="px-3 sm:px-4"
          >
            Get started
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-lg"
                  aria-label="Open menu"
                  className="xl:hidden"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent
              side={direction === "rtl" ? "left" : "right"}
              className="w-72 max-w-[85vw]"
            >
              <SheetTitle className="px-5 pt-5 text-lg font-bold">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Website sections and sign in
              </SheetDescription>
              <nav aria-label="Website menu" className="flex flex-col px-3 pb-6">
                {SITE_NAV.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-sm font-medium no-underline hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-semibold no-underline hover:bg-accent"
                >
                  Sign in
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
