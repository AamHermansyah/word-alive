import type { Metadata } from "next"

import { PlanTemplate } from "@/components/templates/plan-template"
import { firstParam, parsePlanId } from "@/lib/onboarding"

export const metadata: Metadata = { title: "Choose your plan" }

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>
}) {
  const { plan } = await searchParams
  return <PlanTemplate initialPlan={parsePlanId(firstParam(plan))} />
}
