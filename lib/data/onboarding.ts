import { DEFAULT_BIBLE_VERSION, TRIAL } from "@/lib/data/plans"
import type {
  AccountState,
  BillingPeriod,
  DeviceDescription,
  OnboardingProfile,
  PlanBlurb,
  PlanId,
  SetupStep,
} from "@/types/onboarding"

/**
 * Mock data for the sign-in / set-up / trial / payment / device flow. There is
 * no backend: these are the values the mockup shows, kept in one place so a
 * real source can replace them later.
 */

/** Pre-filled details the mockup shows on the sign-in and set-up forms. */
export const DEMO_PROFILE: OnboardingProfile = {
  name: "Grace Chapel",
  email: "pastor@gracechapel.org",
  city: "Lagos",
  country: "Nigeria",
  language: "English",
  bibleVersion: DEFAULT_BIBLE_VERSION,
  licence: "",
}

/** Seconds before a new email code can be requested. */
export const RESEND_SECONDS = 42

/** Where each flow goes after the email code is confirmed. */
export const AFTER_SIGN_IN = "/live"
export const AFTER_SETUP = "/trial/started"

/** A code that is always rejected, so the "wrong code" state can be seen. */
export const REJECTED_CODE = "000000"

export const SETUP_STEPS: SetupStep[] = [
  {
    id: "confirm",
    title: "Confirm your email",
    short: "A 6-digit code, once.",
    long: "Enter a 6-digit code, once, on this device.",
  },
  {
    id: "trial",
    title: "Start your free trial",
    short: "7 days, no card.",
    long: `${TRIAL.days} days, ${TRIAL.hoursTotal} hour of talk time and ${TRIAL.bibleVersions} Bible version. No card.`,
  },
  {
    id: "live",
    title: "Go live",
    short: "No password needed.",
    long: "WordAlive opens straight to the console every time, with no password.",
  },
]

/** The sample slide on the set-up page: the church's own Bible version. */
export const SETUP_VERSE = {
  text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  reference: "John 3:16",
  version: "KJV",
}

/** What the free trial used before it ended (shown on the trial-ended page). */
export const TRIAL_SUMMARY = {
  hoursUsed: 0.8,
  hoursTotal: TRIAL.hoursTotal,
  services: 2,
  songs: 3,
}

/** One-line description of each plan for the pickers and the order summary. */
export const PLAN_BLURBS: Record<PlanId, PlanBlurb> = {
  starter: {
    summary: "12 talk hours · 5 Bible versions",
    talkHours: "12 each month",
    bibleVersions: "5",
  },
  growth: {
    summary: "30 talk hours · 15 Bible versions",
    talkHours: "30 each month",
    bibleVersions: "15",
  },
  ministry: {
    summary: "80 talk hours (fair use) · all versions",
    talkHours: "80 each month (fair use)",
    bibleVersions: "All available",
  },
}

export const DEFAULT_PLAN: PlanId = "starter"
export const DEFAULT_BILLING: BillingPeriod = "monthly"

export const BILLING_OPTIONS: { value: BillingPeriod; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual · 2 months free" },
]

/** The payment that the result page confirms. */
export const PAYMENT = {
  reference: "WA-8F2K41",
  /** Seconds the "Confirming your payment" state shows before the result. */
  confirmMs: 1500,
  nextRenewal: { monthly: "Dec 7", annual: "Nov 7, 2027" } satisfies Record<
    BillingPeriod,
    string
  >,
}

/** The three account / subscription states shown on /account-status. */
export const ACCOUNT_STATES: AccountState[] = [
  {
    id: "grace",
    tone: "warning",
    badge: { label: "Grace period", variant: "warning" },
    title: "Your payment did not go through",
    description:
      "Your access continues until Nov 14. Update your payment to stay active.",
    action: { label: "Update payment", href: "/plan", variant: "default" },
  },
  {
    id: "expired",
    tone: "danger",
    badge: { label: "Expired", variant: "destructive" },
    title: "Your subscription has ended",
    description: "Your songs and settings are saved. Renew to go live again.",
    action: { label: "Renew now", href: "/plan", variant: "default" },
  },
  {
    id: "paused",
    tone: "info",
    badge: { label: "Paused", variant: "neutral" },
    title: "Your account is paused",
    description: "Please contact support so we can help. Reference ACC-3F82.",
    action: { label: "Contact support", href: "/#support", variant: "outline" },
  },
]

/** Switch-device page: the device that is signed in and the one asking. */
export const CURRENT_DEVICE: DeviceDescription = {
  label: "Signed in now",
  name: "Chrome on Windows",
  detail: "Last active today",
}

export const NEW_DEVICE: DeviceDescription = {
  label: "This device",
  name: "Safari on iPad",
  detail: "New device",
}

export const DEVICE_SWITCHES = { left: 5, total: 6 }

/** Switch-not-available page. */
export const SWITCH_COOLDOWN = { nextSwitch: "Dec 3" }

/** Minutes until an emergency switch is ready (24 h wait, 21 h 14 m left). */
export const EMERGENCY_SWITCH_MINUTES = 21 * 60 + 14
