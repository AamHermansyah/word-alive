import type { Metadata } from "next"

import { TrialStartedTemplate } from "@/components/templates/trial-started-template"

export const metadata: Metadata = { title: "Free trial started" }

export default function TrialStartedPage() {
  return <TrialStartedTemplate />
}
