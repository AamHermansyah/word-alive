"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

/**
 * Pretends the server needs a moment (sending a code, checking it), then
 * navigates. `pending` drives the disabled / "Sending…" state of the button.
 * The timer is cleared if the page goes away first.
 */
function useDelayedNavigation(delayMs = 700) {
  const router = useRouter()
  const [pending, setPending] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const go = React.useCallback(
    (href: string) => {
      clearTimeout(timer.current)
      setPending(true)
      timer.current = setTimeout(() => router.push(href), delayMs)
    },
    [router, delayMs]
  )

  return { pending, go }
}

export { useDelayedNavigation }
