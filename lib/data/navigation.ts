export type NavKey = "live" | "songs" | "bible" | "usage" | "settings"

/** Category an app page belongs to; used by the all-pages floating menu. */
export type NavGroup = "Service" | "Library" | "Account"

/**
 * Every page of the app, in one place. The sidebar renders it flat and the
 * floating page switcher groups it by `group`, so a new page added here shows
 * up in both. `shortLabel` is the one-word caption used by the phone tab bar.
 */
export const NAV_ITEMS: {
  key: NavKey
  href: string
  label: string
  shortLabel: string
  group: NavGroup
}[] = [
  { key: "live", href: "/live", label: "Live console", shortLabel: "Live", group: "Service" },
  { key: "songs", href: "/songs", label: "Song library", shortLabel: "Songs", group: "Library" },
  { key: "bible", href: "/bible", label: "Bible versions", shortLabel: "Bible", group: "Library" },
  { key: "usage", href: "/usage", label: "Usage and plan", shortLabel: "Plan", group: "Account" },
  { key: "settings", href: "/settings", label: "Settings", shortLabel: "Settings", group: "Account" },
]

/** NAV_ITEMS grouped by category, categories in order of first appearance. */
export const NAV_GROUPS = NAV_ITEMS.reduce<
  { group: NavGroup; items: typeof NAV_ITEMS }[]
>((groups, item) => {
  const existing = groups.find((entry) => entry.group === item.group)
  if (existing) existing.items.push(item)
  else groups.push({ group: item.group, items: [item] })
  return groups
}, [])

export const CURRENT_USER = { name: "Grace Chapel", initials: "GC" }
