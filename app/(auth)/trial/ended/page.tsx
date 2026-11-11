import type { Metadata } from "next"

import { TrialEndedTemplate } from "@/components/templates/trial-ended-template"

export const metadata: Metadata = { title: "Trial ended" }

export default function TrialEndedPage() {
  return <TrialEndedTemplate />
}
