import type { Metadata } from "next"

import { SongLibraryTemplate } from "@/components/templates/song-library-template"

export const metadata: Metadata = { title: "Song library" }

export default function SongLibraryPage() {
  return <SongLibraryTemplate />
}
