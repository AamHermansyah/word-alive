import { ActivityRow } from "@/components/molecules/activity-row"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ActivityItem } from "@/types"

const KIND_LABEL = { scripture: "Scripture", song: "Song" } as const

/** Shown on phones and desktop; the tablet layout drops it, like the mockup. */
function RecentActivityCard({
  items,
  onShowAgain,
}: {
  items: ActivityItem[]
  onShowAgain: (item: ActivityItem) => void
}) {
  return (
    <Card className="min-w-0 flex-1 gap-0 md:hidden xl:flex">
      <CardHeader className="mb-1.5">
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {items.slice(0, 3).map((item) => (
            <ActivityRow
              key={item.id}
              title={item.title}
              meta={`${KIND_LABEL[item.kind]} · ${item.time}`}
              actionLabel="Show again"
              onAction={() => onShowAgain(item)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export { RecentActivityCard }
