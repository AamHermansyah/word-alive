"use client"

import * as React from "react"

import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import type { LatencyPoint } from "@/types/admin-platform"

/** Drawing area of the chart; the SVG scales to its card from here. */
const WIDTH = 556
const HEIGHT = 170
/** One pixel of height is 4 ms. */
const MS_PER_PX = 4
const GRID_MS = [160, 360, 560]

const x = (index: number, count: number) =>
  count > 1 ? (index / (count - 1)) * WIDTH : WIDTH / 2
const y = (ms: number) => HEIGHT - ms / MS_PER_PX

function linePoints(series: LatencyPoint[], key: "scripture" | "lyrics") {
  return series
    .map((point, index) => `${x(index, series.length).toFixed(1)},${y(point[key]).toFixed(1)}`)
    .join(" ")
}

/**
 * Pipeline latency of the last 24 hours as two lines (scripture, lyrics),
 * drawn as inline SVG. Hover, touch or the arrow keys read out one sample
 * in the legend line below the chart.
 */
function AdminPlatformLatencyChart({
  series,
  className,
}: {
  series: LatencyPoint[]
  className?: string
}) {
  const [active, setActive] = React.useState<number | null>(null)
  const count = series.length
  const point = active !== null ? series[active] : null

  function pick(clientX: number, rect: DOMRect) {
    const ratio = (clientX - rect.left) / rect.width
    setActive(Math.max(0, Math.min(count - 1, Math.round(ratio * (count - 1)))))
  }

  return (
    <AdminPlatformPanel title="Pipeline latency, 24 hours" className={className}>
      {count === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No latency samples yet.
        </p>
      ) : (
        <>
          {/* Time runs left to right in every language. */}
          <div
            dir="ltr"
            tabIndex={0}
            role="group"
            aria-label="Pipeline latency, scripture and lyrics, last 24 hours. Use the left and right arrow keys to read each sample."
            className="rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            onPointerMove={(event) => pick(event.clientX, event.currentTarget.getBoundingClientRect())}
            onPointerLeave={() => setActive(null)}
            onBlur={() => setActive(null)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault()
                setActive((current) => Math.min(count - 1, (current ?? -1) + 1))
              } else if (event.key === "ArrowLeft") {
                event.preventDefault()
                setActive((current) => Math.max(0, (current ?? count) - 1))
              } else if (event.key === "Escape") {
                setActive(null)
              }
            }}
          >
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              aria-hidden="true"
              preserveAspectRatio="none"
              className="block h-auto min-h-32 w-full overflow-visible"
            >
              {GRID_MS.map((ms) => (
                <line
                  key={ms}
                  x1={0}
                  x2={WIDTH}
                  y1={y(ms)}
                  y2={y(ms)}
                  className="stroke-border"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <polyline
                fill="none"
                points={linePoints(series, "scripture")}
                className="stroke-chart-1"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <polyline
                fill="none"
                points={linePoints(series, "lyrics")}
                className="stroke-chart-3"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {point && active !== null ? (
                <g>
                  <line
                    x1={x(active, count)}
                    x2={x(active, count)}
                    y1={0}
                    y2={HEIGHT}
                    className="stroke-muted-foreground"
                    strokeDasharray="3 3"
                    vectorEffect="non-scaling-stroke"
                  />
                  {[
                    { ms: point.scripture, className: "stroke-chart-1" },
                    { ms: point.lyrics, className: "stroke-chart-3" },
                  ].map((dot) => (
                    <g key={dot.className}>
                      {/* A zero-length round-capped line stays a circle however the SVG is stretched. */}
                      <line
                        x1={x(active, count)}
                        x2={x(active, count)}
                        y1={y(dot.ms)}
                        y2={y(dot.ms)}
                        className="stroke-card"
                        strokeWidth={13}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        x1={x(active, count)}
                        x2={x(active, count)}
                        y1={y(dot.ms)}
                        y2={y(dot.ms)}
                        className={dot.className}
                        strokeWidth={9}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  ))}
                </g>
              ) : null}
            </svg>
          </div>

          <div
            aria-live="polite"
            className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
          >
            <span className="font-semibold text-chart-1">
              Scripture
              {point ? (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  <bdi>{point.scripture} ms</bdi>
                </span>
              ) : null}
            </span>
            <span className="font-semibold text-chart-3">
              Lyrics
              {point ? (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  <bdi>{point.lyrics} ms</bdi>
                </span>
              ) : null}
            </span>
            {point ? (
              <span className="text-muted-foreground">
                <bdi>{point.label}</bdi>
              </span>
            ) : null}
          </div>
        </>
      )}
    </AdminPlatformPanel>
  )
}

export { AdminPlatformLatencyChart }
