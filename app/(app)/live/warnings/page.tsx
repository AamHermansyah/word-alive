import type { Metadata } from "next"

import { ConsoleWarningsTemplate } from "@/components/templates/console-warnings-template"

export const metadata: Metadata = {
  title: "Console: warnings and degraded modes",
}

export default function ConsoleWarningsPage() {
  return <ConsoleWarningsTemplate />
}
