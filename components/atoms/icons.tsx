import * as React from "react"
import {
  ArrowLeftRightIcon,
  BadgeCheckIcon,
  BookOpenTextIcon,
  CircleAlertIcon,
  ClockIcon,
  CpuIcon,
  CreditCardIcon,
  FileTextIcon,
  FileXIcon,
  GlobeIcon,
  HistoryIcon,
  HouseIcon,
  InboxIcon,
  KeyRoundIcon,
  LanguagesIcon,
  LayoutDashboardIcon,
  Link2Icon,
  ListChecksIcon,
  LogInIcon,
  MailCheckIcon,
  MicOffIcon,
  ReceiptIcon,
  ScaleIcon,
  SearchIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  SparklesIcon,
  TagIcon,
  TextQuoteIcon,
  TriangleAlertIcon,
  UserPlusIcon,
  UsersIcon,
  ActivityIcon,
  DatabaseIcon,
  HourglassIcon,
  Trash2Icon,
  FileCheckIcon,
  MusicIcon as LucideMusicIcon,
  type LucideIcon,
} from "lucide-react"

import type { NavKey } from "@/lib/data/navigation"

import { cn } from "@/lib/utils"

/**
 * Icon set copied path-for-path from the mockup so strokes match exactly
 * (lucide's equivalents differ by a pixel or two). Every icon inherits
 * `currentColor` and uses the same 24px grid / 2px stroke as the mockup.
 */
function BaseIcon({
  className,
  children,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  )
}

type IconProps = React.ComponentProps<"svg">

export function MicIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </BaseIcon>
  )
}

export function MusicIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </BaseIcon>
  )
}

export function BookIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 4h14v16H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h12" />
    </BaseIcon>
  )
}

export function GaugeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 14l4-4M4 18a9 9 0 1 1 16 0" />
    </BaseIcon>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </BaseIcon>
  )
}

export function CheckMarkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12l5 5 9-10" />
    </BaseIcon>
  )
}

type NavIcon = LucideIcon | ((props: IconProps) => React.JSX.Element)

/**
 * Icon for every registered page (NavKey), used by the sidebar, the phone tab
 * bar, the admin sidebar and the floating page switcher. The five primary
 * pages use the mockup's own icons; everything else uses lucide.
 * Typed as Record<NavKey, …> so a page added to NAV_ITEMS cannot ship without one.
 */
export const NAV_ICONS: Record<NavKey, NavIcon> = {
  live: MicIcon,
  "live-trial": SparklesIcon,
  "live-first-run": MicOffIcon,
  "live-warnings": TriangleAlertIcon,
  history: HistoryIcon,
  "audience-link": Link2Icon,
  songs: MusicIcon,
  "song-detail": TextQuoteIcon,
  "my-songs": LucideMusicIcon,
  bible: BookIcon,
  "bible-trial": SparklesIcon,
  usage: GaugeIcon,
  billing: ReceiptIcon,
  settings: SettingsIcon,
  data: Trash2Icon,
  "terms-update": FileCheckIcon,
  "sign-in": LogInIcon,
  setup: UserPlusIcon,
  "confirm-email": MailCheckIcon,
  "trial-started": SparklesIcon,
  "trial-ended": HourglassIcon,
  plan: CreditCardIcon,
  "payment-result": BadgeCheckIcon,
  "account-status": CircleAlertIcon,
  "switch-device": ArrowLeftRightIcon,
  "switch-unavailable": SmartphoneIcon,
  "present-scripture": BookOpenTextIcon,
  "present-lyrics": TextQuoteIcon,
  "present-waiting": ClockIcon,
  "admin-login": KeyRoundIcon,
  "admin-2fa": ShieldCheckIcon,
  "admin-overview": LayoutDashboardIcon,
  "admin-users": UsersIcon,
  "admin-payments": CreditCardIcon,
  "admin-payment-override": BadgeCheckIcon,
  "admin-support": InboxIcon,
  "admin-pricing": TagIcon,
  "admin-coverage": GlobeIcon,
  "admin-bible": BookIcon,
  "admin-bible-source": DatabaseIcon,
  "admin-songs": MusicIcon,
  "admin-takedowns": ScaleIcon,
  "admin-seo": SearchIcon,
  "admin-legal": FileTextIcon,
  "admin-ai": CpuIcon,
  "admin-languages": LanguagesIcon,
  "admin-health": ActivityIcon,
  "admin-audit": ListChecksIcon,
  "admin-team": ShieldCheckIcon,
  home: HouseIcon,
  privacy: ShieldCheckIcon,
  terms: FileTextIcon,
  refund: ReceiptIcon,
  "not-found": FileXIcon,
}
