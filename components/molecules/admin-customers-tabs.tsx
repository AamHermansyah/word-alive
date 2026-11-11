"use client"

import * as React from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

/**
 * Underlined tab row ("All · 14", "New · 3", "Handled") built on the shadcn
 * Tabs in its line variant: muted labels, the active one dark with a brand
 * underline sitting on the row's bottom border. The panel it controls is the
 * list rendered below it, so only the tab list lives here.
 */
function AdminCustomersTabs<T extends string>({
  value,
  onValueChange,
  tabs,
  label,
  className,
}: {
  value: T
  onValueChange: (value: T) => void
  tabs: { value: T; label: React.ReactNode }[]
  label: string
  className?: string
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      className={className}
    >
      <TabsList
        variant="line"
        aria-label={label}
        className="h-auto w-full flex-wrap justify-start gap-x-1 gap-y-0 border-b border-border p-0 group-data-horizontal/tabs:h-auto"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "h-auto min-h-10 flex-none rounded-none px-3 py-2.5 text-sm font-semibold whitespace-normal text-muted-foreground md:px-3.5",
              "after:bg-brand group-data-horizontal/tabs:after:-bottom-px group-data-horizontal/tabs:after:h-0.75 data-active:text-foreground"
            )}
          >
            <bdi>{tab.label}</bdi>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export { AdminCustomersTabs }
