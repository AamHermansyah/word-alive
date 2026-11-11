import type { Metadata } from "next"

import { SwitchUnavailableTemplate } from "@/components/templates/switch-unavailable-template"

export const metadata: Metadata = { title: "Switch not available" }

export default function SwitchUnavailablePage() {
  return <SwitchUnavailableTemplate />
}
