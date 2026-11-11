import type { Metadata } from "next"

import { LegalPageTemplate } from "@/components/templates/legal-page-template"
import { TERMS_OF_SERVICE } from "@/lib/data/legal"

export const metadata: Metadata = { title: TERMS_OF_SERVICE.title }

export default function TermsPage() {
  return <LegalPageTemplate legal={TERMS_OF_SERVICE} />
}
