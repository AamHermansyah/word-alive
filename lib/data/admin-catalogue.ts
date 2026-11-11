import type {
  AdminBibleImportReport,
  AdminBibleSourceSettings,
  AdminBibleTestPassage,
  AdminBibleTranslation,
  AdminChangeEntry,
  AdminPricingValues,
  CatalogueSong,
  CoverageLicence,
  CoverageMatrix,
  CoverageTierId,
  CoverageVersion,
  TakedownRequest,
} from "@/types/admin-catalogue"

// ---- plans and pricing -----------------------------------------------------

/** `[YOUR PRICE]` stays a text value until the owner types a real price. */
export const PRICE_PLACEHOLDER = "[YOUR PRICE]"

export const CURRENCIES = ["USD", "EUR", "GBP"] as const

export const INITIAL_PRICING: AdminPricingValues = {
  tiers: {
    starter: {
      name: "Starter",
      active: true,
      talkHours: "12",
      bibleVersions: "5",
      monthlyPrice: "29.99",
      annualPrice: "299.90",
      currency: "USD",
    },
    growth: {
      name: "Growth",
      active: true,
      talkHours: "30",
      bibleVersions: "15",
      monthlyPrice: PRICE_PLACEHOLDER,
      annualPrice: PRICE_PLACEHOLDER,
      currency: "USD",
    },
    ministry: {
      name: "Ministry",
      active: true,
      talkHours: "80",
      bibleVersions: "All",
      monthlyPrice: PRICE_PLACEHOLDER,
      annualPrice: PRICE_PLACEHOLDER,
      currency: "USD",
    },
  },
  billing: {
    annualDiscountMonths: "2",
    renewalReminders: "7, 3, 1",
    graceDays: "7",
  },
  devices: {
    switchIntervalDays: "30",
    switchesPerYear: "6",
    emergencyDelayHours: "24",
  },
  trial: {
    enabled: true,
    days: "7",
    talkHours: "1",
    bibleVersions: "1",
    startsPerDay: "200",
  },
}

export const PRICING_HISTORY: AdminChangeEntry[] = [
  {
    id: "pricing-1",
    who: "Ada O.",
    when: "Oct 28",
    headline: "Starter pricing",
    changes: ["Monthly price: 24.99 → 29.99", "Annual price: 249.90 → 299.90"],
  },
  {
    id: "pricing-2",
    who: "Ada O.",
    when: "Oct 14",
    headline: "Free trial",
    changes: ["Days: 14 → 7", "Starts per day: 100 → 200"],
  },
  {
    id: "pricing-3",
    who: "Tunde A.",
    when: "Sep 30",
    headline: "Device switching",
    changes: ["Days between self-service switches: 14 → 30"],
  },
]

// ---- coverage --------------------------------------------------------------

export const COVERAGE_TIERS: {
  id: CoverageTierId
  name: string
  /** Column heading prefix: "Starter · 12 h". */
  short: string
}[] = [
  { id: "starter", name: "Starter", short: "Starter" },
  { id: "growth", name: "Growth", short: "Growth" },
  { id: "ministry", name: "Ministry", short: "Ministry" },
  { id: "trial", name: "Free trial", short: "Trial" },
]

export const LICENCE_LABEL: Record<CoverageLicence, string> = {
  "public-domain": "Public domain",
  recorded: "Recorded",
  missing: "Licence missing",
}

export const LICENCE_VARIANT = {
  "public-domain": "success",
  recorded: "success",
  missing: "warning",
} as const satisfies Record<CoverageLicence, "success" | "warning">

/** How many versions the matrix shows before "Show all". */
export const COVERAGE_PREVIEW_COUNT = 9

export const COVERAGE_VERSIONS: CoverageVersion[] = [
  { code: "KJV", name: "King James Version", licence: "public-domain" },
  { code: "NKJV", name: "New King James Version", licence: "recorded" },
  { code: "NLT", name: "New Living Translation", licence: "recorded" },
  { code: "NIV", name: "New International Version", licence: "recorded" },
  { code: "ESV", name: "English Standard Version", licence: "recorded" },
  { code: "NASB", name: "New American Standard", licence: "missing" },
  { code: "AMP", name: "Amplified Bible", licence: "recorded" },
  { code: "MSG", name: "The Message", licence: "missing" },
  { code: "GNT", name: "Good News Translation", licence: "recorded" },
  { code: "CSB", name: "Christian Standard Bible", licence: "recorded" },
  { code: "NRSV", name: "New Revised Standard Version", licence: "missing" },
  { code: "ASV", name: "American Standard Version", licence: "public-domain" },
  { code: "WEB", name: "World English Bible", licence: "public-domain" },
  { code: "RVR60", name: "Reina-Valera 1960", licence: "recorded" },
]

