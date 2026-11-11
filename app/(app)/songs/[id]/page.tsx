import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SongDetailTemplate } from "@/components/templates/song-detail-template"
import { getSongDetail } from "@/lib/data/account"
import { SONGS } from "@/lib/data/songs"

type SongPageProps = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return SONGS.map((song) => ({ id: song.id }))
}

export async function generateMetadata({
  params,
}: SongPageProps): Promise<Metadata> {
  const { id } = await params
  const detail = getSongDetail(id)
  return { title: detail ? detail.song.title : "Song not found" }
}

export default async function SongDetailPage({ params }: SongPageProps) {
  const { id } = await params
  const detail = getSongDetail(id)
  if (!detail) notFound()

  return <SongDetailTemplate song={detail.song} lyrics={detail.lyrics} />
}
