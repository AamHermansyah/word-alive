import type { Metadata } from "next"

import { AdminPlatformLegalTemplate } from "@/components/templates/admin-platform-legal-template"

export const metadata: Metadata = { title: "Legal pages" }

export default function AdminLegalPage() {
  return <AdminPlatformLegalTemplate />
}
