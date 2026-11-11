import type { SongRights } from "@/types"

/** One stanza (or chorus) of a song, one string per printed line. */
export type SongStanza = {
  id: string
  /** "Stanza 1", "Chorus"... shown above the lines. */
  label: string
  lines: string[]
}

/** A song's lyrics and where they come from, keyed by the library song id. */
export type SongLyrics = {
  /** Empty for licensed songs whose text is only shown through the audience screen. */
  stanzas: SongStanza[]
  /** Shown instead of lyrics when `stanzas` is empty. */
  notice?: string
}

export type ReportReasonId = "wrong-lyrics" | "rights-removal" | "not-appropriate"

export type ReportReason = {
  id: ReportReasonId
  label: string
}

export type ContributionStatus = "in-review" | "approved" | "rejected"

/** A song the church shared with the library. */
export type Contribution = {
  id: string
  title: string
  language: string
  status: ContributionStatus
  /** "Waiting for review", "Used by 38 churches", "Rights not confirmed..." */
  note: string
  /** Lyrics kept so a rejected song can be edited and sent again. */
  lyrics?: string
  /** Library id once approved, so "View" can open the song. */
  songId?: string
}

/** A song in the church's own set (the "My set" tab). */
export type SetSong = {
  id: string
  title: string
  author: string
  language: string
  rights: SongRights
  usedBy: string
  /** Library id when the song page exists. */
  songId?: string
}

export type ReceiptStatus = "paid" | "refunded"

export type Receipt = {
  id: string
  /** "Nov 7" */
  date: string
  plan: string
  /** USD, two decimals. */
  amount: number
  status: ReceiptStatus
}

export type BillingSummary = {
  planName: string
  /** USD per month. */
  monthlyPrice: number
  /** Next renewal date, e.g. "Dec 7". */
  renewsOn: string
  paymentMethod: string
}

export type DataExport = {
  /** "Link expires in 7 days" */
  expiry: string
}

export type TermsUpdate = {
  effective: string
  changes: string[]
}
