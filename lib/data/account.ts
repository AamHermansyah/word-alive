import { BIBLE_VERSIONS, PLANS, TRIAL } from "@/lib/data/plans"
import { SONGS } from "@/lib/data/songs"
import type {
  BillingSummary,
  Contribution,
  ContributionStatus,
  DataExport,
  Receipt,
  ReceiptStatus,
  ReportReason,
  SetSong,
  SongLyrics,
  TermsUpdate,
} from "@/types/account"
import type { BibleVersion, Song, SongRights } from "@/types"

/* ------------------------------------------------------------------ */
/* Song detail                                                         */
/* ------------------------------------------------------------------ */

/** Licensed songs are not reproduced on the page; the audience screen shows them. */
const LICENSED_NOTICE =
  "This song is under a music licence, so its words are not printed here. They appear on your audience screen when you show the song."

export const SONG_LYRICS: Record<string, SongLyrics> = {
  "amazing-grace": {
    stanzas: [
      {
        id: "s1",
        label: "Stanza 1",
        lines: [
          "Amazing grace! How sweet the sound,",
          "That saved a wretch like me!",
          "I once was lost, but now am found;",
          "Was blind, but now I see.",
        ],
      },
      {
        id: "s2",
        label: "Stanza 2",
        lines: [
          "’Twas grace that taught my heart to fear,",
          "And grace my fears relieved;",
          "How precious did that grace appear",
          "The hour I first believed.",
        ],
      },
    ],
  },
  "great-is-thy-faithfulness": { stanzas: [], notice: LICENSED_NOTICE },
  "how-great-thou-art": { stanzas: [], notice: LICENSED_NOTICE },
  "olorun-oba": {
    stanzas: [
      {
        id: "s1",
        label: "Stanza 1",
        lines: ["Ọlọ́run Ọba, a yìn Ọ́", "A gbé Ọ ga, Olúwa wa"],
      },
    ],
  },
  "nothing-but-the-blood": {
    stanzas: [
      {
        id: "s1",
        label: "Stanza 1",
        lines: [
          "What can wash away my sin?",
          "Nothing but the blood of Jesus;",
          "What can make me whole again?",
          "Nothing but the blood of Jesus.",
        ],
      },
      {
        id: "chorus",
        label: "Chorus",
        lines: [
          "Oh! precious is the flow",
          "That makes me white as snow;",
          "No other fount I know,",
          "Nothing but the blood of Jesus.",
        ],
      },
    ],
  },
  "abide-with-me": {
    stanzas: [
      {
        id: "s1",
        label: "Stanza 1",
        lines: [
          "Abide with me; fast falls the eventide;",
          "The darkness deepens; Lord, with me abide.",
          "When other helpers fail and comforts flee,",
          "Help of the helpless, O abide with me.",
        ],
      },
      {
        id: "s2",
        label: "Stanza 2",
        lines: [
          "Swift to its close ebbs out life’s little day;",
          "Earth’s joys grow dim, its glories pass away;",
          "Change and decay in all around I see;",
          "O Thou who changest not, abide with me.",
        ],
      },
    ],
  },
}

/** Where a song's words come from, as printed in the song's detail box. */
export const SONG_SOURCE_LABEL: Record<SongRights, string> = {
  "public-domain": "Public domain",
  licensed: "Licensed catalogue",
  community: "Community",
  "in-review": "Your upload",
}

export type SongDetail = { song: Song; lyrics: SongLyrics }

/** The library song and its lyrics, or `undefined` for an id the library does not know. */
export function getSongDetail(id: string): SongDetail | undefined {
  const song = SONGS.find((item) => item.id === id)
  if (!song) return undefined
  return { song, lyrics: SONG_LYRICS[id] ?? { stanzas: [] } }
}

/** True when `/songs/<id>` resolves to a page. */
export function hasSongDetail(id: string): boolean {
  return SONGS.some((song) => song.id === id)
}

export const REPORT_REASONS: ReportReason[] = [
  { id: "wrong-lyrics", label: "Wrong lyrics" },
  { id: "rights-removal", label: "I own the rights and want it removed" },
  { id: "not-appropriate", label: "Not appropriate" },
]

/** A report needs at least this many characters of explanation. */
export const REPORT_DETAILS_MIN = 8

/* ------------------------------------------------------------------ */
/* My songs                                                            */
/* ------------------------------------------------------------------ */

export const CONTRIBUTION_STATUS_LABEL: Record<ContributionStatus, string> = {
  "in-review": "In review",
  approved: "Approved",
  rejected: "Rejected",
}

export const CONTRIBUTION_STATUS_VARIANT: Record<
  ContributionStatus,
  "warning" | "success" | "brand"
> = {
  "in-review": "warning",
  approved: "success",
  rejected: "brand",
}

export const CONTRIBUTIONS: Contribution[] = [
  {
    id: "c-nothing-but-the-blood",
    title: "Nothing but the Blood",
    language: "English",
    status: "in-review",
    note: "Waiting for review",
  },
  {
    id: "c-olorun-oba",
    title: "Ọlọ́run Ọba",
    language: "Yoruba",
    status: "approved",
    note: "Used by 38 churches",
    songId: "olorun-oba",
  },
  {
    id: "c-church-anthem",
    title: "My Church Anthem",
    language: "English",
    status: "rejected",
    note: "Rights not confirmed. Edit and resubmit.",
    lyrics: "Here we gather, hearts as one,\nPraising God for all He has done",
  },
]

