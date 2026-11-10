"use client"

import * as React from "react"

import {
  INITIAL_ACTIVITY,
  INITIAL_CONTENT,
  INITIAL_SUGGESTIONS,
  JOHN_3,
  SONG_FOLLOW,
  SUGGESTION_TEXT,
} from "@/lib/data/live"
import { TALK_HOURS } from "@/lib/data/plans"
import type { ActivityItem, ScreenContent, Suggestion } from "@/types"

const START_SECONDS = 42 * 60 + 18

function formatClock(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":")
}

function nowLabel() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

/** Mock state for the live console. No backend: everything is local. */
function useLiveConsole() {
  const [listening, setListening] = React.useState(true)
  const [seconds, setSeconds] = React.useState(START_SECONDS)
  const [content, setContent] = React.useState<ScreenContent | null>(
    INITIAL_CONTENT
  )
  const [version, setVersion] = React.useState("KJV")
  const [mode, setMode] = React.useState<"auto" | "manual">("auto")
  const [suggestions, setSuggestions] =
    React.useState<Suggestion[]>(INITIAL_SUGGESTIONS)
  const [activeStanzaId, setActiveStanzaId] = React.useState("s2")
  const [activity, setActivity] =
    React.useState<ActivityItem[]>(INITIAL_ACTIVITY)

  // Session clock only runs while the mic is listening.
  React.useEffect(() => {
    if (!listening) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [listening])

  const present = React.useCallback((next: ScreenContent) => {
    setContent(next)
    setActivity((items) => [
      {
        id: `${Date.now()}`,
        kind: next.kind,
        time: nowLabel(),
        title:
          next.kind === "scripture" && next.version
            ? `${next.title} · ${next.version}`
            : next.title,
        content: next,
      },
      ...items,
    ])
  }, [])

  const showSuggestion = React.useCallback(
    (suggestion: Suggestion) => {
      present({
        kind: "scripture",
        title: suggestion.reference,
        version,
        text: SUGGESTION_TEXT[suggestion.id] ?? "",
      })
      setSuggestions((items) => items.filter((s) => s.id !== suggestion.id))
    },
    [present, version]
  )

  const dismissSuggestion = React.useCallback((id: string) => {
    setSuggestions((items) => items.filter((s) => s.id !== id))
  }, [])

  const selectStanza = React.useCallback(
    (stanzaId: string) => {
      const stanza = SONG_FOLLOW.stanzas.find((s) => s.id === stanzaId)
      if (!stanza) return
      setActiveStanzaId(stanzaId)
      present({
        kind: "song",
        title: `${SONG_FOLLOW.title} · stanza ${stanza.number}`,
        text: stanza.text,
      })
    },
    [present]
  )

  /** Step through John 3 verses; other passages have no neighbours in the mock. */
  const stepVerse = React.useCallback((direction: 1 | -1) => {
    setContent((current) => {
      const match = current?.title.match(/^John 3:(\d+)$/)
      if (!current || !match) return current
      const next = JOHN_3.find((v) => v.verse === Number(match[1]) + direction)
      return next
        ? { ...current, title: `John 3:${next.verse}`, text: next.text }
        : current
    })
  }, [])

  const changeVersion = React.useCallback((next: string) => {
    setVersion(next)
    setContent((current) =>
      current?.kind === "scripture" ? { ...current, version: next } : current
    )
  }, [])

  return {
    listening,
    toggleListening: () => setListening((value) => !value),
    elapsed: formatClock(seconds),
    hoursLeft: `${TALK_HOURS.total - TALK_HOURS.used} h`,
    content,
    version,
    changeVersion,
    mode,
    setMode,
    suggestions,
    showSuggestion,
    dismissSuggestion,
    activeStanzaId,
    selectStanza,
    activity,
    showAgain: (item: ActivityItem) => setContent(item.content),
    previousVerse: () => stepVerse(-1),
    nextVerse: () => stepVerse(1),
    clear: () => setContent(null),
  }
}

export { useLiveConsole }
