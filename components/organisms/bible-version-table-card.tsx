import {
  BIBLE_GRID,
  BibleVersionRow,
} from "@/components/molecules/bible-version-row"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { BibleVersion } from "@/types"

/** Table of every Bible version: which are in use, the default, and the locked ones (a plan limit or the free trial). */
function BibleVersionTableCard({
  versions,
  inUse,
  defaultCode,
  atLimit,
  onToggle = () => undefined,
  lockedAction,
  className,
}: {
  versions: BibleVersion[]
  /** Codes of the versions currently switched on. */
  inUse: ReadonlySet<string>
  defaultCode: string
  /** The plan's version limit is reached, so no more can be switched on. */
  atLimit: boolean
  /** Omit when no version can be switched (the free trial). */
  onToggle?: (code: string, on: boolean) => void
  /** Free trial: versions that are not in use link here instead of showing a switch. */
  lockedAction?: { label: string; href: string }
  className?: string
}) {
  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent>
        <div
          className={`${BIBLE_GRID} hidden pb-2.5 text-xs text-muted-foreground md:grid`}
        >
          <span>Version</span>
          <span>Name</span>
          <span className="text-center">Rights</span>
          <span className="text-end">Status</span>
        </div>

        <ul>
          {versions.map((version) => {
            const checked = inUse.has(version.code)
            return (
              <BibleVersionRow
                key={version.code}
                version={version}
                isDefault={version.code === defaultCode}
                checked={checked}
                disabled={!checked && atLimit}
                onCheckedChange={(on) => onToggle(version.code, on)}
                lockedAction={lockedAction}
              />
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

export { BibleVersionTableCard }
