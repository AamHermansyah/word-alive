import { AdminCatalogueCard } from "@/components/molecules/admin-catalogue-card"
import { AdminCatalogueField } from "@/components/molecules/admin-catalogue-field"
import { Badge } from "@/components/ui/badge"
import {
  coverageLimitId,
  type CoverageLimit,
} from "@/lib/admin-catalogue-coverage"
import type { CoverageTierId } from "@/types/admin-catalogue"

/**
 * Summary of one plan: its hours and Bible-version limits (editable) and a
 * live "N of M selected" pill that follows the matrix below.
 */
function AdminCoverageTierCard({
  id,
  name,
  limit,
  badge,
  errorFor,
  onTouch,
  onLimitChange,
  className,
}: {
  id: CoverageTierId
  name: string
  limit: CoverageLimit
  badge: { label: string; variant: "success" | "info" | "warning" }
  errorFor: (id: string) => string | undefined
  onTouch: (id: string) => void
  onLimitChange: (key: keyof CoverageLimit, value: string) => void
  className?: string
}) {
  const field = (
    key: keyof CoverageLimit,
    label: string,
    inputMode: "decimal" | "text"
  ) => {
    const fieldId = coverageLimitId(id, key)
    return (
      <AdminCatalogueField
        id={fieldId}
        label={label}
        value={limit[key]}
        inputMode={inputMode}
        error={errorFor(fieldId)}
        onChange={(event) => onLimitChange(key, event.target.value)}
        onBlur={() => onTouch(fieldId)}
      />
    )
  }

  return (
    <AdminCatalogueCard
      titleSize="summary"
      className={className}
      title={name}
      action={
        <Badge variant={badge.variant} role="status" aria-live="polite">
          <bdi>{badge.label}</bdi>
        </Badge>
      }
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        {field("hours", "Hours / month", "decimal")}
        {field("versions", "Versions allowed", "text")}
      </div>
    </AdminCatalogueCard>
  )
}

export { AdminCoverageTierCard }
