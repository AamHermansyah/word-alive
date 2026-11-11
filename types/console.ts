/** Colour family of a console banner / status tile. */
export type ConsoleTone = "warning" | "danger" | "info"

export type ConsoleBannerIcon =
  | "clock"
  | "alert"
  | "wifi"
  | "globe"
  | "book"
  | "chip"

/** What the action at the end of a banner does: go to a page, or toast. */
export type ConsoleBannerAction = {
  label: string
  href?: string
  /** Toast shown instead of navigating (for actions that stay on the page). */
  toast?: string
}

/** One warning / degraded-mode notice shown in the console. */
export type ConsoleBannerItem = {
  id: string
  tone: ConsoleTone
  icon: ConsoleBannerIcon
  title: string
  description: string
  action?: ConsoleBannerAction
}

/**
 * Where the first-run microphone permission stands.
 *  - `ask`        : nothing asked yet
 *  - `requesting` : the browser prompt is open
 *  - `allowed`    : granted (the stream is released straight away)
 *  - `blocked`    : denied, or no usable microphone
 */
export type MicPermission = "ask" | "requesting" | "allowed" | "blocked"

/** One scripture or song shown during a past service. */
export type ServiceItem = {
  id: string
  label: string
  time: string
}

export type ServiceRecord = {
  id: string
  /** "Sun, Nov 2" */
  date: string
  /** Start time, "10:02" */
  startTime: string
  /** "1 h 12 m" */
  length: string
  /** "1.2 h" */
  hours: string
  scriptures: number
  songs: number
  items: ServiceItem[]
}

export type HistorySummary = {
  services: number
  /** Items the audience screen showed this cycle. */
  itemsShown: number
  /** "Dec 7" */
  resetsOn: string
}

/** A scripture slide on the projector. */
export type ScriptureSlide = {
  reference: string
  versionCode: string
  versionName: string
  rights: string
  text: string
  /** BCP 47 tag of the passage, so the browser picks matching glyphs. */
  lang: string
}

/** A song stanza on the projector. */
export type LyricsSlide = {
  /** "Amazing Grace · Stanza 2" */
  heading: string
  text: string
  lang: string
}
