import type { Metadata } from "next"

import { AccountDataTemplate } from "@/components/templates/account-data-template"

export const metadata: Metadata = { title: "Export and delete data" }

export default function AccountDataPage() {
  return <AccountDataTemplate />
}
