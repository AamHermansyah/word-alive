import type { Metadata } from "next"

import { AdminOverviewTemplate } from "@/components/templates/admin-overview-template"

export const metadata: Metadata = { title: "Overview" }

export default function AdminOverviewPage() {
  return <AdminOverviewTemplate />
}
