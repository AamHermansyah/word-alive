import type { Metadata } from "next"

import { AdminPlatformAuditTemplate } from "@/components/templates/admin-platform-audit-template"

export const metadata: Metadata = { title: "Audit log" }

export default function AdminAuditPage() {
  return <AdminPlatformAuditTemplate />
}