function row(
  starter: boolean,
  growth: boolean,
  ministry: boolean,
  trial: boolean
): Record<CoverageTierId, boolean> {
  return { starter, growth, ministry, trial }
}

export const INITIAL_COVERAGE: CoverageMatrix = {
  KJV: row(true, true, true, true),
  NKJV: row(true, true, true, false),
  NLT: row(true, true, true, false),
  NIV: row(true, true, true, false),
  ESV: row(true, true, true, false),
  NASB: row(false, false, false, false),
  AMP: row(false, true, true, false),
  MSG: row(false, false, false, false),
  GNT: row(false, true, true, false),
  CSB: row(false, false, false, false),
  NRSV: row(false, false, false, false),
  ASV: row(false, false, false, false),
  WEB: row(false, false, false, false),
  RVR60: row(false, false, false, false),
}

export const COVERAGE_HISTORY: AdminChangeEntry[] = [
  {
    id: "coverage-1",
    who: "Ada O.",
    when: "Oct 14",
    headline: "NASB locked off",
    changes: ["NASB: removed from every plan until a licence is recorded"],
  },
  {
    id: "coverage-2",
    who: "Tunde A.",
    when: "Oct 9",
    headline: "Growth and Ministry",
    changes: [
      "AMP: added to Growth and Ministry",
      "GNT: added to Growth and Ministry",
    ],
  },
  {
    id: "coverage-3",
    who: "Ada O.",
    when: "Oct 3",
    headline: "Free trial",
    changes: ["KJV: only version included in the free trial"],
  },
]

// ---- Bible translations -----------------------------------------------------

export const BIBLE_SOURCE_LABEL = {
  local: "Local import",
  "fallback-api": "Fallback API",
  "not-set-up": "Not set up",
} as const

export const INITIAL_BIBLE_TRANSLATIONS: AdminBibleTranslation[] = [
  {
    code: "KJV",
    name: "King James Version",
    source: "local",
    licence: "public-domain",
    imported: "v1 · Oct 3",
    isDefault: true,
    live: true,
  },
  {
    code: "NKJV",
    name: "New King James Version",
    source: "local",
    licence: "recorded",
    imported: "v1 · Oct 9",
    live: true,
  },
  {
    code: "NLT",
    name: "New Living Translation",
    source: "local",
    licence: "recorded",
    imported: "v1 · Oct 9",
    live: true,
  },
  {
    code: "NIV",
    name: "New International Version",
    source: "local",
    licence: "recorded",
    imported: "v1 · Oct 11",
    live: true,
    sourceHref: "/admin/bible/niv",
  },
  {
    code: "ESV",
    name: "English Standard Version",
    source: "local",
    licence: "recorded",
    imported: "v1 · Oct 11",
    live: true,
  },
  {
    code: "NASB",
    name: "New American Standard",
    source: "local",
    licence: "missing",
    imported: "v1 · Oct 14",
    live: false,
  },
  {
    code: "AMP",
    name: "Amplified Bible",
    source: "fallback-api",
    licence: "recorded",
    imported: null,
    live: false,
  },
  {
    code: "MSG",
    name: "The Message",
    source: "not-set-up",
    licence: "missing",
    imported: null,
    live: false,
  },
]

export const INITIAL_BIBLE_IMPORT: AdminBibleImportReport = {
  code: "KJV",
  version: "v1",
  books: 66,
  verses: 31102,
  when: "Oct 3",
}

/** The version the import form starts on. */
export const BIBLE_IMPORT_DEFAULT_CODE = "NASB"

/** Accepted file types for a Bible import. */
export const BIBLE_IMPORT_ACCEPT = ".usfm,.sfm,.osis,.xml,.usx"

// ---- Bible source (API) ------------------------------------------------------

export const BIBLE_SOURCE_PROVIDERS = ["API.Bible", "Fallback API"] as const

export const BIBLE_CACHE_POLICIES = [
  "Cache up to 7 days",
  "Cache up to 24 hours",
  "Do not cache",
] as const

