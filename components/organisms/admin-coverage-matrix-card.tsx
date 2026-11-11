import { AdminCatalogueSwitch } from "@/components/molecules/admin-catalogue-switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LICENCE_LABEL, LICENCE_VARIANT } from "@/lib/data/admin-catalogue"
import { cn } from "@/lib/utils"
import type {
  CoverageMatrix,
  CoverageTierId,
  CoverageVersion,
} from "@/types/admin-catalogue"

/**
 * Column template of the matrix header and every row (from `md`): version,
 * rights, then one column per plan.
 */
const MATRIX_GRID =
  "md:grid md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.3fr)_repeat(4,minmax(0,.9fr))] md:items-center md:gap-x-2.5"

type MatrixTier = { id: CoverageTierId; short: string; hours: string }

/**
 * The Bible-version x plan matrix. From `md` it is a table with one switch per
 * plan; on phones every version becomes a small card whose plan switches sit
 * in a two-column grid, each with its plan name next to it, so nothing
 * scrolls sideways. Versions without a recorded licence are locked off.
 */
function AdminCoverageMatrixCard({
  tiers,
  versions,
  matrix,
  hiddenCount,
  showAll,
  totalCount,
  previewCount,
  onToggle,
  onToggleShowAll,
}: {
  tiers: MatrixTier[]
  versions: CoverageVersion[]
  matrix: CoverageMatrix
  hiddenCount: number
  showAll: boolean
  totalCount: number
  /** How many versions are listed before "Show all". */
  previewCount: number
  onToggle: (code: string, tier: CoverageTierId, on: boolean) => void
  onToggleShowAll: () => void
}) {
  const heading = (tier: MatrixTier) => `${tier.short} · ${tier.hours} h`

  return (
    <Card className="min-w-0 gap-0">
      <CardContent>
        <div
          className={cn(
            MATRIX_GRID,
            "hidden pb-2.5 text-xs text-muted-foreground md:grid"
          )}
        >
          <span>Bible version</span>
          <span>Rights</span>
          {tiers.map((tier) => (
            <span key={tier.id} className="wrap-break-word">
              <bdi>{heading(tier)}</bdi>
            </span>
          ))}
        </div>

        <ul id="coverage-matrix">
          {versions.map((version, index) => {
            const locked = version.licence === "missing"
            // Rows beyond the preview slide in when "Show all" is pressed.
            const isExtra = showAll && index >= previewCount
            return (
              <li
                key={version.code}
                className={cn(
                  MATRIX_GRID,
                  "grid gap-y-2 border-t border-border py-3 first:border-t-0 md:first:border-t",
                  isExtra &&
                    "animate-in duration-300 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none"
                )}
              >
                <div className="min-w-0 text-[13px] wrap-break-word">
                  <span className="font-bold">{version.code}</span>{" "}
                  <span className="text-muted-foreground">{version.name}</span>
                </div>

                <div>
                  <Badge variant={LICENCE_VARIANT[version.licence]}>
                    {LICENCE_LABEL[version.licence]}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 md:contents">
                  {tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex items-center justify-between gap-2 rounded-lg bg-background px-3 py-2 md:contents"
                    >
                      <span className="min-w-0 text-xs wrap-break-word text-muted-foreground md:sr-only">
                        <bdi>{heading(tier)}</bdi>
                      </span>
                      <AdminCatalogueSwitch
                        aria-label={`${version.code} ${tier.short}${locked ? " (locked: licence missing)" : ""}`}
                        checked={
                          !locked && Boolean(matrix[version.code]?.[tier.id])
                        }
                        disabled={locked}
                        onCheckedChange={(on) =>
                          onToggle(version.code, tier.id, on)
                        }
                      />
                    </div>
                  ))}
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <p className="min-w-0 wrap-break-word">
            <bdi>
              Versions without a recorded licence stay locked off in every plan.
              {hiddenCount > 0
                ? ` ${hiddenCount} more ${hiddenCount === 1 ? "version is" : "versions are"} hidden.`
                : ""}
            </bdi>
          </p>
          <Button
            variant="link"
            aria-expanded={showAll}
            aria-controls="coverage-matrix"
            className="h-auto px-0 py-2.5 text-[13px] text-brand-text hover:no-underline"
            onClick={onToggleShowAll}
          >
            <bdi>{showAll ? "Show fewer" : `Show all ${totalCount}`}</bdi>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { AdminCoverageMatrixCard }
