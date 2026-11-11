import {
  COVERAGE_HISTORY,
  INITIAL_BIBLE_IMPORT,
  INITIAL_BIBLE_SOURCE,
  INITIAL_BIBLE_TRANSLATIONS,
  INITIAL_CATALOGUE_SONGS,
  INITIAL_COVERAGE,
  INITIAL_PRICING,
  INITIAL_TAKEDOWNS,
  PRICING_HISTORY,
} from "@/lib/data/admin-catalogue"
import type {
  AdminBibleImportReport,
  AdminBibleSourceSettings,
  AdminBibleTranslation,
  AdminChangeEntry,
  AdminPricingValues,
  CatalogueSong,
  CoverageMatrix,
  TakedownRequest,
} from "@/types/admin-catalogue"

/**
 * A tiny external store. The admin catalogue pages have no backend, but a
 * change made on one page (a song approved, a plan's limits saved) has to be
 * visible on the next page the admin opens, so "saved" values live here, at
 * module level, for as long as the browser tab stays open. Forms keep their
 * unsaved draft in component state and write to the store on "Save changes".
 *
 * The server only ever reads `initial`; every write comes from an event
 * handler in the browser.
 */
export type AdminCatalogueStore<T> = {
  readonly initial: T
  get: () => T
  set: (next: T | ((current: T) => T)) => void
  subscribe: (listener: () => void) => () => void
}

export function createAdminCatalogueStore<T>(
  initial: T
): AdminCatalogueStore<T> {
  let state = initial
  const listeners = new Set<() => void>()

  return {
    initial,
    get: () => state,
    set(next) {
      state =
        typeof next === "function" ? (next as (current: T) => T)(state) : next
      listeners.forEach((listener) => listener())
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

export const pricingStore = createAdminCatalogueStore<{
  values: AdminPricingValues
  history: AdminChangeEntry[]
}>({ values: INITIAL_PRICING, history: PRICING_HISTORY })

export const coverageStore = createAdminCatalogueStore<{
  matrix: CoverageMatrix
  history: AdminChangeEntry[]
}>({ matrix: INITIAL_COVERAGE, history: COVERAGE_HISTORY })

export const bibleTranslationsStore = createAdminCatalogueStore<{
  versions: AdminBibleTranslation[]
  lastImport: AdminBibleImportReport
}>({ versions: INITIAL_BIBLE_TRANSLATIONS, lastImport: INITIAL_BIBLE_IMPORT })

export const bibleSourceStore = createAdminCatalogueStore<{
  settings: AdminBibleSourceSettings
  /** Checklist facts that a test run changes. */
  connectionPassed: boolean
  passagesPassed: boolean
}>({
  settings: INITIAL_BIBLE_SOURCE,
  connectionPassed: true,
  passagesPassed: true,
})

export const songCatalogueStore = createAdminCatalogueStore<{
  songs: CatalogueSong[]
  takedowns: TakedownRequest[]
}>({ songs: INITIAL_CATALOGUE_SONGS, takedowns: INITIAL_TAKEDOWNS })
