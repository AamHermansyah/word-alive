"use client"

import * as React from "react"
import { DirectionProvider as BaseDirectionProvider } from "@base-ui/react/direction-provider"
import { DIRECTION_COOKIE, type Direction } from "@/lib/direction"

type DirectionContextValue = {
  direction: Direction
  setDirection: (direction: Direction) => void
}

const DirectionContext = React.createContext<DirectionContextValue | null>(null)

/**
 * Owns the reading direction of the whole app.
 *
 * - The initial value comes from a cookie read on the server, so the very
 *   first paint already has the right `<html dir>`.
 * - Changing it updates `<html dir>` immediately and persists to the cookie.
 * - Base UI primitives (menus, select, toggle groups…) are told about the
 *   direction through their own provider so keyboard nav / popups mirror too.
 */
function DirectionProvider({
  initialDirection,
  children,
}: {
  initialDirection: Direction
  children: React.ReactNode
}) {
  const [direction, setDirectionState] =
    React.useState<Direction>(initialDirection)

  const setDirection = React.useCallback((next: Direction) => {
    setDirectionState(next)
    document.documentElement.dir = next
    document.cookie = `${DIRECTION_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
  }, [])

  const value = React.useMemo(
    () => ({ direction, setDirection }),
    [direction, setDirection]
  )

  return (
    <DirectionContext.Provider value={value}>
      <BaseDirectionProvider direction={direction}>
        {children}
      </BaseDirectionProvider>
    </DirectionContext.Provider>
  )
}

function useDirection() {
  const context = React.useContext(DirectionContext)

  if (!context) {
    throw new Error("useDirection must be used inside <DirectionProvider>")
  }

  return context
}

export { DirectionProvider, useDirection }
export type { Direction }
