/**
 * Mock data for the customer half of the admin console: overview, users,
 * payments and the support inbox (area: admin-customers). No "use client" here:
 * the constants are read by server pages and client components alike.
 */
import type {
  AdminAttentionItem,
  AdminPayment,
  AdminPaymentPeriodStats,
  AdminPaymentStatus,
  AdminPaymentStatusFilter,
  AdminPeriod,
  AdminRevenueBar,
  AdminStat,
  AdminSupportMessage,
  AdminTierUsage,
  AdminUser,
  AdminUserFilter,
  AdminUserStatus,
} from "@/types/admin-customers"

// ---- Dates (fixed "today" so server and client always agree) -----------------

/** The mock console's "now": 11 Nov 2026, 12:00. */
export const ADMIN_NOW = "2026-11-11T12:00"

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function parts(iso: string) {
  const [date, time = "00:00"] = iso.split("T")
  const [year, month, day] = date.split("-").map(Number)
  return { year, month, day, time }
}

/** "2026-12-03" -> "Dec 3". */
export function formatShortDate(iso: string) {
  const { month, day } = parts(iso)
  return `${MONTHS[month - 1]} ${day}`
}

/** "2026-11-07T10:42" -> "Nov 7, 10:42". */
export function formatDateTime(iso: string) {
  const { month, day, time } = parts(iso)
  return `${MONTHS[month - 1]} ${day}, ${time}`
}

/** Add whole days to an ISO date and return an ISO date. */
export function addDays(iso: string, days: number) {
  const { year, month, day } = parts(iso)
  return new Date(Date.UTC(year, month - 1, day + days))
    .toISOString()
    .slice(0, 10)
}

const PERIOD_DAYS: Record<AdminPeriod, number> = {
  "Last 7 days": 7,
  "Last 30 days": 30,
  "Last 90 days": 90,
}

/** ISO date-time before which a payment falls outside the period. */
export function periodCutoff(period: AdminPeriod) {
  const { year, month, day, time } = parts(ADMIN_NOW)
  const cutoff = new Date(Date.UTC(year, month - 1, day - PERIOD_DAYS[period]))
  return `${cutoff.toISOString().slice(0, 10)}T${time}`
}

export const ADMIN_PERIODS: readonly AdminPeriod[] = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
]

// ---- Users --------------------------------------------------------------------

export const ADMIN_USERS_TOTAL = "7,904"

export const ADMIN_USER_FILTERS: { value: AdminUserFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "trial", label: "Trial" },
  { value: "active", label: "Active" },
  { value: "expired", label: "Expired" },
  { value: "suspended", label: "Suspended" },
]

export const ADMIN_USER_STATUS_LABEL: Record<AdminUserStatus, string> = {
  trial: "Trial",
  active: "Active",
  expired: "Expired",
  suspended: "Suspended",
}

export const ADMIN_USERS: AdminUser[] = [
  {
    id: "grace-chapel",
    name: "Grace Chapel",
    email: "pastor@gracechapel.org",
    location: "Lagos, Nigeria",
    plan: "Starter",
    status: "active",
    hoursUsed: 2.5,
    hoursTotal: 12,
    lastActive: "2 min ago",
    renewal: { kind: "renews", date: "2026-12-03", billing: "monthly" },
    device: "Chrome on Windows",
    deviceSwitches: 1,
  },
  {
    id: "hope-assembly",
    name: "Hope Assembly",
    email: "admin@hopeassembly.org",
    location: "Accra, Ghana",
    plan: "Growth",
    status: "active",
    hoursUsed: 11,
    hoursTotal: 30,
    lastActive: "1 h ago",
    renewal: { kind: "renews", date: "2026-12-09", billing: "monthly" },
    device: "Safari on macOS",
    deviceSwitches: 0,
  },
  {
    id: "living-word",
    name: "Living Word Church",
    email: "media@livingword.org",
    location: "Nairobi, Kenya",
    plan: "Ministry",
    status: "active",
    hoursUsed: 46,
    hoursTotal: 80,
    lastActive: "3 h ago",
    renewal: { kind: "renews", date: "2026-11-28", billing: "annual" },
    device: "Edge on Windows",
    deviceSwitches: 2,
  },
  {
    id: "redeemed-fellowship",
    name: "Redeemed Fellowship",
    email: "office@redeemed.org",
    location: "Abuja, Nigeria",
    plan: "Starter",
    status: "expired",
    hoursUsed: 12,
    hoursTotal: 12,
    lastActive: "Oct 2",
    renewal: { kind: "ended", date: "2026-10-02" },
    device: "Chrome on Windows",
    deviceSwitches: 0,
  },
  {
    id: "mount-zion",
    name: "Mount Zion Parish",
    email: "tech@mountzion.org",
    location: "Kumasi, Ghana",
    plan: "Growth",
    status: "suspended",
    hoursUsed: 4,
    hoursTotal: 30,
    lastActive: "Sep 28",
    renewal: { kind: "paused", date: "2026-09-28" },
    device: "Firefox on Windows",
    deviceSwitches: 1,
  },
  {
    id: "pastor-james",
    name: "Pastor James O.",
    email: "james@example.org",
    location: "Port Harcourt, Nigeria",
    plan: "Trial",
    status: "trial",
    hoursUsed: 0.6,
    hoursTotal: 1,
    lastActive: "Yesterday",
    renewal: { kind: "trial", date: "2026-11-12" },
    device: "Chrome on Android",
    deviceSwitches: 0,
  },
  {
    id: "city-light",
    name: "City Light Church",
    email: "av@citylight.org",
    location: "Durban, South Africa",
    plan: "Growth",
    status: "active",
    hoursUsed: 19,
    hoursTotal: 30,
    lastActive: "Yesterday",
    renewal: { kind: "renews", date: "2026-12-14", billing: "monthly" },
    device: "Chrome on macOS",
    deviceSwitches: 1,
  },
]

