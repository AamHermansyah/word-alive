/** Public website: header links, footer columns and placeholder strings. */

export const SITE_NAV = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Bible versions", href: "/#bible-versions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Support", href: "/#support" },
] as const

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Bible versions", href: "/#bible-versions" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help centre", href: "/#support" },
      { label: "Contact us", href: "/#support" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund policy", href: "/refund" },
    ],
  },
] as const

/** Placeholders from the mockup; replace with the real values here. */
export const SITE_PLACEHOLDERS = {
  company: "[COMPANY NAME]",
  supportEmail: "[SUPPORT EMAIL]",
}
