import Link from "next/link"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

/** "5 of 5 versions" with a usage bar and the way to get more. */
function PlanVersionsCard({
  used,
  limit,
  upgradeTo,
  className,
}: {
  used: number
  limit: number
  /** How many versions the next plan up includes. */
  upgradeTo: number
  className?: string
}) {
  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent className="flex flex-col">
        <CardTitle>Your plan</CardTitle>
        <div className="mt-2 mb-3 text-xl font-bold md:text-[22px]">
          <bdi>
            {used} of {limit} versions
          </bdi>
        </div>
        <Progress
          value={Math.round((used / limit) * 100)}
          aria-label="Bible versions in use"
          trackClassName="h-2"
        />
        <Link
          href="/usage"
          className="mt-3 w-fit py-1 text-[13px] font-semibold text-brand-text no-underline hover:underline"
        >
          Upgrade for {upgradeTo} versions
        </Link>
      </CardContent>
    </Card>
  )
}

export { PlanVersionsCard }
