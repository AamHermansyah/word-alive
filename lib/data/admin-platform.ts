import type {
  AiSettings,
  AiUsageRow,
  AuditEntry,
  HealthError,
  HealthSnapshot,
  HealthTile,
  LanguageRow,
  LatencyPoint,
  LegalDocId,
  LegalDocState,
  RolePermission,
  SeoSettings,
  TeamMember,
} from "@/types/admin-platform"

/* -------------------------------------------------------------------------- */
/* Landing SEO                                                                */
/* -------------------------------------------------------------------------- */

export const SEO_TITLE_LIMIT = 60
export const SEO_DESCRIPTION_LIMIT = 160
/** Below this the title / description is too short to be a good snippet. */
export const SEO_TITLE_MIN = 30
export const SEO_DESCRIPTION_MIN = 70

export const SEO_DEFAULTS: SeoSettings = {
  title: "WordAlive: your church presentation, automatically",
  description:
    "Let AI listen, understand and display Bible scriptures and worship lyrics on your church screen while you focus on the ministry.",
  canonicalUrl: "https://wordalive.app/",
  verificationTag: "[YOUR TAG]",
  analyticsId: "[YOUR ID]",
  indexable: true,
  shareImage: 0,
}

/** Artwork choices for the social share image ("Replace image" cycles them). */
export const SEO_SHARE_IMAGES = [
  { id: "maroon", className: "bg-brand text-brand-foreground" },
  { id: "navy", className: "bg-navy text-navy-foreground" },
  { id: "green", className: "bg-success text-success-foreground" },
] as const

/* -------------------------------------------------------------------------- */
/* Legal pages                                                                */
/* -------------------------------------------------------------------------- */

export const LEGAL_TABS: { id: LegalDocId; label: string }[] = [
  { id: "privacy", label: "Privacy policy" },
  { id: "terms", label: "Terms of use" },
  { id: "refund", label: "Refund policy" },
]

const section = (heading: string, body: string) =>
  `<h2>${heading}</h2><p>${body}</p>`

const PRIVACY_DRAFT = [
  section(
    "1. What we collect",
    "Account details you give us: name, email, city and country. Usage details such as talk hours."
  ),
  section(
    "2. Audio",
    "Audio is processed live to find scriptures and songs. We do not store recordings."
  ),
  section(
    "3. Who processes your audio",
    "The speech and AI providers listed below receive audio while you are listening."
  ),
  section(
    "4. Your choices",
    "You can export or delete your data from Settings."
  ),
].join("")

/** The draft as last saved: it has no usage-details sentence yet. */
const PRIVACY_SAVED = PRIVACY_DRAFT.replace(" Usage details such as talk hours.", "")

const PRIVACY_PUBLISHED = [
  section(
    "1. What we collect",
    "Account details you give us: name, email, city and country."
  ),
  section(
    "2. Audio",
    "Audio is processed live to find scriptures and songs. We do not store recordings."
  ),
  section(
    "3. Your choices",
    "You can export or delete your data from Settings."
  ),
].join("")

const TERMS_BODY = [
  section(
    "1. Using WordAlive",
    "WordAlive helps your church show scriptures and song lyrics on a screen. You are responsible for what is shown to your congregation."
  ),
  section(
    "2. Your account",
    "Keep your sign-in details private. One church account can be used on one device at a time."
  ),
  section(
    "3. Plans and billing",
    "Paid plans renew every billing cycle until you cancel. A running service is never cut off."
  ),
  section(
    "4. Acceptable use",
    "Do not use WordAlive to present content you have no right to show, or to disrupt the service for others."
  ),
].join("")

const REFUND_PUBLISHED = [
  section(
    "1. Free trial",
    "Your free trial costs nothing and needs no card, so there is nothing to refund."
  ),
  section(
    "2. Paid plans",
    "If WordAlive does not work for your church, ask within 14 days of your first payment and we will refund it."
  ),
  section(
    "3. How to ask",
    "Contact support from the landing page with your church name and receipt number."
  ),
].join("")

const REFUND_SAVED = REFUND_PUBLISHED.replace(
  "ask within 14 days of your first payment",
  "ask within 30 days of your first payment"
)

