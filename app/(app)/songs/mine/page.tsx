import type { Metadata } from "next"

import { MySongsTemplate } from "@/components/templates/my-songs-template"

export const metadata: Metadata = { title: "My songs" }

export default function MySongsPage() {
  return <MySongsTemplate />
}
