import type { Metadata } from "next"

import { AdminPlatformSeoTemplate } from "@/components/templates/admin-platform-seo-template"

export const metadata: Metadata = { title: "Landing SEO" }

export default function AdminSeoPage() {
  return <AdminPlatformSeoTemplate />
}
