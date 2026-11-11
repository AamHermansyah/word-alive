import { HistoryStatCard } from "@/components/molecules/history-stat-card"
import { ServiceHistoryBoard } from "@/components/organisms/service-history-board"
import { Topbar } from "@/components/organisms/topbar"
import {
  HISTORY_HOURS,
  HISTORY_SUMMARY,
  SERVICE_HISTORY,
} from "@/lib/data/console"

/**
 * Service history: three summary boxes, then the service table with the items
 * of the chosen service next to it (below it on tablet, in place on phones).
 */
function ServiceHistoryTemplate() {
  return (
    <>
      <Topbar
        title="Service history"
        subtitle="Every service you ran with WordAlive"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
        <HistoryStatCard
          className="col-span-2 sm:col-span-1"
          label="Hours this cycle"
          value={`${HISTORY_HOURS.used} of ${HISTORY_HOURS.total}`}
          caption={`Resets ${HISTORY_SUMMARY.resetsOn}`}
        />
        <HistoryStatCard
          label="Services"
          value={String(HISTORY_SUMMARY.services)}
          caption="This cycle"
        />
        <HistoryStatCard
          label="Items shown"
          value={String(HISTORY_SUMMARY.itemsShown)}
          caption="Scriptures and songs"
        />
      </div>

      <ServiceHistoryBoard services={SERVICE_HISTORY} />
    </>
  )
}

export { ServiceHistoryTemplate }
