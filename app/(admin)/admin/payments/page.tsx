import type { Metadata } from "next"

import { AdminPaymentsTemplate } from "@/components/templates/admin-payments-template"

export const metadata: Metadata = { title: "Payments" }

export default function AdminPaymentsPage() {
  return <AdminPaymentsTemplate />
}
