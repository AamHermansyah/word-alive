import type { Metadata } from "next"

import { AdminPricingTemplate } from "@/components/templates/admin-pricing-template"

export const metadata: Metadata = { title: "Plans and pricing" }

export default function AdminPricingPage() {
  return <AdminPricingTemplate />
}
