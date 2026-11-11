"use client"

import * as React from "react"

/**
 * For a list with a detail card beside it: on screens where the card sits
 * below the list (under `lg`), picking a row scrolls the card into view, so
 * the choice visibly does something.
 */
export function useAdminRevealDetail() {
  const ref = React.useRef<HTMLDivElement>(null)

  const reveal = React.useCallback(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    ref.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    })
  }, [])

  return { ref, reveal }
}