/** Label above and value of the renewal line in the user panel. */
export function describeRenewal(user: AdminUser): {
  caption: string
  value: string
} {
  const date = formatShortDate(user.renewal.date)
  switch (user.renewal.kind) {
    case "renews":
      return {
        caption: "Renews",
        value: `${date}, ${user.renewal.billing ?? "monthly"}`,
      }
    case "ended":
      return { caption: "Ended", value: date }
    case "trial":
      return { caption: "Trial ends", value: date }
    case "paused":
      return { caption: "Paused since", value: date }
  }
}

// ---- Payments -----------------------------------------------------------------

export const ADMIN_PAYMENT_STATUS_FILTERS: readonly AdminPaymentStatusFilter[] =
  ["All statuses", "Verified", "Failed", "Pending", "Refunded"]

export const ADMIN_PAYMENT_STATUS_LABEL: Record<AdminPaymentStatus, string> = {
  verified: "Verified",
  failed: "Failed",
  pending: "Pending",
  refunded: "Refunded",
}

export const ADMIN_PAYMENTS: AdminPayment[] = [
  {
    reference: "WA-8F2K41",
    customer: "Grace Chapel",
    email: "pastor@gracechapel.org",
    plan: "Starter",
    amount: "$29.99",
    status: "verified",
    paidAt: "2026-11-07T10:42",
    paystackRef: "PSK_3k1…q9",
  },
  {
    reference: "WA-7D0B93",
    customer: "Hope Assembly",
    email: "admin@hopeassembly.org",
    plan: "Growth",
    amount: "[PRICE]",
    status: "verified",
    paidAt: "2026-11-07T09:15",
    paystackRef: "PSK_8a7…d2",
  },
  {
    reference: "WA-6C4A22",
    customer: "Faith Tabernacle",
    email: "office@faithtabernacle.org",
    plan: "Starter",
    amount: "$29.99",
    status: "failed",
    paidAt: "2026-11-06T18:40",
    paystackRef: "PSK_1m4…x7",
  },
  {
    reference: "WA-5B9E10",
    customer: "Living Word Church",
    email: "media@livingword.org",
    plan: "Ministry",
    amount: "[PRICE]",
    status: "verified",
    paidAt: "2026-11-06T11:02",
    paystackRef: "PSK_9z2…c4",
  },
  {
    reference: "WA-4A1D07",
    customer: "City Light Church",
    email: "av@citylight.org",
    plan: "Growth",
    amount: "[PRICE]",
    status: "pending",
    paidAt: "2026-11-06T08:31",
    paystackRef: "PSK_5t6…n1",
  },
  {
    reference: "WA-3F8C55",
    customer: "Pastor James O.",
    email: "james@example.org",
    plan: "Starter",
    amount: "$29.99",
    status: "refunded",
    paidAt: "2026-11-05T15:20",
    paystackRef: "PSK_2w3…k8",
  },
  {
    reference: "WA-2E7B31",
    customer: "Redeemed Fellowship",
    email: "office@redeemed.org",
    plan: "Starter",
    amount: "$29.99",
    status: "verified",
    paidAt: "2026-11-03T12:05",
    paystackRef: "PSK_7p8…h3",
  },
  // Older than 30 days: only the "Last 90 days" period shows these.
  {
    reference: "WA-1D6A02",
    customer: "Mount Zion Parish",
    email: "tech@mountzion.org",
    plan: "Growth",
    amount: "[PRICE]",
    status: "verified",
    paidAt: "2026-10-02T14:10",
    paystackRef: "PSK_4c9…b6",
  },
  {
    reference: "WA-0C5F18",
    customer: "Gloryland Chapel",
    email: "office@gloryland.org",
    plan: "Starter",
    amount: "$29.99",
    status: "failed",
    paidAt: "2026-09-21T09:48",
    paystackRef: "PSK_6d2…m5",
  },
  {
    reference: "WA-0B3E77",
    customer: "Hope Assembly",
    email: "admin@hopeassembly.org",
    plan: "Growth",
    amount: "[PRICE]",
    status: "verified",
    paidAt: "2026-09-09T16:25",
    paystackRef: "PSK_0f8…t1",
  },
]

