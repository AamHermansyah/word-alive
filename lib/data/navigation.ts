export type NavKey = "live" | "songs" | "bible" | "usage" | "settings"

export const NAV_ITEMS: { key: NavKey; href: string; label: string }[] = [
  { key: "live", href: "/live", label: "Live console" },
  { key: "songs", href: "/songs", label: "Song library" },
  { key: "bible", href: "/bible", label: "Bible versions" },
  { key: "usage", href: "/usage", label: "Usage and plan" },
  { key: "settings", href: "/settings", label: "Settings" },
]

export const CURRENT_USER = { name: "Grace Chapel", initials: "GC" }
