import type { Metadata } from "next"

import { ConsoleFirstRunTemplate } from "@/components/templates/console-first-run-template"

export const metadata: Metadata = { title: "Console: first run and microphone" }

export default function ConsoleFirstRunPage() {
  return <ConsoleFirstRunTemplate />
}
