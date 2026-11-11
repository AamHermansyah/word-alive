import { AdminCatalogueCard } from "@/components/molecules/admin-catalogue-card"
import { AdminCatalogueField } from "@/components/molecules/admin-catalogue-field"
import { AdminCatalogueSwitch } from "@/components/molecules/admin-catalogue-switch"
import type { PricingFieldBindings } from "@/components/organisms/admin-pricing-tier-card"
import { pricingFieldId } from "@/lib/admin-catalogue-pricing"
import type {
  AdminBillingSettings,
  AdminDeviceSettings,
  AdminTrialSettings,
} from "@/types/admin-catalogue"

/** Annual discount, renewal reminders and the grace period after a failed renewal. */
function AdminPricingBillingCard({
  value,
  onChange,
  errorFor,
  onTouch,
  className,
}: PricingFieldBindings & {
  className?: string
  value: AdminBillingSettings
  onChange: (patch: Partial<AdminBillingSettings>) => void
}) {
  const field = (
    key: keyof AdminBillingSettings,
    label: string,
    inputMode?: "numeric"
  ) => {
    const path = `billing.${key}`
    return (
      <AdminCatalogueField
        id={pricingFieldId(path)}
        label={label}
        value={value[key]}
        inputMode={inputMode}
        error={errorFor(path)}
        onChange={(event) => onChange({ [key]: event.target.value })}
        onBlur={() => onTouch(path)}
      />
    )
  }

  return (
    <AdminCatalogueCard title="Billing and renewals" className={className}>
      <div className="flex flex-col gap-3">
        {field(
          "annualDiscountMonths",
          "Annual plan discount (months free)",
          "numeric"
        )}
        {field("renewalReminders", "Renewal reminders (days before)")}
        {field("graceDays", "Grace period (days)", "numeric")}
      </div>
    </AdminCatalogueCard>
  )
}

/** How often a church may move its subscription to another device. */
function AdminPricingDeviceCard({
  value,
  onChange,
  errorFor,
  onTouch,
  className,
}: PricingFieldBindings & {
  className?: string
  value: AdminDeviceSettings
  onChange: (patch: Partial<AdminDeviceSettings>) => void
}) {
  const field = (key: keyof AdminDeviceSettings, label: string) => {
    const path = `devices.${key}`
    return (
      <AdminCatalogueField
        id={pricingFieldId(path)}
        label={label}
        value={value[key]}
        inputMode="numeric"
        error={errorFor(path)}
        onChange={(event) => onChange({ [key]: event.target.value })}
        onBlur={() => onTouch(path)}
      />
    )
  }

  return (
    <AdminCatalogueCard title="Device switching" className={className}>
      <div className="flex flex-col gap-3">
        {field("switchIntervalDays", "Days between self-service switches")}
        {field("switchesPerYear", "Switches allowed per year")}
        {field("emergencyDelayHours", "Emergency switch delay (hours)")}
      </div>
    </AdminCatalogueCard>
  )
}

/** The free trial offer: on/off and what a trial includes. */
function AdminPricingTrialCard({
  value,
  onChange,
  errorFor,
  onTouch,
  className,
}: PricingFieldBindings & {
  className?: string
  value: AdminTrialSettings
  onChange: (patch: Partial<AdminTrialSettings>) => void
}) {
  const field = (
    key: "days" | "talkHours" | "bibleVersions" | "startsPerDay",
    label: string
  ) => {
    const path = `trial.${key}`
    return (
      <AdminCatalogueField
        id={pricingFieldId(path)}
        label={label}
        value={value[key]}
        disabled={!value.enabled}
        error={errorFor(path)}
        onChange={(event) => onChange({ [key]: event.target.value })}
        onBlur={() => onTouch(path)}
      />
    )
  }

  return (
    <AdminCatalogueCard title="Free trial" className={className}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="min-w-0 text-[13px] text-muted-foreground">
          Offer new sign-ups a trial
        </span>
        <AdminCatalogueSwitch
          aria-label="Free trial on"
          checked={value.enabled}
          onCheckedChange={(enabled) => onChange({ enabled })}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        {field("days", "Days")}
        {field("talkHours", "Talk hours")}
        {field("bibleVersions", "Bible versions")}
        {field("startsPerDay", "Starts per day")}
      </div>
    </AdminCatalogueCard>
  )
}

export {
  AdminPricingBillingCard,
  AdminPricingDeviceCard,
  AdminPricingTrialCard,
}
