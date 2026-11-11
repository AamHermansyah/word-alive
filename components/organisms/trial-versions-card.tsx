import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

/** "1 of 1 version" during the free trial, with the way to get more. */
function TrialVersionsCard({
  used,
  limit,
  className,
}: {
  used: number
  limit: number
  className?: string
}) {
  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent className="flex flex-col">
        <CardTitle className="text-base font-bold">Free trial</CardTitle>
        <div className="mt-3 text-xl font-bold md:text-2xl">
          <bdi>
            {used} of {limit} {limit === 1 ? "version" : "versions"}
          </bdi>
        </div>
        <Progress
          value={Math.round((used / limit) * 100)}
          aria-label="Bible versions in use"
          trackClassName="h-2"
          className="my-2.5"
        />
        <p className="mb-3 text-[13px] leading-5 text-muted-foreground">
          Choose a plan to use more Bible versions.
        </p>
        <Button size="lg" nativeButton={false} render={<Link href="/plan" />}>
          Choose a plan
        </Button>
      </CardContent>
    </Card>
  )
}

export { TrialVersionsCard }
