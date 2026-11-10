import type { Metadata } from "next"

import { SettingsTemplate } from "@/components/templates/settings-template"

export const metadata: Metadata = { title: "Settings" }

export default function SettingsPage() {
  return <SettingsTemplate />
}
