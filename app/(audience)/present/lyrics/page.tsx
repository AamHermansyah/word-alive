import type { Metadata } from "next"

import { LyricsScreenTemplate } from "@/components/templates/lyrics-screen-template"
import { PROJECTOR_LYRICS } from "@/lib/data/console"

export const metadata: Metadata = { title: "Audience screen: lyrics" }

export default function PresentLyricsPage() {
  return <LyricsScreenTemplate slide={PROJECTOR_LYRICS} />
}
