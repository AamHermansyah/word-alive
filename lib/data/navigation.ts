/**
 * Every page of the app, registered once.
 *
 * Who reads this list:
 *  - the floating page switcher: ALL pages, grouped (see NAV_GROUPS);
 *  - the sidebar and phone tab bar: only `primary` pages of the `app` surface;
 *  - the admin sidebar: pages of the `admin` surface that have a `group`
 *    shown in the sidebar (`adminNav: true`);
 *  - the shells (app sidebar plan card, auth header note, page-switcher offset)
 *    through `getPage()`.
 *
 * To add a page: add one row here, add its icon to NAV_ICONS
 * (components/atoms/icons.tsx), create the route. Nothing else lists pages.
 */

/** Which frame the page is rendered in. */
export type NavSurface = "app" | "auth" | "audience" | "admin" | "site"

/** Category shown as a heading in the page switcher (and admin sidebar). */
export type NavGroup =
  | "Service"
  | "Library"
  | "Account"
  | "Get started"
  | "Audience screen"
  | "Access"
  | "Overview"
  | "Customers"
  | "Pricing"
  | "Content"
  | "Platform"
  | "Website"

export type NavKey =
  // customer app
  | "live"
  | "live-trial"
  | "live-first-run"
  | "live-warnings"
  | "history"
  | "songs"
  | "song-detail"
  | "my-songs"
  | "bible"
  | "bible-trial"
  | "usage"
  | "billing"
  | "settings"
  | "data"
  | "terms-update"
  // get started / account flow (auth surface)
  | "sign-in"
  | "setup"
  | "confirm-email"
  | "trial-started"
  | "trial-ended"
  | "plan"
  | "payment-result"
  | "account-status"
  | "switch-device"
  | "switch-unavailable"
  | "audience-link"
  // audience screen
  | "present-scripture"
  | "present-lyrics"
  | "present-waiting"
  // admin
  | "admin-login"
  | "admin-2fa"
  | "admin-overview"
  | "admin-users"
  | "admin-payments"
  | "admin-payment-override"
  | "admin-support"
  | "admin-pricing"
  | "admin-coverage"
  | "admin-bible"
  | "admin-bible-source"
  | "admin-songs"
  | "admin-takedowns"
  | "admin-seo"
  | "admin-legal"
  | "admin-ai"
  | "admin-languages"
  | "admin-health"
  | "admin-audit"
  | "admin-team"
  // public website
  | "home"
  | "privacy"
  | "terms"
  | "refund"
  | "not-found"

export type NavItem = {
  key: NavKey
  href: string
  label: string
  /** One-word caption for the phone tab bar. */
  shortLabel: string
  group: NavGroup
  surface: NavSurface
  /** Shown in the app sidebar / phone tab bar. */
  primary?: boolean
  /** Shown in the admin sidebar. */
  adminNav?: boolean
  /** Sidebar entry that stays highlighted while this page is open. */
  parent?: NavKey
  /** Where this sidebar entry points while the user is on a free-trial page. */
  trialHref?: string
  /** Sidebar plan card variant for this page (default: paid plan). */
  plan?: "trial"
  /** Right-hand note in the auth header, e.g. "Step 2 of 2 · Confirm your email". */
  headerNote?: string
  /** Makes the header note a link (for pages with no other way back). */
  headerNoteHref?: string
}