export const ADMIN_PAYMENT_STATS: Record<AdminPeriod, AdminPaymentPeriodStats> =
  {
    "Last 7 days": {
      verified: 268,
      failed: 4,
      failedRate: "1.5% of attempts",
      refunded: 1,
    },
    "Last 30 days": {
      verified: 1102,
      failed: 17,
      failedRate: "1.5% of attempts",
      refunded: 4,
    },
    "Last 90 days": {
      verified: 3246,
      failed: 51,
      failedRate: "1.5% of attempts",
      refunded: 12,
    },
  }

export const ADMIN_PAYMENT_WEBHOOK_ERRORS = 2

/** Rules shown by "View override rules". */
export const ADMIN_OVERRIDE_RULES: string[] = [
  "Only a Super Admin can mark a payment as verified.",
  "A payment that Paystack has confirmed never needs an override.",
  "A written reason is required, and you must confirm you checked the payment yourself.",
  "Every override is added to the audit log with your name and the reason.",
]

/** Payment the override route opens for reference (screen 75). */
export const ADMIN_OVERRIDE_REFERENCE = "WA-4A1D07"

// ---- Support ------------------------------------------------------------------

/** Handled messages older than the sample below, so the tab counts add up. */
export const ADMIN_SUPPORT_ARCHIVED_HANDLED = 9

export const ADMIN_SUPPORT_MESSAGES: AdminSupportMessage[] = [
  {
    id: "msg-tunde",
    name: "Tunde A.",
    email: "tunde@gracecenter.org",
    subject: "How do I add my church licence number?",
    body: "How do I add my church licence number? I cannot find where it goes.",
    status: "new",
    received: "Nov 7",
    receivedAt: "Nov 7, 09:12",
  },
  {
    id: "msg-mary",
    name: "Mary K.",
    email: "mary@hopechurch.org",
    subject: "My code did not arrive",
    body: "My code did not arrive. I asked for a sign-in code twice and nothing reached my inbox or my spam folder.",
    status: "new",
    received: "Nov 7",
    receivedAt: "Nov 7, 08:40",
  },
  {
    id: "msg-sam",
    name: "Pastor Sam",
    email: "sam@citylight.org",
    subject: "Can we use WordAlive on two screens?",
    body: "Can we use WordAlive on two screens? One for the stage monitor and one for the screen in the sanctuary.",
    status: "new",
    received: "Nov 6",
    receivedAt: "Nov 6, 17:05",
  },
  {
    id: "msg-ngozi",
    name: "Ngozi E.",
    email: "ngozi@livingword.org",
    subject: "Receipt for October",
    body: "Please send me the receipt for October. We need it for our church accounts.",
    status: "handled",
    received: "Nov 5",
    receivedAt: "Nov 5, 11:20",
  },
  {
    id: "msg-daniel",
    name: "Daniel O.",
    email: "daniel@example.org",
    subject: "Song missing from the library",
    body: "I looked for a song we sing every Sunday and could not find it in the library. Can you add it?",
    status: "handled",
    received: "Nov 4",
    receivedAt: "Nov 4, 14:33",
  },
]

// ---- Overview -----------------------------------------------------------------

