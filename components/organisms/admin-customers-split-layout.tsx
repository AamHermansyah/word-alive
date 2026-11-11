"use client"

import * as React from "react"

import { useDirection } from "@/components/providers/direction-provider"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useAdminCustomersWideScreen } from "@/hooks/use-admin-customers-ui"

/**
 * A list with a detail panel for the selected record (Users, Support inbox).
 *
 *  - from `xl` (the mockup): the list takes two thirds and the panel sits next
 *    to it as a card, always showing the selected record;
 *  - below `xl`: only the list shows; choosing a record ("View") opens the same
 *    panel in a Sheet on the end side.
 *
 * `children` is the panel body; it is rendered by whichever frame is visible.
 */
function AdminCustomersSplitLayout({
  list,
  title,
  subtitle,
  panelLabel,
  open,
  onOpenChange,
  children,
}: {
  list: React.ReactNode
  /** Record name: the panel heading. */
  title: string
  /** One muted line under the heading (email, date…). */
  subtitle: React.ReactNode
  panelLabel: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  const wide = useAdminCustomersWideScreen()
  const { direction } = useDirection()

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-5">
      <div className="min-w-0 xl:flex-2">{list}</div>

      <aside
        aria-label={panelLabel}
        className="hidden min-w-0 xl:block xl:flex-1"
      >
        <Card className="gap-0">
          <CardContent>
            <h2 className="text-[15px] font-bold wrap-break-word">{title}</h2>
            <p className="mt-1.5 mb-3 text-xs wrap-break-word text-muted-foreground">
              {subtitle}
            </p>
            {children}
          </CardContent>
        </Card>
      </aside>

      <Sheet open={open && !wide} onOpenChange={onOpenChange}>
        <SheetContent
          side={direction === "rtl" ? "left" : "right"}
          className="data-[side=left]:w-11/12 data-[side=right]:w-11/12"
        >
          <SheetHeader className="gap-1.5 p-5 pe-14">
            <SheetTitle className="text-[15px] font-bold wrap-break-word">
              {title}
            </SheetTitle>
            <SheetDescription className="text-xs wrap-break-word">
              {subtitle}
            </SheetDescription>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export { AdminCustomersSplitLayout }
