import Link from "next/link"

import { BibleVersionCard } from "@/components/organisms/bible-version-card"
import { Topbar } from "@/components/organisms/topbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BIBLE_VERSIONS, BIBLE_VERSION_LIMIT } from "@/lib/data/plans"

/** Bible versions available on the current plan. */
function BibleVersionsTemplate() {
  const inUse = BIBLE_VERSIONS.filter((version) => version.inUse).length

  return (
    <>
      <Topbar
        title="Bible versions"
        subtitle={`${inUse} of ${BIBLE_VERSION_LIMIT} in use on your Starter plan`}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {BIBLE_VERSIONS.map((version) => (
          <BibleVersionCard key={version.code} version={version} />
        ))}

        <Card className="min-w-0 gap-0">
          <CardContent className="flex h-full flex-col justify-center gap-1">
            <div className="text-sm font-bold">Need more versions?</div>
            <div className="mb-2.5 text-xs text-muted-foreground">
              Bigger plans include more Bible versions.
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-fit px-4"
              nativeButton={false}
              render={<Link href="/usage" />}
            >
              See plans
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        Bible versions depend on the licences WordAlive holds.
      </p>
    </>
  )
}

export { BibleVersionsTemplate }
