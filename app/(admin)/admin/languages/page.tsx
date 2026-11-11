import type { Metadata } from "next"

import { AdminPlatformLanguagesTemplate } from "@/components/templates/admin-platform-languages-template"

export const metadata: Metadata = { title: "Languages" }

export default function AdminLanguagesPage() {
  return <AdminPlatformLanguagesTemplate />
}
