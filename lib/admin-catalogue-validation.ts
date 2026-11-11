/** Rules for the plain-text number inputs of the admin catalogue forms. */
export type AdminNumberRule = {
  /** Whole numbers only. */
  integer?: boolean
  /** "All" is a valid value (Bible versions allowed). */
  allowAll?: boolean
  /** A "[YOUR PRICE]" style placeholder stays valid as text. */
  allowPlaceholder?: boolean
  /** Comma separated whole numbers ("7, 3, 1"). */
  list?: boolean
  max?: number
}

const NUMBER = /^-?\d+(\.\d+)?$/
const PLACEHOLDER = /^\[[^\]]+\]$/

/** Error message for a field, or `null` when the value is fine. */
export function validateAdminNumber(
  raw: string,
  rule: AdminNumberRule = {}
): string | null {
  const value = raw.trim()
  if (!value) return "Required"
  if (rule.allowPlaceholder && PLACEHOLDER.test(value)) return null
  if (rule.allowAll && value.toLowerCase() === "all") return null

  if (rule.list) {
    const parts = value.split(",").map((part) => part.trim())
    const valid = parts.every((part) => /^\d+$/.test(part))
    return valid ? null : "Use whole numbers separated by commas, like 7, 3, 1"
  }

  if (!NUMBER.test(value)) {
    if (rule.allowAll) return "Enter a number or All"
    if (rule.allowPlaceholder) return "Enter a price"
    return "Enter a number"
  }

  const number = Number(value)
  if (number < 0) return "Can't be negative"
  if (rule.integer && !Number.isInteger(number)) return "Use a whole number"
  if (rule.max !== undefined && number > rule.max) {
    return `Can't be more than ${rule.max}`
  }
  return null
}

/** How many Bible versions a limit allows: "All" is unlimited. */
export function parseVersionLimit(raw: string): number {
  const value = raw.trim()
  if (value.toLowerCase() === "all") return Number.POSITIVE_INFINITY
  const number = Number(value)
  return Number.isFinite(number) && number >= 0 ? number : 0
}

/** Lower-case, accent-free text for searching ("Ọlọ́run" matches "olorun"). */
export function foldForSearch(text: string): string {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
}
