"use client"

import * as React from "react"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminCatalogueHistorySheet } from "@/components/organisms/admin-catalogue-history-sheet"
import {
  AdminPricingBillingCard,
  AdminPricingDeviceCard,
  AdminPricingTrialCard,
} from "@/components/organisms/admin-pricing-settings-cards"
import { AdminPricingTierCard } from "@/components/organisms/admin-pricing-tier-card"
import { Button } from "@/components/ui/button"
import { useAdminPricingForm } from "@/hooks/use-admin-pricing-form"
import { PRICING_PLAN_IDS } from "@/lib/admin-catalogue-pricing"

/**
 * Plans and pricing: one card per plan, then billing, device switching and the
 * free trial. "Save changes" stays disabled until something is edited.
 */
function AdminPricingTemplate() {
  const form = useAdminPricingForm()
  const [historyOpen, setHistoryOpen] = React.useState(false)
  const bindings = { errorFor: form.errorFor, onTouch: form.touch }

  return (
    <>
      <AdminPageHeader
        title="Plans and pricing"
        subtitle="Changes apply to new subscriptions and the landing page"
      >
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          onClick={() => setHistoryOpen(true)}
        >
          View history
        </Button>
        <Button
          className="flex-1 sm:flex-none"
          disabled={!form.dirty}
          onClick={form.save}
        >
          Save changes
        </Button>
      </AdminPageHeader>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {PRICING_PLAN_IDS.map((id) => (
          <AdminPricingTierCard
            key={id}
            id={id}
            className="lg:min-h-82.5"
            tier={form.draft.tiers[id]}
            onChange={(patch) => form.setTier(id, patch)}
            {...bindings}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        <AdminPricingBillingCard
          className="lg:min-h-75"
          value={form.draft.billing}
          onChange={form.setBilling}
          {...bindings}
        />
        <AdminPricingDeviceCard
          className="lg:min-h-75"
          value={form.draft.devices}
          onChange={form.setDevices}
          {...bindings}
        />
        <AdminPricingTrialCard
          className="lg:min-h-75"
          value={form.draft.trial}
          onChange={form.setTrial}
          {...bindings}
        />
      </div>

      <AdminCatalogueHistorySheet
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        title="Pricing history"
        description="Saved changes to plans, billing, device switching and the free trial."
        entries={form.history}
      />
    </>
  )
}

export { AdminPricingTemplate }