/** An empty "Add a song" form for a brand-new contribution. */
export const BLANK_SONG = { title: "", language: "English", lyrics: "" }

type SetSeed = [
  title: string,
  author: string,
  rights: SongRights,
  usedBy: string,
  songId?: string,
]

const SET_SEEDS: SetSeed[] = [
  ["Amazing Grace", "John Newton", "public-domain", "1,204 churches", "amazing-grace"],
  ["Abide with Me", "Henry F. Lyte", "public-domain", "874 churches", "abide-with-me"],
  ["How Great Thou Art", "Stuart K. Hine", "licensed", "1,010 churches", "how-great-thou-art"],
  ["Great Is Thy Faithfulness", "Thomas Chisholm", "licensed", "982 churches", "great-is-thy-faithfulness"],
  ["Holy, Holy, Holy", "Reginald Heber", "public-domain", "1,090 churches"],
  ["It Is Well with My Soul", "Horatio Spafford", "public-domain", "1,132 churches"],
  ["Blessed Assurance", "Fanny Crosby", "public-domain", "968 churches"],
  ["When I Survey the Wondrous Cross", "Isaac Watts", "public-domain", "744 churches"],
  ["O for a Thousand Tongues to Sing", "Charles Wesley", "public-domain", "610 churches"],
  ["Come, Thou Fount of Every Blessing", "Robert Robinson", "public-domain", "702 churches"],
  ["Rock of Ages", "Augustus Toplady", "public-domain", "655 churches"],
  ["Be Thou My Vision", "Ancient Irish hymn", "public-domain", "889 churches"],
  ["A Mighty Fortress Is Our God", "Martin Luther", "public-domain", "512 churches"],
  ["Crown Him with Many Crowns", "Matthew Bridges", "public-domain", "480 churches"],
  ["All Hail the Power of Jesus’ Name", "Edward Perronet", "public-domain", "566 churches"],
  ["Praise to the Lord, the Almighty", "Joachim Neander", "public-domain", "430 churches"],
  ["Just As I Am", "Charlotte Elliott", "public-domain", "701 churches"],
  ["Take My Life and Let It Be", "Frances Havergal", "public-domain", "398 churches"],
  ["Standing on the Promises", "R. Kelso Carter", "public-domain", "361 churches"],
  ["Tell Me the Old, Old Story", "Katherine Hankey", "public-domain", "244 churches"],
  ["Fairest Lord Jesus", "Silesian folk hymn", "public-domain", "301 churches"],
  ["Joyful, Joyful, We Adore Thee", "Henry van Dyke", "public-domain", "523 churches"],
  ["Lead On, O King Eternal", "Ernest Shurtleff", "public-domain", "188 churches"],
  ["Jesus Loves Me", "Anna Warner", "public-domain", "790 churches"],
]

export const SET_SONGS: SetSong[] = SET_SEEDS.map(
  ([title, author, rights, usedBy, songId], index) => ({
    id: `set-${index + 1}`,
    title,
    author,
    language: "English",
    rights,
    usedBy,
    songId,
  })
)

/* ------------------------------------------------------------------ */
/* Billing                                                             */
/* ------------------------------------------------------------------ */

const CURRENT_PLAN = PLANS.find((plan) => plan.current) ?? PLANS[0]

export const BILLING: BillingSummary = {
  planName: CURRENT_PLAN.name,
  monthlyPrice: CURRENT_PLAN.monthlyPrice ?? 0,
  renewsOn: "Dec 7",
  paymentMethod: "Google Pay",
}

function receipt(date: string, status: ReceiptStatus = "paid"): Receipt {
  return {
    id: `receipt-${date.toLowerCase().replace(/\s+/g, "-")}`,
    date,
    plan: BILLING.planName,
    amount: BILLING.monthlyPrice,
    status,
  }
}

export const RECEIPTS: Receipt[] = [
  receipt("Nov 7"),
  receipt("Oct 7"),
  receipt("Sep 7"),
  receipt("Aug 7", "refunded"),
  receipt("Jul 7"),
]

export const RECEIPT_STATUS_LABEL: Record<ReceiptStatus, string> = {
  paid: "Paid",
  refunded: "Refunded",
}

export const RECEIPT_STATUS_VARIANT: Record<
  ReceiptStatus,
  "success" | "neutral"
> = {
  paid: "success",
  refunded: "neutral",
}

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`
}

/* ------------------------------------------------------------------ */
/* Your data                                                           */
/* ------------------------------------------------------------------ */

export const DATA_EXPORT: DataExport = { expiry: "Link expires in 7 days" }

export const DELETE_CONSEQUENCES = [
  "Your subscription ends and your account is deleted.",
  "Songs you shared stay in the library without your name.",
  "Payment records are kept for as long as the law requires.",
  "This cannot be undone.",
]

/* ------------------------------------------------------------------ */
/* Terms update                                                        */
/* ------------------------------------------------------------------ */

export const TERMS_UPDATE: TermsUpdate = {
  effective: "Dec 1, 2026",
  changes: [
    "The free trial is now described.",
    "Device switch limits are clearer.",
  ],
}

/* ------------------------------------------------------------------ */
/* Bible versions during the trial                                     */
/* ------------------------------------------------------------------ */

/** The first five versions are listed during the trial; only the default one is usable. */
export const TRIAL_BIBLE_VERSIONS: BibleVersion[] = BIBLE_VERSIONS.slice(0, 5).map(
  (version) => ({ ...version, inUse: version.code === "KJV" })
)

export const TRIAL_BIBLE_LIMIT = TRIAL.bibleVersions
