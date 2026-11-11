"use client"

import * as React from "react"

import { ExpandRegion } from "@/components/atoms/expand-region"
import { FadeIn } from "@/components/atoms/fade-in"
import { ServiceItemsList } from "@/components/molecules/service-items-list"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ServiceRecord } from "@/types/console"

/** Row padding of the mockup (10px); the shared table cell defaults to 12px. */
const CELL = "data-[slot=table-cell]:py-2.5"

/**
 * The service table and the items each service showed.
 *
 * "View" picks a service. From `md` its items appear in the card beside the
 * table (below it on tablet) and fade in when you pick another service. On
 * phones the same items open in place, right under the service, with a height
 * and fade transition, and "Hide" closes them again. Both read the same
 * selection, so the first service starts open as in the mockup.
 */
function ServiceHistoryBoard({ services }: { services: ServiceRecord[] }) {
  const [selectedId, setSelectedId] = React.useState<string | null>(
    services[0]?.id ?? null
  )
  const selected = services.find((service) => service.id === selectedId)

  const toggle = React.useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id))
  }, [])

  const columns: DataTableColumn<ServiceRecord>[] = [
    {
      id: "service",
      header: "Service",
      primary: true,
      className: `w-[27%] ${CELL}`,
      cell: (row) => (
        <div className="font-normal">
          <div className="text-sm font-bold wrap-break-word">{row.date}</div>
          <div className="text-xs text-muted-foreground">
            <bdi>{row.startTime}</bdi>
          </div>
        </div>
      ),
    },
    {
      id: "length",
      header: "Length",
      className: `w-[17.5%] ${CELL}`,
      cell: (row) => <bdi>{row.length}</bdi>,
    },
    {
      id: "hours",
      header: "Hours",
      className: `w-[14.3%] ${CELL}`,
      cell: (row) => <bdi>{row.hours}</bdi>,
    },
    {
      id: "scriptures",
      header: "Scriptures",
      className: `w-[17.5%] ${CELL}`,
      cell: (row) => <bdi>{row.scriptures}</bdi>,
    },
    {
      id: "songs",
      header: "Songs",
      className: `w-[14.3%] ${CELL}`,
      cell: (row) => <bdi>{row.songs}</bdi>,
    },
    {
      id: "view",
      header: "View",
      actions: true,
      className: `w-[9.4%] ${CELL}`,
      cell: (row) => {
        const open = row.id === selectedId
        return (
          <Button
            variant="link"
            aria-pressed={open}
            aria-label={`View items shown on ${row.date}`}
            onClick={() => toggle(row.id)}
            className="h-10 px-0 text-[13px] text-brand-text hover:no-underline md:h-auto"
          >
            {open ? (
              <>
                <span className="md:hidden">Hide</span>
                <span className="hidden md:inline">View</span>
              </>
            ) : (
              "View"
            )}
          </Button>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start">
      <Card className="min-w-0 gap-0 [--card-spacing:--spacing(4)] md:[--card-spacing:--spacing(5)] xl:flex-2">
        <CardContent>
          <DataTable
            aria-label="Services"
            columns={columns}
            rows={services}
            phoneExtra={(row) => (
              <ExpandRegion open={row.id === selectedId}>
                <ServiceItemsList items={row.items} className="mt-2.5" />
              </ExpandRegion>
            )}
            getRowKey={(row) => row.id}
            empty="No services yet. Your first service will appear here."
          />
        </CardContent>
      </Card>

      {services.length > 0 ? (
        <Card className="hidden min-w-0 gap-0 md:flex xl:flex-1">
          <CardContent>
            <FadeIn key={selected?.id ?? "none"} aria-live="polite">
              {selected ? (
                <>
                  <h2 className="mb-3 text-base font-bold wrap-break-word">
                    {selected.date}
                  </h2>
                  <ServiceItemsList items={selected.items} />
                </>
              ) : (
                <p className="text-[13px] text-muted-foreground">
                  Choose View on a service to see what it showed.
                </p>
              )}
            </FadeIn>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export { ServiceHistoryBoard }
