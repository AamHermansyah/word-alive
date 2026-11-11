import type { Metadata } from "next"

import { ScriptureScreenTemplate } from "@/components/templates/scripture-screen-template"
import { PROJECTOR_SCRIPTURE } from "@/lib/data/console"

export const metadata: Metadata = { title: "Audience screen: scripture" }

export default function PresentScripturePage() {
  return <ScriptureScreenTemplate slide={PROJECTOR_SCRIPTURE} />
}
