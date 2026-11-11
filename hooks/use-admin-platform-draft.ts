"use client"

import * as React from "react"

/**
 * Form state with a "last saved" snapshot, so a page can tell when it has
 * unsaved changes. Values are treated as immutable: update them with `patch`
 * or `setValues`, never in place.
 */
function useAdminPlatformDraft<T extends object>(initial: T) {
  const [values, setValues] = React.useState<T>(initial)
  const [saved, setSaved] = React.useState<T>(initial)

  const dirty = React.useMemo(
    () => JSON.stringify(values) !== JSON.stringify(saved),
    [values, saved]
  )

  const patch = React.useCallback((next: Partial<T>) => {
    setValues((current) => ({ ...current, ...next }))
  }, [])

  /** Makes `next` (default: the current values) the saved state. */
  const commit = React.useCallback(
    (next?: T) => {
      const target = next ?? values
      setValues(target)
      setSaved(target)
    },
    [values]
  )

  return { values, saved, dirty, setValues, patch, commit }
}

export { useAdminPlatformDraft }
