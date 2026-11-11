"use client"

import * as React from "react"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminCatalogueHistorySheet } from "@/components/organisms/admin-catalogue-history-sheet"
import { AdminCoverageMatrixCard } from "@/components/organisms/admin-coverage-matrix-card"
import { AdminCoverageTierCard } from "@/components/organisms/admin-coverage-tier-card"
import { Button } from "@/components/ui/button"
import { useAdminCoverage } from "@/hooks/use-admin-coverage"
import { COVERAGE_PREVIEW_COUNT } from "@/lib/data/admin-catalogue"

/**
 * Coverage: a summary card per plan (limits + live "N of M selected"), then
 * the matrix that decides which Bible versions each plan includes.
 */
function AdminCoverageTemplate() {
  const coverage = useAdminCoverage()
  const [historyOpen, setHistoryOpen] = React.useState(false)

  return (
    <>
      <AdminPageHeader
        title="Coverage"
        subtitle="Choose the talk hours and Bible versions each plan includes"
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
          disabled={!coverage.dirty}
          onClick={coverage.save}
        >
          Save changes
        </Button>
      </AdminPageHeader>

      <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {coverage.tiers.map((tier) => (
          <AdminCoverageTierCard
            key={tier.id}
            id={tier.id}
            name={tier.name}
            limit={tier.limit}
            badge={tier.badge}
            errorFor={coverage.errorFor}
            onTouch={coverage.touch}
            onLimitChange={(key, value) =>
              coverage.setLimit(tier.id, key, value)
            }
          />
        ))}
      </div>

      <AdminCoverageMatrixCard
        tiers={coverage.tiers.map((tier) => ({
          id: tier.id,
          short: tier.short,
          hours: tier.limit.hours,
        }))}
        versions={coverage.visibleVersions}
        matrix={coverage.matrix}
        hiddenCount={coverage.hiddenCount}
        showAll={coverage.showAll}
        totalCount={coverage.versions.length}
        previewCount={COVERAGE_PREVIEW_COUNT}
        onToggle={coverage.toggle}
        onToggleShowAll={coverage.toggleShowAll}
      />

      <AdminCatalogueHistorySheet
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        title="Coverage history"
        description="Saved changes to the Bible versions and limits of each plan."
        entries={coverage.history}
      />
    </>
  )
}

export { AdminCoverageTemplate }
