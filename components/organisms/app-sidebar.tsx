import { BrandMark } from "@/components/atoms/brand-mark"
import { NavItem } from "@/components/molecules/nav-item"
import { SidebarPlanCard } from "@/components/molecules/sidebar-plan-card"
import { NAV_ITEMS } from "@/lib/data/navigation"
import { TALK_HOURS } from "@/lib/data/plans"

/**
 * Primary navigation.
 *  - < md (phones):         fixed bottom tab bar, icon + short label
 *  - md → xl (tablet mockup): 76px icon rail
 *  - ≥ xl (desktop mockup): 232px wide, logo + labels + plan card
 */
function AppSidebar() {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 flex w-full shrink-0 items-center border-t border-sidebar-border bg-sidebar px-2 pb-[env(safe-area-inset-bottom)] md:sticky md:inset-x-auto md:top-0 md:bottom-auto md:z-auto md:h-dvh md:overflow-y-auto md:w-19 md:flex-col md:border-t-0 md:border-e md:px-0 md:py-6 xl:w-58 xl:items-stretch xl:px-4">
      <div className="mb-7 hidden items-center gap-2.5 md:flex xl:mb-1 xl:px-2 xl:pb-6">
        <BrandMark />
        <span className="hidden text-lg font-bold xl:inline">WordAlive</span>
      </div>

      <nav
        aria-label="Main"
        className="flex w-full items-stretch justify-between gap-1 py-1.5 md:w-auto md:flex-col md:items-center md:justify-start md:gap-2 md:py-0 xl:items-stretch xl:gap-1"
      >
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.key}
            href={item.href}
            label={item.label}
            shortLabel={item.shortLabel}
            navKey={item.key}
          />
        ))}
      </nav>

      <div className="hidden xl:contents">
        <SidebarPlanCard
          planName="Starter plan"
          hoursLeft={TALK_HOURS.total - TALK_HOURS.used}
          hoursTotal={TALK_HOURS.total}
        />
      </div>
    </aside>
  )
}

export { AppSidebar }
