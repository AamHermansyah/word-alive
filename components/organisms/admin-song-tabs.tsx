"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AdminSongTab } from "@/types/admin-catalogue"

const TAB_ORDER: AdminSongTab[] = ["review", "takedowns", "all"]

/**
 * Tabs of the song catalogue: Review queue, Takedown requests, All songs.
 * The counts are live. As in the mockups the open tab leads the row and the
 * others follow in their usual order.
 */
function AdminSongTabs({
  active,
  reviewCount,
  takedownCount,
  onChange,
}: {
  active: AdminSongTab
  reviewCount: number
  takedownCount: number
  onChange: (tab: AdminSongTab) => void
}) {
  const label: Record<AdminSongTab, string> = {
    review: `Review queue · ${reviewCount}`,
    takedowns: `Takedown requests · ${takedownCount}`,
    all: "All songs",
  }
  const ordered = [active, ...TAB_ORDER.filter((tab) => tab !== active)]

  return (
    <Tabs
      value={active}
      onValueChange={(next) => onChange(next as AdminSongTab)}
    >
      <TabsList
        variant="line"
        aria-label="Song catalogue"
        className="w-full justify-start gap-1.5 border-b border-border p-0 group-data-horizontal/tabs:h-auto"
      >
        {ordered.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="h-auto flex-1 rounded-none px-2 py-2.5 text-[13px] font-semibold whitespace-normal text-muted-foreground after:bg-brand group-data-horizontal/tabs:after:-bottom-px group-data-horizontal/tabs:after:h-0.75 sm:flex-none sm:px-3.5 sm:text-sm sm:whitespace-nowrap data-active:text-foreground"
          >
            {label[tab]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export { AdminSongTabs }
