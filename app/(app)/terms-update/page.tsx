import type { Metadata } from "next"

import { TermsUpdateTemplate } from "@/components/templates/terms-update-template"

export const metadata: Metadata = { title: "Terms update" }

export default function TermsUpdatePage() {
  return <TermsUpdateTemplate />
}
