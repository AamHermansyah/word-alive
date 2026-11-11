"use client"

import { AdminPlatformFieldNote } from "@/components/atoms/admin-platform-field-note"
import { AdminPlatformStatusBadge } from "@/components/atoms/admin-platform-status-badge"
import { AdminPlatformSwitch } from "@/components/atoms/admin-platform-switch"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { FormField } from "@/components/molecules/form-field"
import { AdminPlatformSelect } from "@/components/molecules/admin-platform-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MASKED_KEY, NO_FALLBACK } from "@/lib/data/admin-platform"
import type { AiProviderConfig, AiSecret } from "@/types/admin-platform"

type KeyProps = {
  secret: AiSecret
  error?: string
  onReplace: () => void
  onChange: (value: string) => void
  onCancel: () => void
}

/**
 * One AI service: on/off switch with its health, primary and fallback
 * provider, model ID and, for the services that hold a secret, the masked
 * API key with a "Replace key" flow.
 */
function AdminPlatformAiProviderCard({
  idPrefix,
  title,
  providers,
  config,
  testing,
  modelError,
  fallbackError,
  apiKey,
  onChange,
}: {
  idPrefix: string
  title: string
  providers: readonly string[]
  config: AiProviderConfig
  /** A connection test is running. */
  testing: boolean
  modelError?: string
  fallbackError?: string
  apiKey?: KeyProps
  onChange: (patch: Partial<AiProviderConfig>) => void
}) {
  const off = !config.enabled

  return (
    <AdminPlatformPanel
      title={title}
      action={
        <span className="flex items-center gap-2.5">
          {off ? (
            <AdminPlatformStatusBadge tone="neutral">Disabled</AdminPlatformStatusBadge>
          ) : testing ? (
            <AdminPlatformStatusBadge tone="info">Testing…</AdminPlatformStatusBadge>
          ) : (
            <AdminPlatformStatusBadge tone="success">Healthy</AdminPlatformStatusBadge>
          )}
          <AdminPlatformSwitch
            aria-label={`${title} enabled`}
            checked={config.enabled}
            onCheckedChange={(enabled) => onChange({ enabled })}
          />
        </span>
      }
    >
      <fieldset disabled={off} className="min-w-0">
        <div className="grid gap-3 sm:grid-cols-2">
          <AdminPlatformSelect
            id={`${idPrefix}-primary`}
            label="Primary provider"
            value={config.primary}
            onValueChange={(primary) => onChange({ primary })}
            options={providers}
          />
          <div className="flex min-w-0 flex-col gap-1">
            <AdminPlatformSelect
              id={`${idPrefix}-fallback`}
              label="Fallback provider"
              value={config.fallback}
              onValueChange={(fallback) => onChange({ fallback })}
              options={[NO_FALLBACK, ...providers]}
            />
            {fallbackError ? (
              <AdminPlatformFieldNote>{fallbackError}</AdminPlatformFieldNote>
            ) : null}
          </div>
        </div>

        <FormField label="Model ID" htmlFor={`${idPrefix}-model`} className="mt-3">
          <Input
            id={`${idPrefix}-model`}
            value={config.modelId}
            onChange={(event) => onChange({ modelId: event.target.value })}
            aria-invalid={Boolean(modelError)}
            aria-describedby={`${idPrefix}-model-note`}
          />
        </FormField>
        {modelError ? (
          <AdminPlatformFieldNote id={`${idPrefix}-model-note`} className="mt-1">
            {modelError}
          </AdminPlatformFieldNote>
        ) : null}

        {apiKey ? (
          <>
            <FormField label="API key" htmlFor={`${idPrefix}-key`} className="mt-3">
              <div className="flex flex-wrap gap-2.5 sm:flex-nowrap">
                {apiKey.secret.replacing ? (
                  <Input
                    id={`${idPrefix}-key`}
                    type="password"
                    autoComplete="off"
                    autoFocus
                    placeholder="Paste the new API key"
                    value={apiKey.secret.value}
                    onChange={(event) => apiKey.onChange(event.target.value)}
                    aria-invalid={Boolean(apiKey.error)}
                    aria-describedby={`${idPrefix}-key-note`}
                    className="flex-1 basis-40"
                  />
                ) : (
                  <Input
                    id={`${idPrefix}-key`}
                    readOnly
                    value={MASKED_KEY}
                    className="flex-1 basis-40"
                  />
                )}
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  onClick={apiKey.secret.replacing ? apiKey.onCancel : apiKey.onReplace}
                >
                  {apiKey.secret.replacing ? "Cancel" : "Replace key"}
                </Button>
              </div>
            </FormField>
            {apiKey.error ? (
              <AdminPlatformFieldNote id={`${idPrefix}-key-note`} className="mt-1.5">
                {apiKey.error}
              </AdminPlatformFieldNote>
            ) : null}
            <p className="mt-1.5 text-xs text-muted-foreground">
              Keys are stored encrypted and are never shown again.
            </p>
          </>
        ) : null}
      </fieldset>
    </AdminPlatformPanel>
  )
}

export { AdminPlatformAiProviderCard }
