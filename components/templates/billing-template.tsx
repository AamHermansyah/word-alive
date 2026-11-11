import { CurrentPlanCard } from "@/components/organisms/current-plan-card"
import { ReceiptsCard } from "@/components/organisms/receipts-card"
import { Topbar } from "@/components/organisms/topbar"
import { BILLING, RECEIPTS } from "@/lib/data/account"

/**
 * Billing and receipts.
 *   desktop: current plan | receipts side by side
 *   tablet and phone: current plan, then receipts
 */
function BillingTemplate() {
  return (
    <>
      <Topbar
        title="Billing and receipts"
        subtitle="Manage your plan and payments"
      />

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start">
        <CurrentPlanCard billing={BILLING} className="xl:flex-1" />
        <ReceiptsCard receipts={RECEIPTS} className="xl:flex-[1.86]" />
      </div>
    </>
  )
}

export { BillingTemplate }
