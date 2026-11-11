"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  applyLimitsToPricing,
  countByTier,
  coverageBadge,
  coverageLimitId,
  coverageHistoryEntry,
  limitsFromPricing,
  type CoverageLimit,
} from "@/lib/admin-catalogue-coverage"
import { pricingHistoryEntry } from "@/lib/admin-catalogue-pricing"
import { coverageStore, pricingStore } from "@/lib/admin-catalogue-store"
import {
  parseVersionLimit,
  validateAdminNumber,
} from "@/lib/admin-catalogue-validation"
import {
  COVERAGE_PREVIEW_COUNT,
  COVERAGE_TIERS,
  COVERAGE_VERSIONS,
} from "@/lib/data/admin-catalogue"
import { CURRENT_ADMIN } from "@/lib/data/navigation"
import type { CoverageMatrix, CoverageTierId } from "@/types/admin-catalogue"

import { useAdminCatalogueStore } from "./use-admin-catalogue-store"

/**
 * State of the Coverage page: which Bible versions each plan includes and the
 * plan limits. Turning a version on past a plan's limit is refused with a
 * toast, locked versions cannot be turned on at all, and the counts in the
 * summary cards follow every click.
 */
export function useAdminCoverage() {
  const { matrix: savedMatrix, history } = useAdminCatalogueStore(coverageStore)
  const { values: pricing } = useAdminCatalogueStore(pricingStore)
  const savedLimits = React.useMemo(() => limitsFromPricing(pricing), [pricing])

  const [matrix, setMatrix] = React.useState<CoverageMatrix>(savedMatrix)
  const [limits, setLimits] = React.useState(savedLimits)
  const [showAll, setShowAll] = React.useState(false)
  const [touched, setTouched] = React.useState<ReadonlySet<string>>(new Set())
  const [submitted, setSubmitted] = React.useState(false)

  const counts = React.useMemo(
    () => countByTier(COVERAGE_VERSIONS, matrix),
    [matrix]
  )

  const tiers = COVERAGE_TIERS.map((tier) => {
    const limit = limits[tier.id]
    const badge = coverageBadge(tier.id, counts[tier.id], limit.versions)
    return { ...tier, limit, count: counts[tier.id], badge }
  })

  /**
   * Every message that blocks saving, keyed by the id of its input. Format
   * errors wait until the field was left; "too many versions" is shown at once,
   * because the click that caused it is what the admin is looking at.
   */
  const { errors, overLimit } = React.useMemo(() => {
    const found: Record<string, string> = {}
    const over: Record<string, string> = {}
    for (const tier of COVERAGE_TIERS) {
      const { hours, versions } = limits[tier.id]
      const hoursError = validateAdminNumber(hours)
      const versionsError = validateAdminNumber(versions, {
        integer: true,
        allowAll: true,
      })
      if (hoursError) found[coverageLimitId(tier.id, "hours")] = hoursError
      if (versionsError) {
        found[coverageLimitId(tier.id, "versions")] = versionsError
      } else if (counts[tier.id] > parseVersionLimit(versions)) {
        const extra = counts[tier.id] - parseVersionLimit(versions)
        over[coverageLimitId(tier.id, "versions")] =
          `Turn off ${extra} ${extra === 1 ? "version" : "versions"} or raise the limit`
      }
    }
    return { errors: { ...found, ...over }, overLimit: over }
  }, [limits, counts])

  const dirty = React.useMemo(
    () =>
      JSON.stringify(matrix) !== JSON.stringify(savedMatrix) ||
      JSON.stringify(limits) !== JSON.stringify(savedLimits),
    [matrix, savedMatrix, limits, savedLimits]
  )

  const errorFor = (id: string) =>
    overLimit[id] ?? (submitted || touched.has(id) ? errors[id] : undefined)

  const touch = (id: string) =>
    setTouched((current) => new Set(current).add(id))

  function setLimit(
    tier: CoverageTierId,
    key: keyof CoverageLimit,
    value: string
  ) {
    setLimits((current) => ({
      ...current,
      [tier]: { ...current[tier], [key]: value },
    }))
  }

  function toggle(code: string, tier: CoverageTierId, on: boolean) {
    const version = COVERAGE_VERSIONS.find((entry) => entry.code === code)
    if (!version || version.licence === "missing") return

    if (on) {
      const limit = parseVersionLimit(limits[tier].versions)
      if (counts[tier] >= limit) {
        const name = COVERAGE_TIERS.find((entry) => entry.id === tier)?.name
        toast.error(
          `${name} allows ${limit} Bible ${limit === 1 ? "version" : "versions"}`,
          {
            description:
              "Raise “Versions allowed” or turn another version off first.",
          }
        )
        return
      }
    }

    setMatrix((current) => ({
      ...current,
      [code]: { ...current[code], [tier]: on },
    }))
  }

  function save() {
    setSubmitted(true)
    const [firstInvalid] = Object.keys(errors)
    if (firstInvalid) {
      const count = Object.keys(errors).length
      toast.error("Coverage can't be saved yet", {
        description: `${count} ${count === 1 ? "limit needs" : "limits need"} fixing.`,
      })
      document.getElementById(firstInvalid)?.focus()
      return
    }

    const entry = coverageHistoryEntry(
      CURRENT_ADMIN.name,
      COVERAGE_VERSIONS,
      { matrix: savedMatrix, limits: savedLimits },
      { matrix, limits }
    )
    coverageStore.set((current) => ({
      matrix,
      history: entry ? [entry, ...current.history] : current.history,
    }))

    // The limits are the pricing page's values: keep both pages in step.
    pricingStore.set((current) => {
      const values = applyLimitsToPricing(current.values, limits)
      const pricingEntry = pricingHistoryEntry(
        CURRENT_ADMIN.name,
        current.values,
        values
      )
      return {
        values,
        history: pricingEntry
          ? [pricingEntry, ...current.history]
          : current.history,
      }
    })

    setSubmitted(false)
    setTouched(new Set())
    toast.success("Coverage saved", {
      description: "Plans offer these Bible versions from the next sign-in.",
    })
  }

  const visibleVersions = showAll
    ? COVERAGE_VERSIONS
    : COVERAGE_VERSIONS.slice(0, COVERAGE_PREVIEW_COUNT)

  return {
    tiers,
    matrix,
    versions: COVERAGE_VERSIONS,
    visibleVersions,
    hiddenCount: COVERAGE_VERSIONS.length - visibleVersions.length,
    showAll,
    toggleShowAll: () => setShowAll((current) => !current),
    dirty,
    history,
    errorFor,
    touch,
    setLimit,
    toggle,
    save,
  }
}