export const INITIAL_BIBLE_SOURCE: AdminBibleSourceSettings = {
  provider: "API.Bible",
  translationId: "[ID FROM API.BIBLE]",
  cachePolicy: "Cache up to 7 days",
  refreshLimit: "30 days (set by the provider)",
  attribution: "[COPYRIGHT NOTICE REQUIRED BY THE LICENCE]",
}

export const BIBLE_SOURCE_KEY_MASK = "••••••••••••••••"

export const BIBLE_TEST_PASSAGES: AdminBibleTestPassage[] = [
  { passage: "John 3:16", ms: 412 },
  { passage: "Genesis 1:1", ms: 389 },
  { passage: "Psalm 23", ms: 430 },
  { passage: "Malachi 4 (numbering edge case)", ms: 451 },
]

export const BIBLE_SOURCE_USAGE = { used: 3420, limit: 5000, alertAt: 80 }

// ---- song catalogue --------------------------------------------------------

/** Wrapped in a Unicode isolate so the leading number stays put in right-to-left mode. */
export const CATALOGUE_SUBTITLE = "⁨48,200 songs shared by churches⁩"

/** Rows shown before "Show all" in the review queue and the song list. */
export const SONG_LIST_PREVIEW_COUNT = 6

export const INITIAL_CATALOGUE_SONGS: CatalogueSong[] = [
  {
    id: "nothing-but-the-blood",
    title: "Nothing but the Blood",
    language: "English",
    submittedBy: "Grace Chapel",
    submittedOn: "Nov 6",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
    lyrics: [
      "What can wash away my sin?",
      "Nothing but the blood of Jesus;",
      "What can make me whole again?",
      "Nothing but the blood of Jesus.",
    ],
  },
  {
    id: "olorun-oba",
    title: "Ọlọ́run Ọba",
    language: "Yoruba",
    submittedBy: "Hope Assembly",
    submittedOn: "Nov 6",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
  },
  {
    id: "great-is-thy-faithfulness",
    title: "Great Is Thy Faithfulness",
    language: "English",
    submittedBy: "Living Word Church",
    submittedOn: "Nov 5",
    reports: 2,
    status: "reported",
    rightsConfirmed: true,
  },
  {
    id: "abide-with-me",
    title: "Abide with Me",
    language: "English",
    submittedBy: "City Light Church",
    submittedOn: "Nov 5",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
    lyrics: [
      "Abide with me; fast falls the eventide;",
      "The darkness deepens; Lord, with me abide.",
      "When other helpers fail and comforts flee,",
      "Help of the helpless, O abide with me.",
    ],
  },
  {
    id: "mo-ni-oba-kan",
    title: "Mo Ní Ọba Kan",
    language: "Yoruba",
    submittedBy: "Pastor James O.",
    submittedOn: "Nov 4",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
  },
  {
    id: "come-thou-fount",
    title: "Come Thou Fount",
    language: "English",
    submittedBy: "Faith Tabernacle",
    submittedOn: "Nov 4",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
    lyrics: [
      "Come, thou Fount of every blessing,",
      "Tune my heart to sing thy grace;",
      "Streams of mercy, never ceasing,",
      "Call for songs of loudest praise.",
    ],
  },
  {
    id: "it-is-well",
    title: "It Is Well with My Soul",
    language: "English",
    submittedBy: "Redeemed Fellowship",
    submittedOn: "Nov 3",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
    lyrics: [
      "When peace like a river attendeth my way,",
      "When sorrows like sea billows roll;",
      "Whatever my lot, thou hast taught me to say,",
      "It is well, it is well with my soul.",
    ],
  },
  {
    id: "blessed-assurance",
    title: "Blessed Assurance",
    language: "English",
    submittedBy: "Mercy Chapel",
    submittedOn: "Nov 3",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
    lyrics: [
      "Blessed assurance, Jesus is mine!",
      "O what a foretaste of glory divine!",
      "Heir of salvation, purchase of God,",
      "Born of his Spirit, washed in his blood.",
    ],
  },
  {
    id: "be-thou-my-vision",
    title: "Be Thou My Vision",
    language: "English",
    submittedBy: "St. Luke's Parish",
    submittedOn: "Nov 2",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
    duplicateOf: "Be Thou My Vision (shared by Grace Chapel)",
    lyrics: [
      "Be Thou my Vision, O Lord of my heart;",
      "Naught be all else to me, save that Thou art;",
      "Thou my best Thought, by day or by night,",
      "Waking or sleeping, Thy presence my light.",
    ],
  },
  {
    id: "cuan-grande-es-el",
    title: "Cuán Grande Es Él",
    language: "Spanish",
    submittedBy: "Iglesia Vida Nueva",
    submittedOn: "Nov 2",
    reports: 0,
    status: "pending",
    rightsConfirmed: false,
  },
  {
    id: "rock-of-ages",
    title: "Rock of Ages",
    language: "English",
    submittedBy: "Bethel Gospel Hall",
    submittedOn: "Nov 1",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
    lyrics: [
      "Rock of Ages, cleft for me,",
      "Let me hide myself in Thee;",
      "Let the water and the blood,",
      "From Thy wounded side which flowed.",
    ],
  },
  {
    id: "jesus-loves-me",
    title: "Jesus Loves Me",
    language: "English",
    submittedBy: "Little Lambs Sunday School",
    submittedOn: "Oct 31",
    reports: 0,
    status: "pending",
    rightsConfirmed: true,
    lyrics: [
      "Jesus loves me! This I know,",
      "For the Bible tells me so;",
      "Little ones to Him belong;",
      "They are weak, but He is strong.",
    ],
  },
  // ---- already decided: only on the "All songs" tab ----
  {
    id: "how-great-thou-art",
    title: "How Great Thou Art",
    language: "English",
    submittedBy: "Grace Chapel",
    submittedOn: "Sep 14",
    reports: 0,
    status: "approved",
    rightsConfirmed: true,
  },
  {
    id: "amazing-grace",
    title: "Amazing Grace",
    language: "English",
    submittedBy: "Hope Assembly",
    submittedOn: "Aug 2",
    reports: 0,
    status: "approved",
    rightsConfirmed: true,
    lyrics: [
      "Amazing grace! How sweet the sound,",
      "That saved a wretch like me!",
      "I once was lost, but now am found;",
      "Was blind, but now I see.",
    ],
  },
  {
    id: "holy-holy-holy",
    title: "Holy, Holy, Holy",
    language: "English",
    submittedBy: "City Light Church",
    submittedOn: "Aug 20",
    reports: 0,
    status: "approved",
    rightsConfirmed: true,
  },
  {
    id: "all-hail-the-power",
    title: "All Hail the Power of Jesus' Name",
    language: "English",
    submittedBy: "Faith Tabernacle",
    submittedOn: "Jul 12",
    reports: 0,
    status: "approved",
    rightsConfirmed: true,
  },
  {
    id: "joyful-joyful",
    title: "Joyful, Joyful, We Adore Thee",
    language: "English",
    submittedBy: "Mercy Chapel",
    submittedOn: "Jul 3",
    reports: 0,
    status: "approved",
    rightsConfirmed: true,
  },
  {
    id: "o-come-all-ye-faithful",
    title: "O Come, All Ye Faithful",
    language: "English",
    submittedBy: "Living Word Church",
    submittedOn: "Jun 18",
    reports: 0,
    status: "approved",
    rightsConfirmed: true,
  },
  {
    id: "my-own-praise-chorus",
    title: "My Own Praise Chorus",
    language: "English",
    submittedBy: "Anonymous",
    submittedOn: "Oct 30",
    reports: 0,
    status: "rejected",
    rightsConfirmed: false,
  },
  {
    id: "shout-to-the-lord",
    title: "Shout to the Lord",
    language: "English",
    submittedBy: "Grace Chapel",
    submittedOn: "Sep 2",
    reports: 1,
    status: "removed",
    rightsConfirmed: true,
  },
]

export const INITIAL_TAKEDOWNS: TakedownRequest[] = [
  {
    id: "takedown-1",
    songId: "great-is-thy-faithfulness",
    songTitle: "Great Is Thy Faithfulness",
    language: "English",
    requester: "Publisher rep.",
    requesterEmail: "rights@publisher.example",
    status: "open",
    received: "Nov 6",
    meta: "Community copy · 1 report",
    message:
      "Request: remove this song. The lyrics are protected by copyright and were shared without permission.",
    contacted: true,
    ownershipVerified: false,
    note: "",
  },
  {
    id: "takedown-2",
    songId: "how-great-thou-art",
    songTitle: "How Great Thou Art",
    language: "English",
    requester: "Rights holder",
    requesterEmail: "legal@holder.example",
    status: "open",
    received: "Nov 5",
    meta: "Library copy · 0 reports",
    message:
      "Request: remove this song. We hold the rights and have not licensed it to WordAlive or to the church that shared it.",
    contacted: false,
    ownershipVerified: false,
    note: "",
  },
]
