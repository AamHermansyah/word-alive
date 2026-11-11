import type { Metadata } from "next"

import { AdminPaymentsTemplate } from "@/components/templates/admin-payments-template"
import { ADMIN_OVERRIDE_REFERENCE } from "@/lib/data/admin-customers"

export const metadata: Metadata = { title: "Payment override" }

export default function AdminPaymentOverridePage() {
  return <AdminPaymentsTemplate overrideRef={ADMIN_OVERRIDE_REFERENCE} />
}