export const NAV_ITEMS: NavItem[] = [
  // ---- Service ------------------------------------------------------------
  { key: "live", href: "/live", label: "Live console", shortLabel: "Live", group: "Service", surface: "app", primary: true, trialHref: "/live/trial" },
  { key: "live-trial", href: "/live/trial", label: "Live console · free trial", shortLabel: "Trial", group: "Service", surface: "app", parent: "live", plan: "trial" },
  { key: "live-first-run", href: "/live/first-run", label: "Console · first run and microphone", shortLabel: "First run", group: "Service", surface: "app", parent: "live" },
  { key: "live-warnings", href: "/live/warnings", label: "Console · warnings and degraded modes", shortLabel: "Warnings", group: "Service", surface: "app", parent: "live" },
  { key: "history", href: "/history", label: "Service history", shortLabel: "History", group: "Service", surface: "app", parent: "live" },
  { key: "audience-link", href: "/audience-link", label: "Audience link", shortLabel: "Link", group: "Service", surface: "auth", headerNote: "Live console", headerNoteHref: "/live" },

  // ---- Library ------------------------------------------------------------
  { key: "songs", href: "/songs", label: "Song library", shortLabel: "Songs", group: "Library", surface: "app", primary: true },
  { key: "song-detail", href: "/songs/amazing-grace", label: "Song detail", shortLabel: "Song", group: "Library", surface: "app", parent: "songs" },
  { key: "my-songs", href: "/songs/mine", label: "My songs", shortLabel: "Mine", group: "Library", surface: "app", parent: "songs" },
  { key: "bible", href: "/bible", label: "Bible versions", shortLabel: "Bible", group: "Library", surface: "app", primary: true, trialHref: "/bible/trial" },
  { key: "bible-trial", href: "/bible/trial", label: "Bible versions · free trial", shortLabel: "Trial", group: "Library", surface: "app", parent: "bible", plan: "trial" },

  // ---- Account ------------------------------------------------------------
  { key: "usage", href: "/usage", label: "Usage and plan", shortLabel: "Plan", group: "Account", surface: "app", primary: true },
  { key: "billing", href: "/billing", label: "Billing and receipts", shortLabel: "Billing", group: "Account", surface: "app", parent: "usage" },
  { key: "settings", href: "/settings", label: "Settings", shortLabel: "Settings", group: "Account", surface: "app", primary: true },
  { key: "data", href: "/settings/data", label: "Export and delete data", shortLabel: "Data", group: "Account", surface: "app", parent: "settings" },
  { key: "terms-update", href: "/terms-update", label: "Terms update", shortLabel: "Terms", group: "Account", surface: "app", parent: "live" },

  // ---- Get started (sign in, trial, payment, device) ---------------------
  { key: "sign-in", href: "/sign-in", label: "Sign in", shortLabel: "Sign in", group: "Get started", surface: "auth", headerNote: "Sign in" },
  { key: "setup", href: "/setup", label: "Set up", shortLabel: "Set up", group: "Get started", surface: "auth", headerNote: "Step 1 of 2 · Your details" },
  { key: "confirm-email", href: "/confirm-email", label: "Confirm email", shortLabel: "Confirm", group: "Get started", surface: "auth", headerNote: "Step 2 of 2 · Confirm your email" },
  { key: "trial-started", href: "/trial/started", label: "Free trial started", shortLabel: "Trial", group: "Get started", surface: "auth", headerNote: "Welcome" },
  { key: "trial-ended", href: "/trial/ended", label: "Trial ended", shortLabel: "Ended", group: "Get started", surface: "auth", headerNote: "Trial ended" },
  { key: "plan", href: "/plan", label: "Plan and payment", shortLabel: "Payment", group: "Get started", surface: "auth", headerNote: "Choose your plan" },
  { key: "payment-result", href: "/payment/result", label: "Payment result", shortLabel: "Result", group: "Get started", surface: "auth", headerNote: "Payment" },
  { key: "account-status", href: "/account-status", label: "Account and subscription states", shortLabel: "Status", group: "Get started", surface: "auth", headerNote: "Account status" },
  { key: "switch-device", href: "/switch-device", label: "Switch device", shortLabel: "Device", group: "Get started", surface: "auth", headerNote: "Switch device" },
  { key: "switch-unavailable", href: "/switch-device/unavailable", label: "Switch not available", shortLabel: "Device", group: "Get started", surface: "auth", headerNote: "Switch device" },

  // ---- Audience screen (projector) ---------------------------------------
  { key: "present-scripture", href: "/present/scripture", label: "Audience screen · scripture", shortLabel: "Scripture", group: "Audience screen", surface: "audience" },
  { key: "present-lyrics", href: "/present/lyrics", label: "Audience screen · lyrics", shortLabel: "Lyrics", group: "Audience screen", surface: "audience" },
  { key: "present-waiting", href: "/present/waiting", label: "Audience screen · waiting", shortLabel: "Waiting", group: "Audience screen", surface: "audience" },

  // ---- Admin --------------------------------------------------------------
  { key: "admin-login", href: "/admin/login", label: "Admin login", shortLabel: "Login", group: "Access", surface: "admin" },
  { key: "admin-2fa", href: "/admin/setup-2fa", label: "Authenticator setup and recovery", shortLabel: "2FA", group: "Access", surface: "admin" },
  { key: "admin-overview", href: "/admin", label: "Overview", shortLabel: "Overview", group: "Overview", surface: "admin", adminNav: true },
  { key: "admin-users", href: "/admin/users", label: "Users", shortLabel: "Users", group: "Customers", surface: "admin", adminNav: true },
  { key: "admin-payments", href: "/admin/payments", label: "Payments", shortLabel: "Payments", group: "Customers", surface: "admin", adminNav: true },
  { key: "admin-payment-override", href: "/admin/payments/override", label: "Payment override", shortLabel: "Override", group: "Customers", surface: "admin", parent: "admin-payments" },
  { key: "admin-support", href: "/admin/support", label: "Support inbox", shortLabel: "Support", group: "Customers", surface: "admin", adminNav: true },
  { key: "admin-pricing", href: "/admin/pricing", label: "Plans and pricing", shortLabel: "Pricing", group: "Pricing", surface: "admin", adminNav: true },
  { key: "admin-coverage", href: "/admin/coverage", label: "Coverage", shortLabel: "Coverage", group: "Pricing", surface: "admin", adminNav: true },
  { key: "admin-bible", href: "/admin/bible", label: "Bible translations", shortLabel: "Bible", group: "Content", surface: "admin", adminNav: true },
  { key: "admin-bible-source", href: "/admin/bible/niv", label: "Bible source (API)", shortLabel: "Source", group: "Content", surface: "admin", parent: "admin-bible" },
  { key: "admin-songs", href: "/admin/songs", label: "Song catalogue", shortLabel: "Songs", group: "Content", surface: "admin", adminNav: true },
  { key: "admin-takedowns", href: "/admin/songs/takedowns", label: "Takedown requests", shortLabel: "Takedowns", group: "Content", surface: "admin", parent: "admin-songs" },
  { key: "admin-seo", href: "/admin/seo", label: "Landing SEO", shortLabel: "SEO", group: "Content", surface: "admin", adminNav: true },
  { key: "admin-legal", href: "/admin/legal", label: "Legal pages", shortLabel: "Legal", group: "Content", surface: "admin", adminNav: true },
  { key: "admin-ai", href: "/admin/ai", label: "AI providers", shortLabel: "AI", group: "Platform", surface: "admin", adminNav: true },
  { key: "admin-languages", href: "/admin/languages", label: "Languages", shortLabel: "Languages", group: "Platform", surface: "admin", adminNav: true },
  { key: "admin-health", href: "/admin/health", label: "System health", shortLabel: "Health", group: "Platform", surface: "admin", adminNav: true },
  { key: "admin-audit", href: "/admin/audit", label: "Audit log", shortLabel: "Audit", group: "Platform", surface: "admin", adminNav: true },
  { key: "admin-team", href: "/admin/team", label: "Admin team", shortLabel: "Team", group: "Platform", surface: "admin", adminNav: true },

  // ---- Public website -----------------------------------------------------
  { key: "home", href: "/", label: "Homepage", shortLabel: "Home", group: "Website", surface: "site" },
  { key: "privacy", href: "/privacy", label: "Privacy policy", shortLabel: "Privacy", group: "Website", surface: "site" },
  { key: "terms", href: "/terms", label: "Terms of service", shortLabel: "Terms", group: "Website", surface: "site" },
  { key: "refund", href: "/refund", label: "Refund policy", shortLabel: "Refund", group: "Website", surface: "site" },
  // No route exists on purpose: opening it renders app/not-found.tsx.
  { key: "not-found", href: "/page-not-found", label: "Page not found (404)", shortLabel: "404", group: "Website", surface: "site" },
]

