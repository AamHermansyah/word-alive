import type { Metadata } from "next"

import { AdminTwoFactorTemplate } from "@/components/templates/admin-two-factor-template"

export const metadata: Metadata = { title: "Authenticator setup" }

export default function AdminTwoFactorPage() {
  return <AdminTwoFactorTemplate />
}
