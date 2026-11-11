import { parseVersionLimit } from "@/lib/admin-catalogue-validation"
import { COVERAGE_TIERS } from "@/lib/data/admin-catalogue"
import type {
  AdminChangeEntry,
  AdminPricingValues,
  CoverageMatrix,
  CoverageTierId,
  CoverageVersion,
} from "@/types/admin-catalogue"

/** Text of the two limit inputs of one tier. */
export type CoverageLimit = { hours: string; versions: string }
export type CoverageLimits = Record<CoverageTierId, CoverageLimit>

/** DOM id of one limit input ("coverage-starter-hours"). */
export function coverageLimitId(
  tier: CoverageTierId,
  key: keyof CoverageLimit
) {
  return `coverage-${tier}-${key}`
}

/** The hours and Bible-version limits of every tier, as the pricing page saved them. */
export function limitsFromPricing(values: AdminPricingValues): CoverageLimits {
  const { starter, growth, ministry } = values.tiers
  const pick = (tier: { talkHours: string; bibleVersions: string }) => ({
    hours: tier.talkHours,
    versions: tier.bibleVersions,
  })
  return {
    starter: pick(starter),
    growth: pick(growth),
    ministry: pick(ministry),
    trial: {
      hours: values.trial.talkHours,
      versions: values.trial.bibleVersions,
    },
  }
}

/** Write edited limits back into the pricing values (the one source of truth). */
export function applyLimitsToPricing(
  values: AdminPricingValues,
  limits: CoverageLimits
): AdminPricingValues {
  const tier = (id: "starter" | "growth" | "ministry") => ({
    ...values.tiers[id],
    talkHours: limits[id].hours,
    bibleVersions: limits[id].versions,
  })
  return {
    ...values,
    tiers: {
      starter: tier("starter"),
      growth: tier("growth"),
      ministry: tier("ministry"),
    },
    trial: {
      ...values.trial,
      talkHours: limits.trial.hours,
      bibleVersions: limits.trial.versions,
    },
  }
}

/** How many versions each tier includes right now. */
export function countByTier(
  versions: CoverageVersion[],
  matrix: CoverageMatrix
): Record<CoverageTierId, number> {
  const counts = { starter: 0, growth: 0, ministry: 0, trial: 0 }
  for (const version of versions) {
    for (const tier of COVERAGE_TIERS) {
      if (matrix[version.code]?.[tier.id]) counts[tier.id] += 1
    }
  }
  return counts
}

/** "5 of 5 selected", "7 selected" (unlimited) and the colour of the pill. */
export function coverageBadge(
  tier: CoverageTierId,
  count: number,
  versionsLimit: string
): { label: string; variant: "success" | "info" | "warning" } {
  const limit = parseVersionLimit(versionsLimit)
  if (!Number.isFinite(limit))
    return { label: `${count} selected`, variant: "info" }

  const label = `${count} of ${limit} selected`
  if (count > limit) return { label, variant: "warning" }
  // A full paid plan reads as done; the trial is a fixed allowance, so it stays neutral.
  if (count === limit && tier !== "trial") return { label, variant: "success" }
  return { label, variant: "info" }
}

function joinNames(names: string[]) {
  return names.join(", ")
}

/** A history entry describing what changed in the matrix and in the limits. */
export function coverageHistoryEntry(
  who: string,
  versions: CoverageVersion[],
  before: { matrix: CoverageMatrix; limits: CoverageLimits },
  after: { matrix: CoverageMatrix; limits: CoverageLimits }
): AdminChangeEntry | null {
  const changes: string[] = []
  let versionsChanged = 0

  for (const version of versions) {
    const added: string[] = []
    const removed: string[] = []
    for (const tier of COVERAGE_TIERS) {
      const was = before.matrix[version.code]?.[tier.id] ?? false
      const now = after.matrix[version.code]?.[tier.id] ?? false
      if (!was && now) added.push(tier.name)
      if (was && !now) removed.push(tier.name)
    }
    if (added.length)
      changes.push(`${version.code}: added to ${joinNames(added)}`)
    if (removed.length)
      changes.push(`${version.code}: removed from ${joinNames(removed)}`)
    if (added.length || removed.length) versionsChanged += 1
  }

  let limitsChanged = 0
  for (const tier of COVERAGE_TIERS) {
    const was = before.limits[tier.id]
    const now = after.limits[tier.id]
    if (was.hours !== now.hours) {
      changes.push(`${tier.name} · Hours / month: ${was.hours} → ${now.hours}`)
      limitsChanged += 1
    }
    if (was.versions !== now.versions) {
      changes.push(
        `${tier.name} · Versions allowed: ${was.versions} → ${now.versions}`
      )
      limitsChanged += 1
    }
  }

  if (changes.length === 0) return null

  const parts: string[] = []
  if (versionsChanged) {
    parts.push(
      `${versionsChanged} ${versionsChanged === 1 ? "version" : "versions"}`
    )
  }
  if (limitsChanged) parts.push("limits")

  return {
    id: `coverage-${Date.now()}`,
    who,
    when: "Just now",
    headline: parts.join(" and "),
    changes,
  }
}
