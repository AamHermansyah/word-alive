import type { Metadata } from "next"

import { BillingTemplate } from "@/components/templates/billing-template"

export const metadata: Metadata = { title: "Billing and receipts" }

export default function BillingPage() {
  return <BillingTemplate />
}
