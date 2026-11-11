import { FormField } from "@/components/molecules/form-field"
import { SelectField } from "@/components/molecules/select-field"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { COUNTRIES } from "@/lib/data/settings"
import type { AccountSettings } from "@/types"

/** Who the church is: name, email, city, country, optional music licence. */
function AccountSettingsCard({
  value,
  onChange,
}: {
  value: AccountSettings
  onChange: (patch: Partial<AccountSettings>) => void
}) {
  return (
    <Card className="min-w-0 gap-0">
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="text-[15px] font-bold md:text-base">
          Account
        </CardTitle>

        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          <FormField label="Name of church or individual" htmlFor="account-name">
            <Input
              id="account-name"
              autoComplete="organization"
              value={value.name}
              onChange={(event) => onChange({ name: event.target.value })}
            />
          </FormField>

          <FormField label="Email" htmlFor="account-email">
            <Input
              id="account-email"
              type="email"
              autoComplete="email"
              value={value.email}
              onChange={(event) => onChange({ email: event.target.value })}
            />
          </FormField>

          <FormField label="City" htmlFor="account-city">
            <Input
              id="account-city"
              autoComplete="address-level2"
              value={value.city}
              onChange={(event) => onChange({ city: event.target.value })}
            />
          </FormField>

          <SelectField
            id="account-country"
            label="Country"
            value={value.country}
            onValueChange={(country) => onChange({ country })}
            options={COUNTRIES}
          />

          <FormField
            label="Church music licence number (optional)"
            htmlFor="account-licence"
            className="sm:col-span-2"
          >
            <Input
              id="account-licence"
              value={value.licence}
              onChange={(event) => onChange({ licence: event.target.value })}
            />
          </FormField>
        </div>
      </CardContent>
    </Card>
  )
}

export { AccountSettingsCard }
