import type { Metadata } from "next"

import { AdminUsersTemplate } from "@/components/templates/admin-users-template"

export const metadata: Metadata = { title: "Users" }

export default function AdminUsersPage() {
  return <AdminUsersTemplate />
}
