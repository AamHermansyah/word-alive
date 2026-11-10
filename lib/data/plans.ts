import type { BibleVersion, Plan } from "@/types"

/**
 * Prices that are `null` render the "[YOUR PRICE]" placeholder exactly as the
 * mockup does. Fill them in here and the Usage page updates everywhere.
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
    monthlyPrice: null,
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
    monthlyPrice: null,
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
  { code: "KJV", name: "King James Version", language: "English", inUse: true },
  { code: "NLT", name: "New Living Translation", language: "English", inUse: true },
  { code: "ESV", name: "English Standard Version", language: "English", inUse: true },
  { code: "NIV", name: "New International Version", language: "English", inUse: true },
  { code: "NKJV", name: "New King James Version", language: "English", inUse: true },
]

export const BIBLE_VERSION_LIMIT = 5
