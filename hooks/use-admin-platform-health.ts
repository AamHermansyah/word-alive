"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  HEALTH_CHECKED_AT,
  HEALTH_POLLS,
  HEALTH_TILES,
  LATENCY_SERIES,
} from "@/lib/data/admin-platform"
import type { HealthSnapshot, HealthTile } from "@/types/admin-platform"

/** How long a poll "takes". */
const POLL_MS = 900

function applySnapshot(tiles: HealthTile[], snapshot: HealthSnapshot): HealthTile[] {
  return tiles.map((tile) => {
    if (tile.id === "connections") {
      return { ...tile, detail: `${snapshot.connections} open` }
    }
    const next = snapshot.tiles[tile.id]
    return next ? { ...tile, ...next } : tile
  })
}

/** System health: the tiles, the latency series and a Refresh that re-polls. */
function useAdminPlatformHealth() {
  const [tiles, setTiles] = React.useState(HEALTH_TILES)
  const [series, setSeries] = React.useState(LATENCY_SERIES)
  const [checkedAt, setCheckedAt] = React.useState(HEALTH_CHECKED_AT)
  const [refreshing, setRefreshing] = React.useState(false)
  const polls = React.useRef(0)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  function refresh() {
    if (refreshing) return
    setRefreshing(true)

    timer.current = setTimeout(() => {
      const snapshot = HEALTH_POLLS[polls.current % HEALTH_POLLS.length]
      polls.current += 1

      const time = new Date().toLocaleTimeString("en-GB", { hour12: false })
      setTiles((current) => applySnapshot(current, snapshot))
      setSeries((current) =>
        current.map((point, index) =>
          index === current.length - 1
            ? { ...point, scripture: snapshot.scriptureMs, lyrics: snapshot.lyricsMs }
            : point
        )
      )
      setCheckedAt(time)
      setRefreshing(false)
      toast.success("Status refreshed", { description: `Checked at ${time}` })
    }, POLL_MS)
  }

  return { tiles, series, checkedAt, refreshing, refresh }
}

export { useAdminPlatformHealth }
