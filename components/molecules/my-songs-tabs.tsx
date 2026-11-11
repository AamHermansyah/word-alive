"use client"

import * as React from "react"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

/**
 * Underlined tab strip of the "My songs" page: a hairline under the whole
 * row, a 3px brand bar under the open tab. Built on the shadcn Tabs `line`
 * variant, resized to the mockup (taller tabs, brand bar). Labels may wrap on
 * narrow phones instead of pushing the strip out of the page.
 */
function MySongsTabList({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsList>, "variant">) {
  return (
    <TabsList
      variant="line"
      className={cn(
        "w-full flex-wrap items-stretch justify-start gap-x-1.5 border-b border-border p-0 group-data-horizontal/tabs:h-auto",
        className
      )}
      {...props}
    />
  )
}

function MySongsTab({
  className,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      className={cn(
        "h-auto min-h-10 flex-none rounded-none border-0 px-2.5 py-2.5 text-[13px] font-semibold whitespace-normal text-muted-foreground after:bg-brand data-active:text-foreground sm:px-3.5 sm:text-sm group-data-horizontal/tabs:after:-bottom-px group-data-horizontal/tabs:after:h-0.75",
        className
      )}
      {...props}
    />
  )
}

export { MySongsTab, MySongsTabList }
