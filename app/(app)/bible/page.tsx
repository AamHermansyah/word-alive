import type { Metadata } from "next"

import { BibleVersionsTemplate } from "@/components/templates/bible-versions-template"

export const metadata: Metadata = { title: "Bible versions" }

export default function BibleVersionsPage() {
  return <BibleVersionsTemplate />
}
