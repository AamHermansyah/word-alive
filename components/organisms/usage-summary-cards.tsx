import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

/** "9.5 hours left · 2.5 of 12 hours used" with an 8px usage bar. */
function TalkHoursCard({ total, used }: { total: number; used: number }) {
  const percentUsed = Math.round((used / total) * 100)

  return (
    <Card className="min-w-0 flex-[1.6] gap-0 px-5">
      <CardContent className="px-0">
        <CardTitle>Talk hours this cycle</CardTitle>
        <div className="mt-2 mb-3 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-bold md:text-[30px]">
            <bdi>{total - used} hours left</bdi>
          </span>
          <span className="text-xs text-muted-foreground">
            <bdi>
              {used} of {total} hours used
            </bdi>
          </span>
        </div>
        <Progress
          value={percentUsed}
          aria-label="Talk hours used"
          trackClassName="h-2"
        />
      </CardContent>
    </Card>
  )
}

function BibleVersionsUsageCard({
  used,
  limit,
}: {
  used: number
  limit: number
}) {
  return (
    <Card className="min-w-0 flex-1 gap-0 px-5">
      <CardContent className="px-0">
        <CardTitle>Bible versions</CardTitle>
        <div className="mt-2 mb-1 text-2xl font-bold md:text-[30px]">
          <bdi>
            {used} of {limit}
          </bdi>
        </div>
        <div className="text-xs text-muted-foreground">
          <bdi>in use. Add more on a bigger plan.</bdi>
        </div>
      </CardContent>
    </Card>
  )
}

export { BibleVersionsUsageCard, TalkHoursCard }
