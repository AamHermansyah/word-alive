import type { Metadata } from "next"

import { UsagePlanTemplate } from "@/components/templates/usage-plan-template"

export const metadata: Metadata = { title: "Usage and plan" }

export default function UsagePlanPage() {
  return <UsagePlanTemplate />
}