export const LEGAL_DEFAULT_EFFECTIVE_DATE = "Dec 1, 2026"

export function createLegalDocs(): Record<LegalDocId, LegalDocState> {
  const base = {
    emailUsers: true,
    askToAccept: false,
    effectiveDate: LEGAL_DEFAULT_EFFECTIVE_DATE,
    revision: 0,
  }
  return {
    privacy: {
      ...base,
      id: "privacy",
      title: "Privacy Policy",
      html: PRIVACY_DRAFT,
      savedTitle: "Privacy Policy",
      savedHtml: PRIVACY_SAVED,
      publishedTitle: "Privacy Policy",
      publishedHtml: PRIVACY_PUBLISHED,
      published: { version: 3, date: "Oct 12" },
      history: [{ version: 2, date: "Aug 30" }],
    },
    terms: {
      ...base,
      id: "terms",
      title: "Terms of Use",
      html: TERMS_BODY,
      savedTitle: "Terms of Use",
      savedHtml: TERMS_BODY,
      publishedTitle: "Terms of Use",
      publishedHtml: TERMS_BODY,
      published: { version: 5, date: "Sep 18" },
      history: [{ version: 4, date: "Jun 21" }],
    },
    refund: {
      ...base,
      id: "refund",
      title: "Refund Policy",
      html: REFUND_SAVED,
      savedTitle: "Refund Policy",
      savedHtml: REFUND_SAVED,
      publishedTitle: "Refund Policy",
      publishedHtml: REFUND_PUBLISHED,
      published: { version: 2, date: "Jul 4" },
      history: [{ version: 1, date: "Mar 12" }],
    },
  }
}

/* -------------------------------------------------------------------------- */
/* AI providers                                                               */
/* -------------------------------------------------------------------------- */

export const SPEECH_PROVIDERS = [
  "Gemini 3.5 Transcribe Live",
  "Deepgram Nova-3 multilingual",
  "AssemblyAI Universal streaming",
] as const

export const REASONING_PROVIDERS = [
  "Anthropic Claude Sonnet",
  "Google Gemini Pro",
  "OpenAI GPT",
] as const

export const NO_FALLBACK = "None"

export const MASKED_KEY = "••••••••••••••••"
export const MIN_API_KEY_LENGTH = 12

export const AI_DEFAULTS: AiSettings = {
  speech: {
    enabled: true,
    primary: "Gemini 3.5 Transcribe Live",
    fallback: "Deepgram Nova-3 multilingual",
    modelId: "[MODEL ID]",
  },
  reasoning: {
    enabled: true,
    primary: "Anthropic Claude Sonnet",
    fallback: NO_FALLBACK,
    modelId: "[MODEL ID]",
  },
  speechKey: { replacing: false, value: "" },
  thresholds: { show: 85, suggest: 60, lock: 80 },
}

export const AI_THRESHOLDS = [
  { key: "show", label: "Show scripture automatically" },
  { key: "suggest", label: "Suggest scripture to the operator" },
  { key: "lock", label: "Lock onto a song" },
] as const

export const AI_USAGE: AiUsageRow[] = [
  { service: "Speech", calls: "1,840 h", errors: "0.3%" },
  { service: "Reasoning", calls: "412k", errors: "0.5%" },
]

/* -------------------------------------------------------------------------- */
/* Languages                                                                  */
/* -------------------------------------------------------------------------- */

export const LANGUAGES: LanguageRow[] = [
  { code: "en", name: "English", isDefault: true, gemini: "listed", deepgram: "listed", test: "passed", enabled: true },
  { code: "fr", name: "French", gemini: "listed", deepgram: "listed", test: "not-run", enabled: false },
  { code: "es", name: "Spanish", gemini: "listed", deepgram: "listed", test: "not-run", enabled: false },
  { code: "pt", name: "Portuguese", gemini: "listed", deepgram: "listed", test: "not-run", enabled: false },
  { code: "ar", name: "Arabic", gemini: "listed", deepgram: "unverified", test: "not-run", enabled: false },
  { code: "zh", name: "Mandarin", gemini: "listed", deepgram: "unverified", test: "not-run", enabled: false },
  { code: "hi", name: "Hindi", gemini: "listed", deepgram: "listed", test: "not-run", enabled: false },
  { code: "sw", name: "Swahili", gemini: "unverified", deepgram: "unverified", test: "not-run", enabled: false },
  { code: "yo", name: "Yoruba", gemini: "unverified", deepgram: "not-listed", test: "not-run", enabled: false },
  { code: "ha", name: "Hausa", gemini: "unverified", deepgram: "not-listed", test: "not-run", enabled: false },
  { code: "ig", name: "Igbo", gemini: "unverified", deepgram: "not-listed", test: "not-run", enabled: false },
]

