import type { AdminNumberRule } from "@/lib/admin-catalogue-validation"
import type {
  AdminChangeEntry,
  AdminPlanId,
  AdminPricingValues,
} from "@/types/admin-catalogue"

export const PRICING_PLAN_IDS: AdminPlanId[] = ["starter", "growth", "ministry"]

/** DOM id of the control for a field path ("tiers.starter.talkHours"). */
export function pricingFieldId(path: string) {
  return `pricing-${path.replaceAll(".", "-")}`
}

const COUNT: AdminNumberRule = { integer: true }
const PRICE: AdminNumberRule = { allowPlaceholder: true }

/** One editable value of the pricing form, flattened for validation and history. */
export type PricingField = {
  /** "tiers.starter.talkHours": also the key of its error message. */
  path: string
  /** Card the field sits in ("Starter", "Free trial"…). */
  group: string
  label: string
  value: string | boolean
  /** Only text fields have a rule. */
  rule?: AdminNumberRule
  /** A switched-off plan or trial keeps its values but skips validation. */
  enabled: boolean
}

/** Every field of the pricing form, in reading order. */
export function describePricing(values: AdminPricingValues): PricingField[] {
  const fields: PricingField[] = []

  for (const id of PRICING_PLAN_IDS) {
    const tier = values.tiers[id]
    const group = tier.name
    const base = `tiers.${id}`
    fields.push(
      {
        path: `${base}.active`,
        group,
        label: "Active",
        value: tier.active,
        enabled: true,
      },
      {
        path: `${base}.talkHours`,
        group,
        label: "Talk hours / month",
        value: tier.talkHours,
        rule: {},
        enabled: tier.active,
      },
      {
        path: `${base}.bibleVersions`,
        group,
        label: "Bible versions",
        value: tier.bibleVersions,
        rule: { ...COUNT, allowAll: true },
        enabled: tier.active,
      },
      {
        path: `${base}.monthlyPrice`,
        group,
        label: "Monthly price",
        value: tier.monthlyPrice,
        rule: PRICE,
        enabled: tier.active,
      },
      {
        path: `${base}.annualPrice`,
        group,
        label: "Annual price",
        value: tier.annualPrice,
        rule: PRICE,
        enabled: tier.active,
      },
      {
        path: `${base}.currency`,
        group,
        label: "Currency",
        value: tier.currency,
        enabled: tier.active,
      }
    )
  }

  const billing = "Billing and renewals"
  fields.push(
    {
      path: "billing.annualDiscountMonths",
      group: billing,
      label: "Annual plan discount (months free)",
      value: values.billing.annualDiscountMonths,
      rule: { ...COUNT, max: 11 },
      enabled: true,
    },
    {
      path: "billing.renewalReminders",
      group: billing,
      label: "Renewal reminders (days before)",
      value: values.billing.renewalReminders,
      rule: { list: true },
      enabled: true,
    },
    {
      path: "billing.graceDays",
      group: billing,
      label: "Grace period (days)",
      value: values.billing.graceDays,
      rule: COUNT,
      enabled: true,
    }
  )

  const devices = "Device switching"
  fields.push(
    {
      path: "devices.switchIntervalDays",
      group: devices,
      label: "Days between self-service switches",
      value: values.devices.switchIntervalDays,
      rule: COUNT,
      enabled: true,
    },
    {
      path: "devices.switchesPerYear",
      group: devices,
      label: "Switches allowed per year",
      value: values.devices.switchesPerYear,
      rule: COUNT,
      enabled: true,
    },
    {
      path: "devices.emergencyDelayHours",
      group: devices,
      label: "Emergency switch delay (hours)",
      value: values.devices.emergencyDelayHours,
      rule: COUNT,
      enabled: true,
    }
  )

  const trial = "Free trial"
  const on = values.trial.enabled
  fields.push(
    {
      path: "trial.enabled",
      group: trial,
      label: "Offer new sign-ups a trial",
      value: on,
      enabled: true,
    },
    {
      path: "trial.days",
      group: trial,
      label: "Days",
      value: values.trial.days,
      rule: COUNT,
      enabled: on,
    },
    {
      path: "trial.talkHours",
      group: trial,
      label: "Talk hours",
      value: values.trial.talkHours,
      rule: {},
      enabled: on,
    },
    {
      path: "trial.bibleVersions",
      group: trial,
      label: "Bible versions",
      value: values.trial.bibleVersions,
      rule: { ...COUNT, allowAll: true },
      enabled: on,
    },
    {
      path: "trial.startsPerDay",
      group: trial,
      label: "Starts per day",
      value: values.trial.startsPerDay,
      rule: COUNT,
      enabled: on,
    }
  )

  return fields
}

function printValue(value: string | boolean) {
  if (typeof value === "boolean") return value ? "on" : "off"
  return value.trim() || "empty"
}

/** Fields whose value differs between two versions of the form. */
export function diffPricing(
  before: AdminPricingValues,
  after: AdminPricingValues
): string[] {
  // Both lists come out in the same order, so fields pair up by position.
  const previous = describePricing(before)
  return describePricing(after).flatMap((field, index) => {
    const from = previous[index].value
    if (from === field.value) return []
    return [
      `${field.group} · ${field.label}: ${printValue(from)} → ${printValue(field.value)}`,
    ]
  })
}

/** A history entry for a save, named after the cards that changed. */
export function pricingHistoryEntry(
  who: string,
  before: AdminPricingValues,
  after: AdminPricingValues
): AdminChangeEntry | null {
  const changes = diffPricing(before, after)
  if (changes.length === 0) return null

  const groups = [...new Set(changes.map((change) => change.split(" · ")[0]))]
  return {
    id: `pricing-${Date.now()}`,
    who,
    when: "Just now",
    headline:
      groups.length <= 3 ? groups.join(", ") : `${changes.length} settings`,
    changes,
  }
}
