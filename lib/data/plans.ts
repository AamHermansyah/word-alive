import type { BibleVersion, Plan } from "@/types"

/**
 * Monthly prices are mock values (USD). Replace them with the real prices
 * here and the Usage page updates everywhere. A `null` price still renders the
 * "[YOUR PRICE]" placeholder from the original mockup.
 */
export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    badge: { label: "Current plan", variant: "neutral" },
    monthlyPrice: 29.99,
    features: [
      "12 talk hours each month",
      "5 Bible versions",
      "Unlimited songs from the shared library",
      "One active device",
    ],
    cta: "Your current plan",
    current: true,
  },
  {
    id: "growth",
    name: "Growth",
    badge: { label: "Most popular", variant: "brand" },
    monthlyPrice: 59.99,
    features: [
      "30 talk hours each month",
      "15 Bible versions",
      "Unlimited songs from the shared library",
      "One active device",
    ],
    cta: "Upgrade to Growth",
    highlighted: true,
  },
  {
    id: "ministry",
    name: "Ministry",
    monthlyPrice: 119.99,
    features: [
      "80 talk hours each month (fair use)",
      "All available Bible versions",
      "Unlimited songs from the shared library",
      "One active device",
    ],
    cta: "Choose Ministry",
  },
]

/** Annual billing = 2 months free, i.e. 10 months charged over 12. */
export const ANNUAL_FACTOR = 10 / 12

export const TALK_HOURS = { total: 12, used: 2.5 }

export const BIBLE_VERSIONS: BibleVersion[] = [
  { code: "KJV", name: "King James Version", language: "English", rights: "public-domain", inUse: true },
  { code: "NKJV", name: "New King James Version", language: "English", rights: "licensed", inUse: true },
  { code: "NLT", name: "New Living Translation", language: "English", rights: "licensed", inUse: true },
  { code: "NIV", name: "New International Version", language: "English", rights: "licensed", inUse: true },
  { code: "ESV", name: "English Standard Version", language: "English", rights: "licensed", inUse: true },
  { code: "NASB", name: "New American Standard Bible", language: "English", rights: "licensed", inUse: false, requiresPlan: "Growth" },
  { code: "AMP", name: "Amplified Bible", language: "English", rights: "licensed", inUse: false, requiresPlan: "Growth" },
  { code: "MSG", name: "The Message", language: "English", rights: "licensed", inUse: false, requiresPlan: "Growth" },
]

/** The version shown on the audience screen until the church picks another. */
export const DEFAULT_BIBLE_VERSION = "KJV"

/** How many Bible versions the next plan up (Growth) includes. */
export const UPGRADE_BIBLE_VERSIONS = 15

export const BIBLE_VERSION_LIMIT = 5
