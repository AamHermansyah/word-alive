import type { Metadata } from "next"

import { AdminPlatformAiTemplate } from "@/components/templates/admin-platform-ai-template"

export const metadata: Metadata = { title: "AI providers" }

export default function AdminAiPage() {
  return <AdminPlatformAiTemplate />
}
