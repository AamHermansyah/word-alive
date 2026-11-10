import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { BibleVersion } from "@/types"

/** One Bible version the church can show: code tile, name, status. */
function BibleVersionCard({ version }: { version: BibleVersion }) {
  return (
    <Card className="min-w-0 gap-0">
      <CardContent className="flex items-center gap-3.5">
        <div
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-md bg-info-soft text-sm font-bold text-info-soft-foreground"
        >
          {version.code}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold">{version.name}</div>
          <div className="text-xs text-muted-foreground">
            {version.language}
          </div>
        </div>
        <Badge variant={version.inUse ? "success" : "neutral"}>
          {version.inUse ? "In use" : "Not added"}
        </Badge>
      </CardContent>
    </Card>
  )
}

export { BibleVersionCard }
