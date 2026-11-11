import type { Metadata } from "next"

import { LegalPageTemplate } from "@/components/templates/legal-page-template"
import { REFUND_POLICY } from "@/lib/data/legal"

export const metadata: Metadata = { title: REFUND_POLICY.title }

export default function RefundPage() {
  return <LegalPageTemplate legal={REFUND_POLICY} />
}
