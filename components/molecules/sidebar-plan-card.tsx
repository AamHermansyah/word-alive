"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getPage } from "@/lib/data/navigation"
import { TALK_HOURS, TRIAL } from "@/lib/data/plans"

/**
 * Plan summary pinned to the bottom of the sidebar. It follows the page being
 * viewed: trial pages (see `plan: "trial"` in the navigation registry) show
 * the free-trial allowance and "Choose a plan", every other page shows the
 * paid plan and "Upgrade plan".
 */
function SidebarPlanCard() {
  const pathname = usePathname()
  const trial = getPage(pathname)?.plan === "trial"

  const name = trial ? "Free trial" : "Starter plan"
  const hoursLeft = trial ? TRIAL.hoursLeft : TALK_HOURS.total - TALK_HOURS.used
  const hoursTotal = trial ? TRIAL.hoursTotal : TALK_HOURS.total
  const percent = Math.round((hoursLeft / hoursTotal) * 100)

  return (
    <Card size="sm" className="mt-auto gap-0 bg-background">
      <CardContent>
        <div className="text-[13px] font-semibold">{name}</div>
        <div className="mt-0.5 mb-2.5 text-xs text-muted-foreground">
          <bdi>
            {hoursLeft} of {hoursTotal} {hoursTotal === 1 ? "hour" : "hours"}{" "}
            left
            {trial ? ` · ${TRIAL.daysLeft} days` : ""}
          </bdi>
        </div>
        <Progress value={percent} aria-label="Talk hours left" />
        <Link
          href={trial ? "/plan" : "/usage"}
          className="mt-3 block text-[13px] font-semibold text-brand-text no-underline hover:underline"
        >
          {trial ? "Choose a plan" : "Upgrade plan"}
        </Link>
      </CardContent>
    </Card>
  )
}

export { SidebarPlanCard }
