import type { Metadata } from "next"

import { AdminLoginTemplate } from "@/components/templates/admin-login-template"

export const metadata: Metadata = { title: "Admin login" }

export default function AdminLoginPage() {
  return <AdminLoginTemplate />
}
