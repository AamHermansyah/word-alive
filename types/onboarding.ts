import type { Plan } from "@/types"

/** How the plan is billed; annual charges 10 of 12 months. */
export type BillingPeriod = "monthly" | "annual"

export type PlanId = Plan["id"]

/** Colour family of a round status icon or pill (all map to design tokens). */
export type StatusTone = "success" | "warning" | "danger" | "info" | "brand"

/** Short facts about a plan that the plan pickers show under its name. */
export type PlanBlurb = {
  /** "12 talk hours · 5 Bible versions" */
  summary: string
  /** Order summary row, e.g. "12 each month" */
  talkHours: string
  /** Order summary row, e.g. "5" or "All available" */
  bibleVersions: string
}

/** The person and church that is setting up WordAlive. */
export type OnboardingProfile = {
  name: string
  email: string
  city: string
  country: string
  language: string
  bibleVersion: string
  licence: string
}

export type SetupStep = {
  id: string
  title: string
  /** Shown on phones and tablets, where the steps sit in one short row. */
  short: string
  /** Shown beside the form on desktop. */
  long: string
}

export type DeviceDescription = {
  label: string
  name: string
  detail: string
}

export type AccountStateAction = {
  label: string
  href: string
  variant: "default" | "outline"
}

/** One of the account / subscription state cards. */
export type AccountState = {
  id: "grace" | "expired" | "paused"
  tone: StatusTone
  badge: { label: string; variant: "warning" | "destructive" | "neutral" }
  title: string
  description: string
  action: AccountStateAction
}
