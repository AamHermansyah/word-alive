import type { Metadata } from "next"

import { AdminPlatformHealthTemplate } from "@/components/templates/admin-platform-health-template"

export const metadata: Metadata = { title: "System health" }

export default function AdminHealthPage() {
  return <AdminPlatformHealthTemplate />
}
