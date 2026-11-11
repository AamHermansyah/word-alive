/** Types for the public website (homepage and legal pages). */

/** Heading block shared by every homepage section. */
export type SiteSectionCopy = {
  /** Anchor id used by the header and footer links (`/#<id>`). */
  id?: string
  eyebrow: string
  title: string
  description: string
}

export type SiteIconName =
  | "book"
  | "music"
  | "shield"
  | "sliders"
  | "monitor"
  | "mail"
  | "help"
  | "phone"

export type HomeHeroContent = {
  badge: string
  titleLead: string
  titleAccent: string
  lead: string
  primaryCta: string
  secondaryCta: string
  note: string
  verse: { text: string; reference: string }
  stanza: { caption: string; line: string }
}

export type HomeFeature = {
  id: string
  icon: SiteIconName
  /** `brand` = maroon (scriptures), `info` = navy (songs). */
  tone: "brand" | "info"
  title: string
  description: string
  /** The little sample slide at the bottom of the card. */
  sample: { label: string; meta: string }
}

export type HomeStep = {
  title: string
  description: string
}

export type HomeBibleVersion = {
  code: string
  name: string
}

export type HomeLibraryStat = {
  value: string
  label: string
}

export type HomeTrustItem = {
  icon: SiteIconName
  title: string
  description: string
}

export type HomeFaqItem = {
  id: string
  question: string
  answer: string
}

export type HomeContactMethod = {
  icon: SiteIconName
  label: string
  value: string
}

/** One numbered block of a legal page (the number comes from its position). */
export type LegalSection = {
  /** Anchor id, also used by the "On this page" list. */
  id: string
  heading: string
  paragraphs: string[]
}

export type LegalDocument = {
  slug: "privacy" | "terms" | "refund"
  /** Page title, e.g. "Privacy Policy". */
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}
