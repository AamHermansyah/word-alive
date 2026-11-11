import type { Metadata } from "next"

import { AdminBibleTranslationsTemplate } from "@/components/templates/admin-bible-translations-template"

export const metadata: Metadata = { title: "Bible translations" }

export default function AdminBiblePage() {
  return <AdminBibleTranslationsTemplate />
}
