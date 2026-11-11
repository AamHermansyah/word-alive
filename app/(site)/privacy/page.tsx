import type { Metadata } from "next"

import { LegalPageTemplate } from "@/components/templates/legal-page-template"
import { PRIVACY_POLICY } from "@/lib/data/legal"

export const metadata: Metadata = { title: PRIVACY_POLICY.title }

export default function PrivacyPage() {
  return <LegalPageTemplate legal={PRIVACY_POLICY} />
}
