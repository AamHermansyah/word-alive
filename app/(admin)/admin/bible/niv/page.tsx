import type { Metadata } from "next"

import { AdminBibleSourceTemplate } from "@/components/templates/admin-bible-source-template"

export const metadata: Metadata = { title: "Bible source (API)" }

export default function AdminBibleSourcePage() {
  return <AdminBibleSourceTemplate />
}
