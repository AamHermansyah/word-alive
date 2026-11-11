/**
 * Types for the admin "catalogue" pages: plans and pricing, coverage, Bible
 * translations (and the Bible source), the song catalogue and takedowns.
 */

// ---- shared ---------------------------------------------------------------

/** One line of a change history ("Ada O. · Oct 28 · Starter monthly price …"). */
export type AdminChangeEntry = {
  id: string
  who: string
  /** Printed as is: "Oct 28" or "Just now". */
  when: string
  /** What the history sheet prints as the entry's headline. */
  headline: string
  /** One bullet per changed field ("Monthly price: 24.99 → 29.99"). */
  changes: string[]
}

// ---- plans and pricing -----------------------------------------------------

export type AdminPlanId = "starter" | "growth" | "ministry"

/** Values are kept as the text typed into the inputs, so "[YOUR PRICE]" stays text. */
export type AdminPricingTier = {
  name: string
  active: boolean
  talkHours: string
  bibleVersions: string
  monthlyPrice: string
  annualPrice: string
  currency: string
}

export type AdminBillingSettings = {
  annualDiscountMonths: string
  renewalReminders: string
  graceDays: string
}

export type AdminDeviceSettings = {
  switchIntervalDays: string
  switchesPerYear: string
  emergencyDelayHours: string
}

export type AdminTrialSettings = {
  enabled: boolean
  days: string
  talkHours: string
  bibleVersions: string
  startsPerDay: string
}

export type AdminPricingValues = {
  tiers: Record<AdminPlanId, AdminPricingTier>
  billing: AdminBillingSettings
  devices: AdminDeviceSettings
  trial: AdminTrialSettings
}

// ---- coverage -------------------------------------------------------------

export type CoverageTierId = AdminPlanId | "trial"

/** `recorded` = a licence document is on file; `missing` locks the version off. */
export type CoverageLicence = "public-domain" | "recorded" | "missing"

export type CoverageVersion = {
  code: string
  name: string
  licence: CoverageLicence
}

/** version code -> tier id -> included */
export type CoverageMatrix = Record<string, Record<CoverageTierId, boolean>>

// ---- Bible translations ----------------------------------------------------

export type AdminBibleSource = "local" | "fallback-api" | "not-set-up"

export type AdminBibleTranslation = {
  code: string
  name: string
  source: AdminBibleSource
  licence: CoverageLicence
  /** "v1 · Oct 3", or `null` when nothing has been imported. */
  imported: string | null
  /** The version shown on the audience screen until a church picks another. */
  isDefault?: boolean
  /** Live for churches. */
  live: boolean
  /** Page with this version's source settings (API.Bible connection). */
  sourceHref?: string
}

export type AdminBibleImportReport = {
  code: string
  version: string
  books: number
  verses: number
  when: string
}

export type AdminBibleTestPassage = {
  passage: string
  /** Response time the test reports once it has run. */
  ms: number
}

/** Where a test passage is in a test run. */
export type AdminPassageState = "waiting" | "running" | "passed"

/** Editable fields of the Bible source (API) page. */
export type AdminBibleSourceSettings = {
  provider: string
  translationId: string
  cachePolicy: string
  refreshLimit: string
  attribution: string
}

// ---- song catalogue --------------------------------------------------------

export type CatalogueSongStatus =
  "pending" | "reported" | "approved" | "rejected" | "removed"

export type CatalogueSong = {
  id: string
  title: string
  language: string
  submittedBy: string
  /** "Nov 6" */
  submittedOn: string
  reports: number
  status: CatalogueSongStatus
  /** The uploader confirmed they may share the lyrics. */
  rightsConfirmed: boolean
  /** Title of an existing song this looks like, if any. */
  duplicateOf?: string
  /** One entry per line. Missing when the preview is not shown (copyright). */
  lyrics?: string[]
}

export type TakedownStatus = "open" | "removed" | "rejected"

export type TakedownRequest = {
  id: string
  songId: string
  songTitle: string
  language: string
  requester: string
  requesterEmail: string
  status: TakedownStatus
  /** "Nov 6" */
  received: string
  /** "Community copy · 1 report" */
  meta: string
  message: string
  contacted: boolean
  ownershipVerified: boolean
  note: string
}

export type AdminSongTab = "review" | "takedowns" | "all"
