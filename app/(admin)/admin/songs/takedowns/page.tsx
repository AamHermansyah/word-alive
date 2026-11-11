import type { Metadata } from "next"

import { AdminSongCatalogueTemplate } from "@/components/templates/admin-song-catalogue-template"

export const metadata: Metadata = { title: "Takedown requests" }

export default function AdminTakedownsPage() {
  return <AdminSongCatalogueTemplate tab="takedowns" />
}