type OverviewPeriodData = {
  stats: AdminStat[]
  chartTitle: string
  chartLabel: string
  bars: AdminRevenueBar[]
}

function bars(prefix: string, amounts: number[]): AdminRevenueBar[] {
  return amounts.map((amount, index) => ({
    label: `${prefix} ${index + 1}`,
    amount,
    highlighted: index >= amounts.length - 2,
  }))
}

const EXPIRING: AdminStat = {
  label: "Expiring in 14 days",
  value: "63",
  note: "Reminders sent",
  tone: "warning",
}

export const ADMIN_OVERVIEW: Record<AdminPeriod, OverviewPeriodData> = {
  "Last 7 days": {
    stats: [
      {
        label: "Active subscriptions",
        value: "1,284",
        note: "+38 this week",
        tone: "success",
      },
      {
        label: "Verified revenue, 7 days",
        value: "$9,115",
        note: "Successful payments only",
        tone: "muted",
      },
      {
        label: "Trials started",
        value: "52",
        note: "29% convert to paid",
        tone: "success",
      },
      EXPIRING,
    ],
    chartTitle: "Verified revenue, daily",
    chartLabel: "Daily verified revenue over 7 days, rising",
    bars: bars("Day", [1180, 1320, 1090, 1460, 1380, 1650, 1830]),
  },
  "Last 30 days": {
    stats: [
      {
        label: "Active subscriptions",
        value: "1,284",
        note: "+142 this month",
        tone: "success",
      },
      {
        label: "Verified revenue, 30 days",
        value: "$38,420",
        note: "Successful payments only",
        tone: "muted",
      },
      {
        label: "Trials started",
        value: "214",
        note: "31% convert to paid",
        tone: "success",
      },
      EXPIRING,
    ],
    chartTitle: "Verified revenue, weekly",
    chartLabel: "Weekly verified revenue over 12 weeks, rising",
    bars: bars(
      "Week",
      [2400, 2880, 2640, 3360, 3120, 3840, 3600, 4160, 3920, 4720, 4480, 5200]
    ),
  },
  "Last 90 days": {
    stats: [
      {
        label: "Active subscriptions",
        value: "1,284",
        note: "+391 in 90 days",
        tone: "success",
      },
      {
        label: "Verified revenue, 90 days",
        value: "$109,870",
        note: "Successful payments only",
        tone: "muted",
      },
      {
        label: "Trials started",
        value: "611",
        note: "33% convert to paid",
        tone: "success",
      },
      EXPIRING,
    ],
    chartTitle: "Verified revenue, weekly",
    chartLabel:
      "Weekly verified revenue over 12 weeks, rising with a dip in week 7",
    bars: bars(
      "Week",
      [6100, 6900, 6500, 7400, 7100, 8200, 6800, 8800, 8400, 9600, 9100, 10800]
    ),
  },
}

export const ADMIN_TIERS: AdminTierUsage[] = [
  {
    id: "starter",
    name: "Starter",
    count: "842",
    percent: 66,
    tone: "primary",
  },
  { id: "growth", name: "Growth", count: "351", percent: 28, tone: "brand" },
  { id: "ministry", name: "Ministry", count: "91", percent: 8, tone: "info" },
  {
    id: "trial",
    name: "Free trial",
    count: "96 active",
    percent: 10,
    tone: "muted",
  },
]

export const ADMIN_ATTENTION: AdminAttentionItem[] = [
  {
    id: "latency",
    text: "Speech provider latency is above target",
    action: "Open",
    href: "/admin/health",
    severity: "warning",
  },
  {
    id: "webhooks",
    text: "2 payment webhook failures",
    action: "Review",
    href: "/admin/payments",
    severity: "danger",
  },
  {
    id: "takedowns",
    text: "2 song takedown requests waiting",
    action: "Review",
    href: "/admin/songs/takedowns",
    severity: "warning",
  },
  {
    id: "trials",
    text: "7 trial sign-ups flagged for review",
    action: "Review",
    href: "/admin/users",
    severity: "warning",
  },
]

// ---- Authenticator (set-up and recovery) --------------------------------------

export const ADMIN_RECOVERY_CODES = [
  "A7K2-9QX4",
  "M3B8-1ZP6",
  "T5C9-4HW2",
  "R6D1-8YN7",
]

export const ADMIN_DEMO_LOGIN = {
  email: "ada@wordalive.app",
  password: "demo-admin",
  code: "482 913",
}
