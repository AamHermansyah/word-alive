import type { Metadata } from "next"

import { AccountStatusTemplate } from "@/components/templates/account-status-template"

export const metadata: Metadata = { title: "Account status" }

export default function AccountStatusPage() {
  return <AccountStatusTemplate />
}
