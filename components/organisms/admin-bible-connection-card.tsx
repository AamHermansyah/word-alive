import { FadeIn } from "@/components/atoms/fade-in"
import { AdminCatalogueCard } from "@/components/molecules/admin-catalogue-card"
import { AdminCatalogueField } from "@/components/molecules/admin-catalogue-field"
import { AdminCatalogueSelectField } from "@/components/molecules/admin-catalogue-select-field"
import { FormField } from "@/components/molecules/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BIBLE_SOURCE_KEY_MASK,
  BIBLE_SOURCE_PROVIDERS,
} from "@/lib/data/admin-catalogue"
import type { AdminBibleSourceSettings } from "@/types/admin-catalogue"

/**
 * Connection: provider, translation ID and the API key. The key is never
 * shown; "Replace key" swaps the masked field for an empty password field.
 */
function AdminBibleConnectionCard({
  value,
  onChange,
  errorFor,
  onTouch,
  replacingKey,
  newKey,
  onNewKeyChange,
  keyError,
  onStartReplacing,
  onCancelReplacing,
  onSaveKey,
}: {
  value: AdminBibleSourceSettings
  onChange: (patch: Partial<AdminBibleSourceSettings>) => void
  errorFor: (key: keyof AdminBibleSourceSettings) => string | undefined
  onTouch: (key: keyof AdminBibleSourceSettings) => void
  replacingKey: boolean
  newKey: string
  onNewKeyChange: (value: string) => void
  keyError?: string
  onStartReplacing: () => void
  onCancelReplacing: () => void
  onSaveKey: () => void
}) {
  return (
    <AdminCatalogueCard title="Connection">
      <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
        <AdminCatalogueSelectField
          id="bible-source-provider"
          label="Provider"
          value={value.provider}
          options={BIBLE_SOURCE_PROVIDERS}
          onValueChange={(provider) => onChange({ provider })}
        />
        <AdminCatalogueField
          id="bible-source-translationId"
          label="Translation ID"
          value={value.translationId}
          error={errorFor("translationId")}
          onChange={(event) => onChange({ translationId: event.target.value })}
          onBlur={() => onTouch("translationId")}
        />
      </div>

      <FormField
        label="API key"
        htmlFor="bible-source-api-key"
        className="mt-3"
      >
        <div className="flex flex-wrap gap-2.5 sm:flex-nowrap">
          {replacingKey ? (
            <FadeIn
              key="editing"
              className="min-w-0 flex-1 basis-full sm:basis-0"
            >
              <Input
                id="bible-source-api-key"
                type="password"
                autoComplete="off"
                autoFocus
                placeholder="Paste the new API key"
                value={newKey}
                aria-invalid={keyError ? true : undefined}
                aria-describedby={
                  keyError ? "bible-source-api-key-error" : undefined
                }
                onChange={(event) => onNewKeyChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") onSaveKey()
                  if (event.key === "Escape") onCancelReplacing()
                }}
              />
            </FadeIn>
          ) : (
            <Input
              id="bible-source-api-key"
              readOnly
              value={BIBLE_SOURCE_KEY_MASK}
              aria-label="API key (hidden)"
              className="min-w-0 flex-1 basis-full sm:basis-0"
            />
          )}

          {replacingKey ? (
            <>
              <Button className="flex-1 sm:flex-none" onClick={onSaveKey}>
                Save key
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={onCancelReplacing}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={onStartReplacing}
            >
              Replace key
            </Button>
          )}
        </div>
        {keyError ? (
          <p
            id="bible-source-api-key-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {keyError}
          </p>
        ) : null}
      </FormField>
    </AdminCatalogueCard>
  )
}

export { AdminBibleConnectionCard }
