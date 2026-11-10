import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

/** "Starter plan · 9.5 of 12 hours left" card pinned to the sidebar bottom. */
function SidebarPlanCard({
  planName,
  hoursLeft,
  hoursTotal,
}: {
  planName: string
  hoursLeft: number
  hoursTotal: number
}) {
  const percent = Math.round((hoursLeft / hoursTotal) * 100)

  return (
    <Card size="sm" className="mt-auto gap-0 bg-background">
      <CardContent>
        <div className="text-[13px] font-semibold">{planName}</div>
        <div className="mt-0.5 mb-2.5 text-xs text-muted-foreground">
          <bdi>
            {hoursLeft} of {hoursTotal} hours left
          </bdi>
        </div>
        <Progress value={percent} aria-label="Talk hours left" />
        <Link
          href="/usage"
          className="mt-3 block text-[13px] font-semibold text-brand-text no-underline hover:underline"
        >
          Upgrade plan
        </Link>
      </CardContent>
    </Card>
  )
}

export { SidebarPlanCard }
