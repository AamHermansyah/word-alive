import { BrandMark } from "@/components/atoms/brand-mark"
import { NavItem } from "@/components/molecules/nav-item"
import { SidebarPlanCard } from "@/components/molecules/sidebar-plan-card"
import { NAV_ITEMS } from "@/lib/data/navigation"
import { TALK_HOURS } from "@/lib/data/plans"

/**
 * Primary navigation.
 *  - ≥ xl (desktop mockup): 232px wide, logo + labels + plan card
 *  - < xl (tablet mockup):  76px icon rail
 */
function AppSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-19 shrink-0 flex-col items-center border-e border-sidebar-border bg-sidebar py-6 xl:w-58 xl:items-stretch xl:px-4">
      <div className="mb-7 flex items-center gap-2.5 xl:mb-1 xl:px-2 xl:pb-6">
        <BrandMark />
        <span className="hidden text-lg font-bold xl:inline">WordAlive</span>
      </div>

      <nav
        aria-label="Main"
        className="flex flex-col items-center gap-2 xl:items-stretch xl:gap-1"
      >
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.key}
            href={item.href}
            label={item.label}
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
