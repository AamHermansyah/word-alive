"use client"

import * as React from "react"

import { AdminTakedownDetailCard } from "@/components/organisms/admin-takedown-detail-card"
import { AdminTakedownListCard } from "@/components/organisms/admin-takedown-list-card"
import { useAdminRevealDetail } from "@/hooks/use-admin-reveal-detail"
import type { AdminSongCatalogue } from "@/hooks/use-admin-song-catalogue"

/**
 * Takedown requests: the list beside the card of the picked request. Until
 * one is picked, the first open request (else the first) is shown.
 */
function AdminTakedownPanel({ catalogue }: { catalogue: AdminSongCatalogue }) {
  const [selectedId, setSelectedId] = React.useState<string>()
  const { ref, reveal } = useAdminRevealDetail()

  const requests = catalogue.takedowns
  const selected =
    requests.find((request) => request.id === selectedId) ??
    requests.find((request) => request.status === "open") ??
    requests[0]

  return (
    <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <AdminTakedownListCard
        requests={requests}
        selectedId={selected?.id}
        onSelect={(id) => {
          setSelectedId(id)
          reveal()
        }}
      />
      <AdminTakedownDetailCard
        key={selected?.id}
        ref={ref}
        className="scroll-mt-4"
        request={selected}
        onToggleContacted={catalogue.toggleContacted}
        onToggleOwnership={catalogue.toggleOwnership}
        onRemove={(request, note) => {
          setSelectedId(request.id)
          catalogue.removeForTakedown(request, note)
        }}
        onReject={(request, note) => {
          setSelectedId(request.id)
          catalogue.rejectTakedown(request, note)
        }}
      />
    </div>
  )
}

export { AdminTakedownPanel }
