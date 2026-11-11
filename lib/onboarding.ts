import { DEFAULT_BILLING, DEFAULT_PLAN } from "@/lib/data/onboarding"
import { ANNUAL_FACTOR, PLANS } from "@/lib/data/plans"
import type { Plan } from "@/types"
import type { BillingPeriod, PlanId } from "@/types/onboarding"

/** Placeholder the mockup prints while a plan has no price yet. */
export const PRICE_PLACEHOLDER = "[YOUR PRICE]"

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

/**
 * Only same-site paths may be used as a "go here next" target, so a crafted
 * `?next=https://…` link cannot send someone to another site.
 */
export function safeNextPath(next: string | undefined, fallback: string) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback
  return next
}

/** 42 -> "0:42", 75 -> "1:15" */
export function formatCountdown(totalSeconds: number) {
  const seconds = Math.max(0, totalSeconds)
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, "0")}`
}

/** 1274 minutes -> "21 h 14 m" */
export function formatHoursMinutes(totalMinutes: number) {
  const minutes = Math.max(0, totalMinutes)
  return `${Math.floor(minutes / 60)} h ${minutes % 60} m`
}

export function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`
}

export function plural(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`
}

export function parsePlanId(value: string | undefined): PlanId {
  return PLANS.some((plan) => plan.id === value)
    ? (value as PlanId)
    : DEFAULT_PLAN
}

export function parseBilling(value: string | undefined): BillingPeriod {
  return value === "annual" || value === "monthly" ? value : DEFAULT_BILLING
}

export function getPlan(id: PlanId): Plan {
  return PLANS.find((plan) => plan.id === id) ?? PLANS[0]
}

/**
 * What a plan costs. `perMonth` is the figure shown on the plan row (annual
 * billing is cheaper per month), `total` is what is charged today (one month,
 * or a whole year). Both are `null` while the plan has no price yet.
 */
export function planPricing(plan: Plan, billing: BillingPeriod) {
  if (plan.monthlyPrice === null) return { perMonth: null, total: null }
  if (billing === "annual") {
    return {
      perMonth: plan.monthlyPrice * ANNUAL_FACTOR,
      total: plan.monthlyPrice * 12 * ANNUAL_FACTOR,
    }
  }
  return { perMonth: plan.monthlyPrice, total: plan.monthlyPrice }
}

/** A query-string value is a string, a list (repeated key) or missing. */
export function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}
