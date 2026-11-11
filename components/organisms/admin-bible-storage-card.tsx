import { AdminCatalogueCard } from "@/components/molecules/admin-catalogue-card"
import { AdminCatalogueField } from "@/components/molecules/admin-catalogue-field"
import { AdminCatalogueSelectField } from "@/components/molecules/admin-catalogue-select-field"
import { FormField } from "@/components/molecules/form-field"
import { Textarea } from "@/components/ui/textarea"
import { BIBLE_CACHE_POLICIES } from "@/lib/data/admin-catalogue"
import type { AdminBibleSourceSettings } from "@/types/admin-catalogue"

/** How long a passage may be cached and the copyright notice the licence requires. */
function AdminBibleStorageCard({
  value,
  onChange,
  errorFor,
  onTouch,
}: {
  value: AdminBibleSourceSettings
  onChange: (patch: Partial<AdminBibleSourceSettings>) => void
  errorFor: (key: keyof AdminBibleSourceSettings) => string | undefined
  onTouch: (key: keyof AdminBibleSourceSettings) => void
}) {
  const attributionError = errorFor("attribution")

  return (
    <AdminCatalogueCard title="Storage and attribution">
      <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
        <AdminCatalogueSelectField
          id="bible-source-cachePolicy"
          label="Cache policy"
          value={value.cachePolicy}
          options={BIBLE_CACHE_POLICIES}
          onValueChange={(cachePolicy) => onChange({ cachePolicy })}
        />
        <AdminCatalogueField
          id="bible-source-refreshLimit"
          label="Refresh limit"
          value={value.refreshLimit}
          error={errorFor("refreshLimit")}
          onChange={(event) => onChange({ refreshLimit: event.target.value })}
          onBlur={() => onTouch("refreshLimit")}
        />
        <FormField
          label="Attribution text"
          htmlFor="bible-source-attribution"
          className="sm:col-span-2"
        >
          <Textarea
            id="bible-source-attribution"
            value={value.attribution}
            aria-invalid={attributionError ? true : undefined}
            aria-describedby={
              attributionError ? "bible-source-attribution-error" : undefined
            }
            onChange={(event) => onChange({ attribution: event.target.value })}
            onBlur={() => onTouch("attribution")}
          />
          {attributionError ? (
            <p
              id="bible-source-attribution-error"
              role="alert"
              className="text-xs text-destructive"
            >
              {attributionError}
            </p>
          ) : null}
        </FormField>
      </div>
    </AdminCatalogueCard>
  )
}

export { AdminBibleStorageCard }
