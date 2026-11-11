import type { Metadata } from "next"

import { AdminPlatformTeamTemplate } from "@/components/templates/admin-platform-team-template"

export const metadata: Metadata = { title: "Admin team" }

export default function AdminTeamPage() {
  return <AdminPlatformTeamTemplate />
}
