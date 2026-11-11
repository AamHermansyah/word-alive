import { SITE_PLACEHOLDERS } from "@/lib/data/site"
import type {
  HomeBibleVersion,
  HomeContactMethod,
  HomeFaqItem,
  HomeFeature,
  HomeHeroContent,
  HomeLibraryStat,
  HomeStep,
  HomeTrustItem,
  SiteSectionCopy,
} from "@/types/site"

/**
 * Homepage copy, word for word from the mockup. The `id` of a section is the
 * anchor the header and footer link to (`/#features`, `/#pricing`, ...).
 */

export const HOME_HERO: HomeHeroContent = {
  badge: "Bible scriptures and worship lyrics",
  titleLead: "Your church presentation,",
  titleAccent: "automatically.",
  lead: "Let AI listen, understand and display Bible scriptures and worship lyrics on your church screen, while you focus on the ministry.",
  primaryCta: "Start free trial",
  secondaryCta: "See how it works",
  note: "7-day free trial · No card · No password",
  verse: {
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    reference: "John 3:16 · KJV",
  },
  stanza: {
    caption: "Stanza 2 of 4 · Matched 94%",
    line: "’Twas grace that taught my heart to fear",
  },
}

export const HOME_SECTIONS = {
  features: {
    id: "features",
    eyebrow: "What it does",
    title: "Scriptures and lyrics, on screen when you need them",
    description: "Two jobs, done well.",
  },
  steps: {
    id: "how-it-works",
    eyebrow: "How it works",
    title: "Three steps to your first service",
    description: "No training, no operator.",
  },
  versions: {
    id: "bible-versions",
    eyebrow: "Bible versions",
    title: "Read it in the version your church uses",
    description: "Switch version by voice or with one tap.",
  },
  library: {
    eyebrow: "Shared song library",
    title: "Search a song. It’s probably already there.",
    description: "Churches share songs once, and every church can find them.",
  },
  pricing: {
    id: "pricing",
    eyebrow: "Pricing",
    title: "Pick the plan that fits your services",
    description: "Pay monthly, or annually and get two months free.",
  },
  trust: {
    eyebrow: "Built for live services",
    title: "Calm, accurate and in your hands",
    description: "Made for the people who run Sunday.",
  },
  faq: {
    id: "faq",
    eyebrow: "FAQ",
    title: "Questions, answered",
    description: "Can’t find yours? Ask us below.",
  },
  support: {
    id: "support",
    eyebrow: "Support",
    title: "We’re here to help",
    description: "Talk to a real person about setup, billing or your service.",
  },
} satisfies Record<string, SiteSectionCopy>

export const HOME_FEATURES: HomeFeature[] = [
  {
    id: "scriptures",
    icon: "book",
    tone: "brand",
    title: "Scriptures",
    description:
      "Say a reference or quote a verse. WordAlive finds it, checks it against the Bible text, and shows it. Say “next verse” to move on.",
    sample: { label: "John 3:16", meta: "KJV" },
  },
  {
    id: "lyrics",
    icon: "music",
    tone: "info",
    title: "Song lyrics",
    description:
      "WordAlive recognises the song as your team sings and follows each stanza on screen. Search the shared library or add your own.",
    sample: { label: "Stanza 2 of 4", meta: "94% match" },
  },
]

export const HOME_STEPS: HomeStep[] = [
  {
    title: "Open the app",
    description: "Open WordAlive and tap Speak now.",
  },
  {
    title: "Let it listen",
    description: "WordAlive listens and finds the scripture or song.",
  },
  {
    title: "See it appear",
    description: "It shows on your church screen, ready to read.",
  },
]

export const HOME_BIBLE_VERSIONS: HomeBibleVersion[] = [
  { code: "KJV", name: "King James Version" },
  { code: "NKJV", name: "New King James" },
  { code: "NIV", name: "New International" },
  { code: "NLT", name: "New Living" },
  { code: "ESV", name: "English Standard" },
  { code: "NASB", name: "New American Standard" },
  { code: "AMP", name: "Amplified Bible" },
  { code: "MSG", name: "The Message" },
  { code: "GNT", name: "Good News" },
  { code: "CSB", name: "Christian Standard" },
  { code: "NET", name: "New English" },
  { code: "CEV", name: "Contemporary English" },
]

export const HOME_VERSIONS_NOTE =
  "Which versions your church gets depends on your plan and the licences we hold."

export const HOME_LIBRARY_STATS: HomeLibraryStat[] = [
  { value: "48,200", label: "songs to search" },
  { value: "1,240", label: "churches sharing" },
  { value: "Free", label: "to search and use" },
]

export const HOME_PRICING_NOTE =
  "Every plan starts with a 7-day free trial: 1 hour of talk time and 1 Bible version, no card. A running service is never cut off. Bible versions depend on the licences we hold."

export const HOME_TRUST_ITEMS: HomeTrustItem[] = [
  {
    icon: "shield",
    title: "Verified scripture text",
    description: "Verses come from licensed Bible text, never written by AI.",
  },
  {
    icon: "sliders",
    title: "You stay in control",
    description: "Override anything with one tap, or switch to manual mode.",
  },
  {
    icon: "monitor",
    title: "Works in your browser",
    description: "Install it as an app. No password, no special hardware.",
  },
]

/**
 * Only the first answer is visible in the mockup (the others are collapsed);
 * the rest are written from the Terms, Privacy and plan pages so they agree.
 */
export const HOME_FAQ: HomeFaqItem[] = [
  {
    id: "how-it-works",
    question: "How does WordAlive work?",
    answer:
      "Tap Speak now and WordAlive listens through your microphone. It finds Bible references and songs and shows them on your church screen. You can always override it by hand.",
  },
  {
    id: "bible-versions",
    question: "Which Bible versions are included?",
    answer:
      "Starter includes 5 Bible versions, Growth includes 15 and Ministry includes all available versions. Which ones your church gets depends on your plan and the licences we hold.",
  },
  {
    id: "internet",
    question: "What if the internet drops?",
    answer:
      "Whatever is already on your church screen stays there. WordAlive reconnects by itself when the internet is back, and you can keep going in manual mode in the meantime.",
  },
  {
    id: "audio",
    question: "Is my audio stored?",
    answer:
      "No. WordAlive listens only after you tap Speak now and processes audio live to find scriptures and songs. We do not store recordings by default.",
  },
  {
    id: "devices",
    question: "Can I use it on more than one device?",
    answer:
      "Each subscription works on one device at a time. When you switch devices, the old one is signed out.",
  },
  {
    id: "talk-hours",
    question: "How do talk hours work?",
    answer:
      "Talk hours are the time WordAlive spends listening during your billing cycle. Each plan includes a set number, unused hours do not roll over, and a service that is already running is never cut off.",
  },
]

export const HOME_CONTACT_METHODS: HomeContactMethod[] = [
  { icon: "mail", label: "Email us", value: SITE_PLACEHOLDERS.supportEmail },
  { icon: "help", label: "Help centre", value: "[HELP CENTRE LINK]" },
  { icon: "phone", label: "Call us", value: "[SUPPORT PHONE]" },
]

export const HOME_CLOSING = {
  title: "Start your free trial of WordAlive",
  description: "7 days free. No card, no password.",
  cta: "Start free trial",
}
