import type { Metadata } from "next"

import { AdminCoverageTemplate } from "@/components/templates/admin-coverage-template"

export const metadata: Metadata = { title: "Coverage" }

export default function AdminCoveragePage() {
  return <AdminCoverageTemplate />
}
