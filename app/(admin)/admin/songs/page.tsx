import type { Metadata } from "next"

import { AdminSongCatalogueTemplate } from "@/components/templates/admin-song-catalogue-template"

export const metadata: Metadata = { title: "Song catalogue" }

export default async function AdminSongsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>
}) {
  const { tab } = await searchParams
  return <AdminSongCatalogueTemplate tab={tab === "all" ? "all" : "review"} />
}
