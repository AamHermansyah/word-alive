"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useDirection } from "@/components/providers/direction-provider"
import type { AdminChangeEntry } from "@/types/admin-catalogue"

/**
 * "View history": the latest saved changes of a page, newest first, in a
 * drawer on the end side of the screen.
 */
function AdminCatalogueHistorySheet({
  open,
  onOpenChange,
  title,
  description,
  entries,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  entries: AdminChangeEntry[]
}) {
  const { direction } = useDirection()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={direction === "rtl" ? "left" : "right"}>
        <SheetHeader className="pe-14">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {entries.length > 0 ? (
          <ol className="flex flex-1 flex-col overflow-y-auto px-6 pb-6">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-col gap-1.5 border-t border-border py-3.5 first:border-t-0 first:pt-0"
              >
                <div className="text-[13px] font-bold wrap-break-word">
                  {entry.headline}
                </div>
                <div className="text-xs text-muted-foreground">
                  <bdi>{entry.who}</bdi> · {entry.when}
                </div>
                <ul className="flex flex-col gap-1 text-[13px]">
                  {entry.changes.map((change) => (
                    <li key={change} className="wrap-break-word">
                      <bdi>{change}</bdi>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        ) : (
          <p className="px-6 pb-6 text-sm text-muted-foreground">
            No changes have been saved yet.
          </p>
        )}
      </SheetContent>
    </Sheet>
  )
}

export { AdminCatalogueHistorySheet }
