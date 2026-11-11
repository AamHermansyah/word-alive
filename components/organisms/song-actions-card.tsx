"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"

import { AccountDetailRow } from "@/components/molecules/account-detail-row"
import { SongReportForm } from "@/components/organisms/song-report-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SONG_SOURCE_LABEL } from "@/lib/data/account"
import { cn } from "@/lib/utils"
import type { Song } from "@/types"

/**
 * The song's facts, the two things you do with it (keep it in your set, show
 * it on the audience screen) and the "Report a problem" form.
 */
function SongActionsCard({
  song,
  className,
}: {
  song: Song
  className?: string
}) {
  const [inSet, setInSet] = React.useState(Boolean(song.inSet))

  function toggleSet() {
    const next = !inSet
    setInSet(next)
    toast(next ? "Added to your set" : "Removed from your set", {
      description: song.title,
    })
  }

  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent>
        <dl>
          <AccountDetailRow label="Language">{song.language}</AccountDetailRow>
          <AccountDetailRow label="Source">
            {SONG_SOURCE_LABEL[song.rights]}
          </AccountDetailRow>
          <AccountDetailRow label="Used by">
            <bdi>{song.usedBy}</bdi>
          </AccountDetailRow>
        </dl>

        <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
          <Button
            variant="outline"
            aria-pressed={inSet}
            onClick={toggleSet}
            className="h-auto min-h-10 whitespace-normal"
          >
            {inSet ? "In your set" : "Add to your set"}
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/live" />}
            className="h-auto min-h-10 whitespace-normal"
          >
            Show on screen
          </Button>
        </div>

        <SongReportForm
          songTitle={song.title}
          className="mt-4 border-t border-border pt-3.5"
        />
      </CardContent>
    </Card>
  )
}

export { SongActionsCard }
