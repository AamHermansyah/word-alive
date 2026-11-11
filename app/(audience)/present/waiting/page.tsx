import type { Metadata } from "next"

import { WaitingScreenTemplate } from "@/components/templates/waiting-screen-template"
import { PROJECTOR_WAITING } from "@/lib/data/console"

export const metadata: Metadata = { title: "Audience screen: waiting" }

export default function PresentWaitingPage() {
  return <WaitingScreenTemplate {...PROJECTOR_WAITING} />
}
