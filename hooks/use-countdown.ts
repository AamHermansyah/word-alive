"use client"

import * as React from "react"

/**
 * Counts `initial` units down to zero, one unit per `unitMs` (seconds by
 * default; the emergency-switch wait counts minutes). `restart` starts over,
 * for a "Resend code" button.
 *
 * The remaining time is worked out from a deadline, not by counting ticks, so
 * it stays right when the tab is in the background and the browser slows the
 * timers down.
 */
function useCountdown(initial: number, unitMs = 1000) {
  const [remaining, setRemaining] = React.useState(initial)
  const [round, setRound] = React.useState(0)

  React.useEffect(() => {
    const deadline = Date.now() + initial * unitMs
    const timer = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / unitMs))
      setRemaining(left)
      if (left === 0) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [initial, unitMs, round])

  const restart = React.useCallback(() => {
    setRemaining(initial)
    setRound((value) => value + 1)
  }, [initial])

  return { remaining, done: remaining <= 0, restart }
}

export { useCountdown }
