"use client"

import * as React from "react"

const WIDE_QUERY = "(min-width: 80rem)"

function subscribeToWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/**
 * True from the `xl` breakpoint (1280px), where the admin list pages show the
 * detail panel next to the table. Below it the same panel opens in a Sheet.
 * Server and first client render report `false`, so nothing mismatches.
 */
function useAdminCustomersWideScreen() {
  return React.useSyncExternalStore(
    subscribeToWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false
  )
}

/**
 * Flips to `true` one frame after mount, so bars can start empty and grow to
 * their value through a normal CSS transition. Remount (change the `key` of
 * the component that calls this) to replay the growth.
 */
function useAdminCustomersGrowIn() {
  const [grown, setGrown] = React.useState(false)

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setGrown(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return grown
}

export { useAdminCustomersGrowIn, useAdminCustomersWideScreen }
