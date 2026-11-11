import type { Metadata } from "next"

import { AdminSupportTemplate } from "@/components/templates/admin-support-template"

export const metadata: Metadata = { title: "Support inbox" }

export default function AdminSupportPage() {
  return <AdminSupportTemplate />
}
