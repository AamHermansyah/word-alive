import type { Metadata } from "next"

import { AudienceLinkTemplate } from "@/components/templates/audience-link-template"

export const metadata: Metadata = { title: "Audience link" }

export default function AudienceLinkPage() {
  return <AudienceLinkTemplate />
}
