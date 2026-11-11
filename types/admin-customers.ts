/** Types for the customer-facing half of the admin console (area: admin-customers). */

/** Reporting window shared by the overview and the payments list. */
export type AdminPeriod = "Last 7 days" | "Last 30 days" | "Last 90 days"

// ---- Users ------------------------------------------------------------------

export type AdminUserPlan = "Trial" | "Starter" | "Growth" | "Ministry"
export type AdminUserStatus = "trial" | "active" | "expired" | "suspended"
export type AdminUserFilter = "all" | AdminUserStatus

export type AdminUserRenewal = {
  /** What the date means: next renewal, end of a lapsed plan, end of a trial… */
  kind: "renews" | "ended" | "trial" | "paused"
  /** ISO date (yyyy-mm-dd). */
  date: string
  billing?: "monthly" | "annual"
}

export type AdminUser = {
  id: string
  name: string
  email: string
  location: string
  plan: AdminUserPlan
  status: AdminUserStatus
  hoursUsed: number
  hoursTotal: number
  /** Already phrased for the table ("2 min ago", "Oct 2", "Yesterday"). */
  lastActive: string
  renewal: AdminUserRenewal
  /** `null` once the device was reset: the next sign-in claims a new one. */
  device: string | null
  deviceSwitches: number
}

// ---- Payments ---------------------------------------------------------------

export type AdminPaymentStatus = "verified" | "failed" | "pending" | "refunded"
export type AdminPaymentPlan = "Starter" | "Growth" | "Ministry"
export type AdminPaymentStatusFilter =
  "All statuses" | "Verified" | "Failed" | "Pending" | "Refunded"

export type AdminPayment = {
  /** WordAlive reference, e.g. WA-8F2K41. */
  reference: string
  customer: string
  email: string
  plan: AdminPaymentPlan
  /** Shown as written: "$29.99" or the "[PRICE]" placeholder. */
  amount: string
  status: AdminPaymentStatus
  /** ISO local date-time (yyyy-mm-ddThh:mm). */
  paidAt: string
  paystackRef: string
}

export type AdminPaymentPeriodStats = {
  verified: number
  failed: number
  failedRate: string
  refunded: number
}

// ---- Support ----------------------------------------------------------------

export type AdminSupportStatus = "new" | "handled"
export type AdminSupportFilter = "all" | AdminSupportStatus

export type AdminSupportMessage = {
  id: string
  name: string
  email: string
  /** First line of the message, shown in the list. */
  subject: string
  /** Full text, shown in the detail panel. */
  body: string
  status: AdminSupportStatus
  /** Short date for the list ("Nov 7"). */
  received: string
  /** Full timestamp for the detail panel ("Nov 7, 09:12"). */
  receivedAt: string
}

// ---- Overview ---------------------------------------------------------------

export type AdminStatTone = "success" | "muted" | "warning" | "danger"

export type AdminStat = {
  label: string
  value: string
  note: string
  tone: AdminStatTone
}

export type AdminRevenueBar = {
  label: string
  /** Verified revenue in whole dollars. */
  amount: number
  /** The most recent bars are drawn in the strong colour. */
  highlighted?: boolean
}

export type AdminTierTone = "primary" | "brand" | "info" | "muted"

export type AdminTierUsage = {
  id: string
  name: string
  /** What is printed at the end of the row ("842", "96 active"). */
  count: string
  /** Width of the bar, 0-100. */
  percent: number
  tone: AdminTierTone
}

export type AdminAttentionItem = {
  id: string
  text: string
  action: string
  href: string
  severity: "warning" | "danger"
}