/* -------------------------------------------------------------------------- */
/* System health                                                              */
/* -------------------------------------------------------------------------- */

export const HEALTH_TILES: HealthTile[] = [
  { id: "api", name: "API", status: "healthy", detail: "Healthy · 99.98%" },
  { id: "database", name: "Database", status: "healthy", detail: "Healthy" },
  { id: "redis", name: "Redis", status: "healthy", detail: "Healthy" },
  { id: "connections", name: "Live connections", status: "healthy", detail: "212 open" },
  { id: "speech", name: "Speech provider", status: "slow", detail: "Slow · retrying" },
  { id: "reasoning", name: "Reasoning provider", status: "healthy", detail: "Healthy" },
  { id: "bible", name: "Bible database", status: "healthy", detail: "Healthy" },
  { id: "webhooks", name: "Payment webhooks", status: "failed", detail: "2 failed", href: "/admin/payments" },
]

/** What each "Refresh" brings back, in turn; the cycle then starts over. */
export const HEALTH_POLLS: HealthSnapshot[] = [
  {
    tiles: {
      api: { status: "healthy", detail: "Healthy · 99.98%" },
      speech: { status: "healthy", detail: "Healthy · recovered" },
      webhooks: { status: "failed", detail: "2 failed" },
    },
    connections: 224,
    scriptureMs: 412,
    lyricsMs: 258,
  },
  {
    tiles: {
      api: { status: "healthy", detail: "Healthy · 99.98%" },
      speech: { status: "healthy", detail: "Healthy" },
      webhooks: { status: "failed", detail: "1 failed" },
    },
    connections: 231,
    scriptureMs: 386,
    lyricsMs: 244,
  },
  {
    tiles: {
      api: { status: "slow", detail: "Slow · 1.4 s p95" },
      speech: { status: "slow", detail: "Slow · retrying" },
      webhooks: { status: "healthy", detail: "Healthy" },
    },
    connections: 207,
    scriptureMs: 468,
    lyricsMs: 281,
  },
]

/** Pipeline latency (ms) over the last 24 hours, one sample every 2 h 40 min. */
export const LATENCY_SERIES: LatencyPoint[] = [
  { label: "Yesterday 11:00", scripture: 240, lyrics: 168 },
  { label: "Yesterday 13:40", scripture: 264, lyrics: 192 },
  { label: "Yesterday 16:20", scripture: 232, lyrics: 176 },
  { label: "Yesterday 19:00", scripture: 296, lyrics: 208 },
  { label: "Yesterday 21:40", scripture: 280, lyrics: 184 },
  { label: "Today 00:20", scripture: 344, lyrics: 232 },
  { label: "Today 03:00", scripture: 312, lyrics: 216 },
  { label: "Today 05:40", scripture: 400, lyrics: 248 },
  { label: "Today 08:20", scripture: 376, lyrics: 224 },
  { label: "Today 11:00", scripture: 440, lyrics: 264 },
]

export const HEALTH_ERRORS: HealthError[] = [
  { id: "e1", time: "10:42", message: "Speech provider timeout", state: "retried" },
  { id: "e2", time: "10:38", message: "Paystack webhook signature mismatch", state: "open" },
  { id: "e3", time: "09:51", message: "Bible import validation warning", state: "resolved" },
  { id: "e4", time: "09:12", message: "Speech provider timeout", state: "retried" },
]

export const HEALTH_CHECKED_AT = "10:44:12"

/* -------------------------------------------------------------------------- */
/* Audit log                                                                  */
/* -------------------------------------------------------------------------- */

/** "Now" for the period filter: the moment the mock log was taken. */
export const AUDIT_NOW = "2026-11-07T12:00:00Z"

