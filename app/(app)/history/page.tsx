import type { Metadata } from "next"

import { ServiceHistoryTemplate } from "@/components/templates/service-history-template"

export const metadata: Metadata = { title: "Service history" }

export default function ServiceHistoryPage() {
  return <ServiceHistoryTemplate />
}
