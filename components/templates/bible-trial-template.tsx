"use client"

import { BibleVersionTableCard } from "@/components/organisms/bible-version-table-card"
import { Topbar } from "@/components/organisms/topbar"
import { TrialVersionsCard } from "@/components/organisms/trial-versions-card"
import { DEFAULT_BIBLE_VERSION } from "@/lib/data/plans"
import { TRIAL_BIBLE_LIMIT, TRIAL_BIBLE_VERSIONS } from "@/lib/data/account"

const IN_USE: ReadonlySet<string> = new Set(
  TRIAL_BIBLE_VERSIONS.filter((version) => version.inUse).map(
    (version) => version.code
  )
)

/**
 * Bible versions during the free trial: the same table as the paid page, but
 * only the default version is usable and every other one leads to "Choose a
 * plan". The side card shows the trial allowance instead of the default
 * version and plan cards.
 *   desktop: table | trial card
 *   tablet and phone: table, then trial card
 */
function BibleTrialTemplate() {
  const used = IN_USE.size

  return (
    <>
      <Topbar
        title="Bible versions"
        subtitle={`${used} of ${TRIAL_BIBLE_LIMIT} ${
          TRIAL_BIBLE_LIMIT === 1 ? "version" : "versions"
        } in use during your trial`}
      />

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start">
        <BibleVersionTableCard
          className="xl:flex-2"
          versions={TRIAL_BIBLE_VERSIONS}
          inUse={IN_USE}
          defaultCode={DEFAULT_BIBLE_VERSION}
          atLimit
          lockedAction={{ label: "Choose a plan", href: "/plan" }}
        />
        <TrialVersionsCard
          className="xl:flex-1"
          used={used}
          limit={TRIAL_BIBLE_LIMIT}
        />
      </div>
    </>
  )
}

export { BibleTrialTemplate }