export const AUDIT_PERIODS = [
  { id: "24h", label: "Last 24 hours", days: 1 },
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 90 days", days: 90 },
] as const

export const AUDIT_ALL_ADMINS = "All admins"
export const AUDIT_ALL_ACTIONS = "All actions"

export const AUDIT_ENTRIES: AuditEntry[] = [
  { id: "a1", at: "2026-11-07T10:51:00Z", when: "Nov 7, 10:51", admin: "Ada O.", action: "Price changed", target: "Starter monthly", from: "$24.99", to: "$29.99", ip: "102.89.x.x" },
  { id: "a2", at: "2026-11-07T09:30:00Z", when: "Nov 7, 09:30", admin: "Tolu A.", action: "Device reset", target: "Grace Chapel", note: "Cleared switch cooldown", ip: "102.89.x.x" },
  { id: "a3", at: "2026-11-06T17:12:00Z", when: "Nov 6, 17:12", admin: "Ada O.", action: "Version enabled", target: "NIV", from: "Off", to: "On", ip: "102.89.x.x" },
  { id: "a4", at: "2026-11-06T15:40:00Z", when: "Nov 6, 15:40", admin: "Tolu A.", action: "Song removed", target: "Great Is Thy Faithfulness", note: "Takedown request", ip: "41.58.x.x" },
  { id: "a5", at: "2026-11-06T11:05:00Z", when: "Nov 6, 11:05", admin: "Ada O.", action: "Policy published", target: "Privacy policy", from: "v3", to: "v4 draft saved", ip: "102.89.x.x" },
  { id: "a6", at: "2026-11-05T16:22:00Z", when: "Nov 5, 16:22", admin: "Ada O.", action: "Key replaced", target: "Speech provider", note: "API key rotated", ip: "102.89.x.x" },
  { id: "a7", at: "2026-11-05T10:18:00Z", when: "Nov 5, 10:18", admin: "Tolu A.", action: "Subscription extended", target: "Redeemed Fellowship", note: "+14 days", ip: "41.58.x.x" },
  { id: "a8", at: "2026-11-04T14:09:00Z", when: "Nov 4, 14:09", admin: "Ada O.", action: "Payment override", target: "WA-4A1D07", from: "Pending", to: "Verified", note: "(reason added)", ip: "102.89.x.x" },
  { id: "a9", at: "2026-10-02T11:20:00Z", when: "Oct 2, 11:20", admin: "Ada O.", action: "Version enabled", target: "KJV", from: "Off", to: "On", ip: "102.89.x.x" },
  { id: "a10", at: "2026-09-14T09:45:00Z", when: "Sep 14, 09:45", admin: "Tolu A.", action: "Subscription extended", target: "Grace Chapel", note: "+30 days", ip: "41.58.x.x" },
  { id: "a11", at: "2026-08-30T14:00:00Z", when: "Aug 30, 14:00", admin: "Ada O.", action: "Policy published", target: "Privacy policy", from: "v1", to: "v2", ip: "102.89.x.x" },
]

/* -------------------------------------------------------------------------- */
/* Admin team                                                                 */
/* -------------------------------------------------------------------------- */

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "ada", name: "Ada O.", email: "ada@wordalive.app", role: "super", authenticator: "enabled", lastActive: "Now" },
  { id: "tolu", name: "Tolu A.", email: "tolu@wordalive.app", role: "support", authenticator: "enabled", lastActive: "2 h ago" },
  { id: "chidi", name: "Chidi N.", email: "chidi@wordalive.app", role: "support", authenticator: "pending", lastActive: "Never" },
]

export const ROLE_LABEL = { super: "Super Admin", support: "Support Admin" } as const

export const ROLE_PERMISSIONS: RolePermission[] = [
  { action: "View customers and payments", super: true, support: true },
  { action: "Reset device, extend, grant hours", super: true, support: true },
  { action: "Moderate songs", super: true, support: true },
  { action: "Change pricing and plans", super: true, support: false },
  { action: "Provider keys and Bible sources", super: true, support: false },
  { action: "Payment override", super: true, support: false },
  { action: "Edit legal pages and SEO", super: true, support: false },
  { action: "Manage admin team", super: true, support: false },
]
