"use client"

import * as React from "react"

import type { AdminCatalogueStore } from "@/lib/admin-catalogue-store"

/**
 * Subscribe a component to one of the admin catalogue stores. The server (and
 * the hydration pass) render the store's initial value, so there is never a
 * mismatch; after that the component follows the live value.
 */
export function useAdminCatalogueStore<T>(store: AdminCatalogueStore<T>): T {
  return React.useSyncExternalStore(
    store.subscribe,
    store.get,
    () => store.initial
  )
}
