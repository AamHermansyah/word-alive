export type ContentKind = "scripture" | "song"

/** What is currently on the audience screen. */
export type ScreenContent = {
  kind: ContentKind
  /** e.g. "John 3:16" or "Amazing Grace · stanza 2" */
  title: string
  /** Bible version code, scripture only */
  version?: string
  text: string
}

export type Suggestion = {
  id: string
  reference: string
  /** 0-100 */
  match: number
  /** Heard phrase that triggered the match */
  quote?: string
}

export type Stanza = {
  id: string
  number: number
  /** First line, shown in the follow list */
  firstLine: string
  text: string
}

export type SongFollow = {
  title: string
  author: string
  rights: string
  /** 0-100 */
  match: number
  stanzas: Stanza[]
}

export type ActivityItem = {
  id: string
  title: string
  kind: ContentKind
  time: string
  content: ScreenContent
}

export type SongRights = "public-domain" | "licensed" | "community" | "in-review"

export type Song = {
  id: string
  title: string
  author: string
  language: string
  rights: SongRights
  /** "1,204 churches" | "Only you" */
  usedBy: string
  inSet?: boolean
}

export type Plan = {
  id: "starter" | "growth" | "ministry"
  name: string
  badge?: { label: string; variant: "neutral" | "brand" }
  /** `null` renders the "[YOUR PRICE]" placeholder from the mockup. */
  monthlyPrice: number | null
  features: string[]
  cta: string
  current?: boolean
  highlighted?: boolean
}

/** Bible translations are either public domain or licensed. */
export type BibleRights = Extract<SongRights, "public-domain" | "licensed">

export type BibleVersion = {
  code: string
  name: string
  language: string
  rights: BibleRights
  /** Currently switched on for the church. */
  inUse: boolean
  /** Lowest plan that includes it; set only for versions the current plan lacks. */
  requiresPlan?: "Growth"
}

export type AccountSettings = {
  name: string
  email: string
  city: string
  country: string
  /** Church music licence number; optional, so it may be empty. */
  licence: string
}

export type ColourSchemeId = "classic" | "light" | "high-contrast"

export type ColourScheme = {
  id: ColourSchemeId
  label: string
  /** Preview colours of the audience screen (background tiles), not theme tokens. */
  swatches: [string, string]
}

export type PresentationSettings = {
  language: string
  /** Code of the default Bible version, e.g. "KJV". */
  bibleVersion: string
  scheme: ColourSchemeId
}

export type SettingsValues = {
  account: AccountSettings
  presentation: PresentationSettings
  /** Selected microphone input device. */
  microphone: string
}