/** Pages in the app sidebar / phone tab bar. */
export const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter(
  (item) => item.surface === "app" && item.primary
)

/** Pages in the admin sidebar, grouped by category in order of appearance. */
export const ADMIN_NAV_GROUPS = NAV_ITEMS.filter(
  (item) => item.surface === "admin" && item.adminNav
).reduce<{ group: NavGroup; items: NavItem[] }[]>((groups, item) => {
  const existing = groups.find((entry) => entry.group === item.group)
  if (existing) existing.items.push(item)
  else groups.push({ group: item.group, items: [item] })
  return groups
}, [])

const SURFACE_LABEL: Record<NavSurface, string | null> = {
  app: null,
  auth: null,
  audience: null,
  admin: "Admin",
  site: null,
}

/** One block of the page switcher: a surface + group with its pages. */
export type SwitcherGroup = { id: string; label: string; items: NavItem[] }

/** NAV_ITEMS grouped for the floating switcher, in order of first appearance. */
export const NAV_GROUPS = NAV_ITEMS.reduce<SwitcherGroup[]>((groups, item) => {
  const prefix = SURFACE_LABEL[item.surface]
  const id = item.group
  const existing = groups.find((entry) => entry.id === id)
  if (existing) existing.items.push(item)
  else
    groups.push({
      id,
      label: prefix ? `${prefix} · ${item.group}` : item.group,
      items: [item],
    })
  return groups
}, [])

/** Strip a trailing slash so "/live/" and "/live" match the same page. */
function normalise(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname
}

/** The registered page for a pathname (exact match only), if any. */
export function getPage(pathname: string): NavItem | undefined {
  const path = normalise(pathname)
  return NAV_ITEMS.find((item) => item.href === path)
}

/**
 * Key of the sidebar entry that should look active for a pathname: the page
 * itself, or its `parent` (e.g. /billing keeps "Usage and plan" highlighted).
 * Unregistered sub-paths fall back to the longest registered prefix.
 */
export function getActiveKey(pathname: string): NavKey | undefined {
  const path = normalise(pathname)
  const exact = getPage(path)
  if (exact) return exact.parent ?? exact.key
  const prefix = NAV_ITEMS.filter(
    (item) => item.href !== "/" && path.startsWith(`${item.href}/`)
  ).sort((a, b) => b.href.length - a.href.length)[0]
  return prefix ? (prefix.parent ?? prefix.key) : undefined
}

export const CURRENT_USER = { name: "Grace Chapel", initials: "GC" }

export const CURRENT_ADMIN = {
  name: "Ada O.",
  initials: "AO",
  role: "Super Admin",
}
