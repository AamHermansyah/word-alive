"use client"

import * as React from "react"

import { DEMO_PROFILE } from "@/lib/data/onboarding"
import type { OnboardingProfile } from "@/types/onboarding"

/**
 * The details typed on the sign-in and set-up pages, kept in sessionStorage so
 * the next steps (confirm email, trial started, switch device) can show them.
 * Server render and first client render use the mockup's details, so there is
 * no hydration mismatch; the stored values appear right after.
 */
const STORAGE_KEY = "wa-onboarding"
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function readRaw() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? ""
  } catch {
    return ""
  }
}

function parse(raw: string): Partial<OnboardingProfile> {
  if (!raw) return {}
  try {
    const value: unknown = JSON.parse(raw)
    return value && typeof value === "object" ? value : {}
  } catch {
    return {}
  }
}

/** Remember (part of) the profile for the following steps. */
function saveOnboardingProfile(patch: Partial<OnboardingProfile>) {
  try {
    const next = { ...parse(readRaw()), ...patch }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage can be blocked (private window); the steps fall back to defaults.
  }
  listeners.forEach((listener) => listener())
}

function useOnboardingProfile(): OnboardingProfile {
  const raw = React.useSyncExternalStore(subscribe, readRaw, () => "")
  return React.useMemo(() => ({ ...DEMO_PROFILE, ...parse(raw) }), [raw])
}

export { saveOnboardingProfile, useOnboardingProfile }
