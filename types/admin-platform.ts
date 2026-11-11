/** Types for the content / platform admin pages (SEO, legal, AI, languages, health, audit, team). */

/** Colour family of a status pill; mapped to a `Badge` variant. */
export type AdminTone =
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "info"
  | "brand"

// --- Landing SEO ------------------------------------------------------------

export type SeoSettings = {
  title: string
  description: string
  canonicalUrl: string
  verificationTag: string
  analyticsId: string
  indexable: boolean
  /** Which artwork the social share image uses (index into SEO_SHARE_IMAGES). */
  shareImage: number
}

// --- Legal pages ------------------------------------------------------------

export type LegalDocId = "privacy" | "terms" | "refund"

export type LegalVersion = { version: number; date: string }

/** One legal document as the editor holds it. */
export type LegalDocState = {
  id: LegalDocId
  /** Editable document title (the big heading above the body). */
  title: string
  /** Editable body, simple HTML (headings, paragraphs, lists, bold, italic, links). */
  html: string
  /** The last saved draft. `title`/`html` differ from it while the draft is unsaved. */
  savedTitle: string
  savedHtml: string
  /** The live, published text. */
  publishedTitle: string
  publishedHtml: string
  published: LegalVersion
  history: LegalVersion[]
  emailUsers: boolean
  askToAccept: boolean
  effectiveDate: string
  /** Bumped whenever the editor must reload its content from `html`. */
  revision: number
}

// --- AI providers -----------------------------------------------------------

export type AiProviderConfig = {
  enabled: boolean
  primary: string
  fallback: string
  modelId: string
}

export type AiSecret = {
  /** The stored key is being replaced. */
  replacing: boolean
  value: string
}

export type AiSettings = {
  speech: AiProviderConfig
  reasoning: AiProviderConfig
  speechKey: AiSecret
  /** Confidence thresholds as whole percentages (85 = 0.85). */
  thresholds: { show: number; suggest: number; lock: number }
}

export type AiUsageRow = { service: string; calls: string; errors: string }

// --- Languages --------------------------------------------------------------

export type ProviderSupport = "listed" | "unverified" | "not-listed"
export type LanguageTest = "passed" | "failed" | "not-run" | "running"

export type LanguageRow = {
  code: string
  name: string
  isDefault?: boolean
  gemini: ProviderSupport
  deepgram: ProviderSupport
  test: LanguageTest
  enabled: boolean
}

// --- System health ----------------------------------------------------------

export type HealthStatus = "healthy" | "slow" | "failed"

export type HealthTile = {
  id: string
  name: string
  status: HealthStatus
  /** Line under the name ("Healthy · 99.98%", "2 failed"). */
  detail: string
  href?: string
}

export type HealthSnapshot = {
  /** Replaces the matching tiles' status and detail. */
  tiles: Record<string, Pick<HealthTile, "status" | "detail">>
  connections: number
  /** Latest latency sample in ms. */
  scriptureMs: number
  lyricsMs: number
}

export type LatencyPoint = { label: string; scripture: number; lyrics: number }

export type ErrorState = "retried" | "open" | "resolved"
export type HealthError = {
  id: string
  time: string
  message: string
  state: ErrorState
}

// --- Audit log --------------------------------------------------------------

export type AuditEntry = {
  id: string
  /** ISO timestamp, used for the period filter. */
  at: string
  /** Display time ("Nov 7, 10:51"). */
  when: string
  admin: string
  action: string
  target: string
  from?: string
  to?: string
  note?: string
  ip: string
}

// --- Admin team -------------------------------------------------------------

export type AdminRole = "super" | "support"
export type AuthenticatorState = "enabled" | "pending"

export type TeamMember = {
  id: string
  name: string
  email: string
  role: AdminRole
  authenticator: AuthenticatorState
  lastActive: string
  /** Just invited in this session: fades in. */
  added?: boolean
}

export type RolePermission = {
  action: string
  super: boolean
  support: boolean
}
