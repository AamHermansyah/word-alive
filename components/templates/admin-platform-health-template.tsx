"use client"

import { Loader2Icon } from "lucide-react"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminPlatformHealthTile } from "@/components/molecules/admin-platform-health-tile"
import { AdminPlatformErrorsCard } from "@/components/organisms/admin-platform-errors-card"
import { AdminPlatformLatencyChart } from "@/components/organisms/admin-platform-latency-chart"
import { Button } from "@/components/ui/button"
import { useAdminPlatformHealth } from "@/hooks/use-admin-platform-health"
import { HEALTH_ERRORS } from "@/lib/data/admin-platform"

/** System health: service tiles, the 24 h latency chart and the recent errors. */
function AdminPlatformHealthTemplate() {
  const health = useAdminPlatformHealth()

  return (
    <>
      <AdminPageHeader
        title="System health"
        subtitle="Live status of every service"
      >
        <span
          role="status"
          className="me-auto text-xs text-muted-foreground sm:me-0"
        >
          Updated <bdi>{health.checkedAt}</bdi>
        </span>
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={health.refreshing}
          onClick={health.refresh}
        >
          {health.refreshing ? (
            <>
              <Loader2Icon className="animate-spin" data-icon="inline-start" />
              Refreshing…
            </>
          ) : (
            "Refresh"
          )}
        </Button>
      </AdminPageHeader>

      <div
        aria-busy={health.refreshing}
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-x-4 md:gap-y-5"
      >
        {health.tiles.map((tile) => (
          <AdminPlatformHealthTile
            key={tile.id}
            tile={tile}
            refreshing={health.refreshing}
          />
        ))}
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-[600fr_356fr]">
        <AdminPlatformLatencyChart
          series={health.series}
          className="lg:min-h-82.5"
        />
        <AdminPlatformErrorsCard
          errors={HEALTH_ERRORS}
          className="lg:min-h-82.5"
        />
      </div>
    </>
  )
}

export { AdminPlatformHealthTemplate }
