"use client"

import * as React from "react"

/**
 * Payments an admin marked as verified, kept for the browser session so the
 * result is still there after the override page sends you back to the list.
 * A tiny external store (sessionStorage with an in-memory fallback), read with
 * useSyncExternalStore so server render and hydration both start from "none".
 */
const STORAGE_KEY = "wa-admin-overridden-payments"
const EMPTY: readonly string[] = []

let overridden: readonly string[] | null = null
const listeners = new Set<() => void>()

function load(): readonly string[] {
  if (overridden) return overridden
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    const parsed: unknown = stored ? JSON.parse(stored) : []
    overridden = Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : EMPTY
  } catch {
    overridden = EMPTY
  }
  return overridden
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function markVerified(reference: string) {
  const next = [...new Set([...load(), reference])]
  overridden = next
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage blocked: the in-memory copy still serves this session.
  }
  listeners.forEach((listener) => listener())
}

function useAdminCustomersOverrides() {
  const references = React.useSyncExternalStore(subscribe, load, () => EMPTY)
  return { references, markVerified }
}

export { useAdminCustomersOverrides }
