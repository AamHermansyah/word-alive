import { AdminCatalogueCard } from "@/components/molecules/admin-catalogue-card"
import { AdminCatalogueField } from "@/components/molecules/admin-catalogue-field"
import { AdminCatalogueSelectField } from "@/components/molecules/admin-catalogue-select-field"
import { AdminCatalogueSwitch } from "@/components/molecules/admin-catalogue-switch"
import { pricingFieldId } from "@/lib/admin-catalogue-pricing"
import { CURRENCIES } from "@/lib/data/admin-catalogue"
import type { AdminPlanId, AdminPricingTier } from "@/types/admin-catalogue"

/** Shared by every pricing card: how a field reports errors and being left. */
export type PricingFieldBindings = {
  errorFor: (path: string) => string | undefined
  onTouch: (path: string) => void
}

/**
 * One plan: active switch, talk hours, Bible versions, both prices and the
 * currency. A plan that is switched off keeps its values but its fields are
 * locked, so it cannot be half edited.
 */
function AdminPricingTierCard({
  id,
  tier,
  onChange,
  errorFor,
  onTouch,
  className,
}: PricingFieldBindings & {
  className?: string
  id: AdminPlanId
  tier: AdminPricingTier
  onChange: (patch: Partial<AdminPricingTier>) => void
}) {
  const field = (
    key: "talkHours" | "bibleVersions" | "monthlyPrice" | "annualPrice",
    label: string,
    inputMode?: "decimal"
  ) => {
    const path = `tiers.${id}.${key}`
    return (
      <AdminCatalogueField
        id={pricingFieldId(path)}
        label={label}
        value={tier[key]}
        inputMode={inputMode}
        disabled={!tier.active}
        error={errorFor(path)}
        onChange={(event) => onChange({ [key]: event.target.value })}
        onBlur={() => onTouch(path)}
      />
    )
  }

  return (
    <AdminCatalogueCard
      titleSize="tier"
      className={className}
      title={tier.name}
      action={
        <AdminCatalogueSwitch
          aria-label={`${tier.name} active`}
          checked={tier.active}
          onCheckedChange={(active) => onChange({ active })}
        />
      }
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        {field("talkHours", "Talk hours / month", "decimal")}
        {field("bibleVersions", "Bible versions")}
        {field("monthlyPrice", "Monthly price")}
        {field("annualPrice", "Annual price")}
        <AdminCatalogueSelectField
          id={pricingFieldId(`tiers.${id}.currency`)}
          label="Currency"
          value={tier.currency}
          options={CURRENCIES}
          disabled={!tier.active}
          onValueChange={(currency) => onChange({ currency })}
        />
      </div>
    </AdminCatalogueCard>
  )
}

export { AdminPricingTierCard }
