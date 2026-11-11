import type { Metadata } from "next"

import { BibleTrialTemplate } from "@/components/templates/bible-trial-template"

export const metadata: Metadata = { title: "Bible versions · free trial" }

export default function BibleTrialPage() {
  return <BibleTrialTemplate />
}
