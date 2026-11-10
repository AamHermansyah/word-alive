import type { Metadata } from "next"

import { LiveConsoleTemplate } from "@/components/templates/live-console-template"

export const metadata: Metadata = { title: "Live console" }

export default function LiveConsolePage() {
  return <LiveConsoleTemplate />
}
