import type { Metadata } from "next"

import { SetupTemplate } from "@/components/templates/setup-template"

export const metadata: Metadata = { title: "Set up WordAlive" }

export default function SetupPage() {
  return <SetupTemplate />
}
