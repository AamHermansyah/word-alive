import type { Metadata } from "next"

import { SwitchDeviceTemplate } from "@/components/templates/switch-device-template"

export const metadata: Metadata = { title: "Switch device" }

export default function SwitchDevicePage() {
  return <SwitchDeviceTemplate />
}
