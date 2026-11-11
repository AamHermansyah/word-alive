"use client"

import { AdminPlatformCharCounter } from "@/components/atoms/admin-platform-char-counter"
import { AdminPlatformFieldNote } from "@/components/atoms/admin-platform-field-note"
import { FormField } from "@/components/molecules/form-field"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { AdminPlatformToggleRow } from "@/components/molecules/admin-platform-toggle-row"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { SeoErrors } from "@/hooks/use-admin-platform-seo"
import {
  SEO_DESCRIPTION_LIMIT,
  SEO_TITLE_LIMIT,
} from "@/lib/data/admin-platform"
import type { SeoSettings } from "@/types/admin-platform"

/** The editable SEO fields, with live character counters and inline errors. */
function AdminPlatformSeoFormCard({
  values,
  errors,
  onChange,
}: {
  values: SeoSettings
  errors: SeoErrors
  onChange: (patch: Partial<SeoSettings>) => void
}) {
  return (
    <AdminPlatformPanel>
      <FormField label="Page title" htmlFor="seo-title">
        <Input
          id="seo-title"
          value={values.title}
          onChange={(event) => onChange({ title: event.target.value })}
          aria-invalid={Boolean(errors.title)}
          aria-describedby="seo-title-count seo-title-note"
        />
      </FormField>
      <div className="mt-1 flex items-start justify-between gap-3">
        {errors.title ? (
          <AdminPlatformFieldNote id="seo-title-note">
            {errors.title}
          </AdminPlatformFieldNote>
        ) : null}
        <span className="ms-auto shrink-0 text-xs">
          <AdminPlatformCharCounter
            id="seo-title-count"
            count={values.title.length}
            max={SEO_TITLE_LIMIT}
          />
        </span>
      </div>

      <FormField label="Meta description" htmlFor="seo-description" className="mt-2">
        <Textarea
          id="seo-description"
          value={values.description}
          onChange={(event) => onChange({ description: event.target.value })}
          aria-invalid={Boolean(errors.description)}
          aria-describedby="seo-description-count seo-description-note"
          className="min-h-21"
        />
      </FormField>
      <div className="mt-1 flex items-start justify-between gap-3">
        {errors.description ? (
          <AdminPlatformFieldNote id="seo-description-note">
            {errors.description}
          </AdminPlatformFieldNote>
        ) : null}
        <span className="ms-auto shrink-0 text-xs">
          <AdminPlatformCharCounter
            id="seo-description-count"
            count={values.description.length}
            max={SEO_DESCRIPTION_LIMIT}
          />
        </span>
      </div>

      <FormField label="Canonical URL" htmlFor="seo-canonical" className="mt-2">
        <Input
          id="seo-canonical"
          inputMode="url"
          value={values.canonicalUrl}
          onChange={(event) => onChange({ canonicalUrl: event.target.value })}
          aria-invalid={Boolean(errors.canonicalUrl)}
          aria-describedby="seo-canonical-note"
        />
      </FormField>
      {errors.canonicalUrl ? (
        <AdminPlatformFieldNote id="seo-canonical-note" className="mt-1">
          {errors.canonicalUrl}
        </AdminPlatformFieldNote>
      ) : null}

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <FormField label="Search Console verification tag" htmlFor="seo-tag">
          <Input
            id="seo-tag"
            value={values.verificationTag}
            onChange={(event) => onChange({ verificationTag: event.target.value })}
          />
        </FormField>
        <FormField label="Analytics ID" htmlFor="seo-analytics">
          <Input
            id="seo-analytics"
            value={values.analyticsId}
            onChange={(event) => onChange({ analyticsId: event.target.value })}
          />
        </FormField>
      </div>

      <AdminPlatformToggleRow
        id="seo-index"
        strong
        label="Allow search engines to index"
        hint="Turn off while testing."
        checked={values.indexable}
        onCheckedChange={(indexable) => onChange({ indexable })}
        className="mt-4 border-t border-border pt-3.5"
      />
    </AdminPlatformPanel>
  )
}

export { AdminPlatformSeoFormCard }
