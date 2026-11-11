"use client"

import * as React from "react"

import { BibleVersionTableCard } from "@/components/organisms/bible-version-table-card"
import { DefaultVersionCard } from "@/components/organisms/default-version-card"
import { PlanVersionsCard } from "@/components/organisms/plan-versions-card"
import { Topbar } from "@/components/organisms/topbar"
import {
  BIBLE_VERSIONS,
  BIBLE_VERSION_LIMIT,
  DEFAULT_BIBLE_VERSION,
  UPGRADE_BIBLE_VERSIONS,
} from "@/lib/data/plans"

/**
 * Bible versions: the table of versions (switch each on or off within the
 * plan's limit), the default version with its sample slide, and plan usage.
 *   desktop: table | [default, plan] column
 *   tablet and phone: table, then [default | plan] side by side / stacked
 */
function BibleVersionsTemplate() {
  const [inUse, setInUse] = React.useState<ReadonlySet<string>>(
    () =>
      new Set(
        BIBLE_VERSIONS.filter((version) => version.inUse).map(
          (version) => version.code
        )
      )
  )
  const [defaultCode, setDefaultCode] = React.useState(DEFAULT_BIBLE_VERSION)

  const used = inUse.size
  const defaultVersion =
    BIBLE_VERSIONS.find((version) => version.code === defaultCode) ??
    BIBLE_VERSIONS[0]
  const options = BIBLE_VERSIONS.filter((version) => inUse.has(version.code))

  function toggle(code: string, on: boolean) {
    setInUse((current) => {
      const next = new Set(current)
      if (!on) next.delete(code)
      else if (next.size < BIBLE_VERSION_LIMIT) next.add(code)
      return next
    })
  }

  return (
    <>
      <Topbar
        title="Bible versions"
        subtitle={`${used} of ${BIBLE_VERSION_LIMIT} versions in use on your plan`}
      />

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start">
        <BibleVersionTableCard
          className="xl:flex-2"
          versions={BIBLE_VERSIONS}
          inUse={inUse}
          defaultCode={defaultCode}
          atLimit={used >= BIBLE_VERSION_LIMIT}
          onToggle={toggle}
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-5 xl:flex-1 xl:flex-col xl:items-stretch">
          <DefaultVersionCard
            className="md:flex-1"
            version={defaultVersion}
            options={options}
            onChange={setDefaultCode}
          />
          <PlanVersionsCard
            className="md:flex-1"
            used={used}
            limit={BIBLE_VERSION_LIMIT}
            upgradeTo={UPGRADE_BIBLE_VERSIONS}
          />
        </div>
      </div>
    </>
  )
}

export { BibleVersionsTemplate }
