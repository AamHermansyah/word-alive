"use client"

import { ScreenPreview } from "@/components/molecules/screen-preview"
import { SegmentedControl } from "@/components/molecules/segmented-control"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BIBLE_VERSION_OPTIONS } from "@/lib/data/live"
import type { ScreenContent } from "@/types"

export type ShowMode = "auto" | "manual"

/**
 * "Now showing": the audience-screen preview plus the verse controls.
 * Desktop puts the controls in a column next to the slide; tablet puts the
 * slide first and the controls in a single row underneath.
 */
function NowShowingPanel({
  content,
  version,
  onVersionChange,
  mode,
  onModeChange,
  onPrevious,
  onNext,
  onClear,
}: {
  content: ScreenContent | null
  version: string
  onVersionChange: (version: string) => void
  mode: ShowMode
  onModeChange: (mode: ShowMode) => void
  onPrevious: () => void
  onNext: () => void
  onClear: () => void
}) {
  const isSong = content?.kind === "song"

  return (
    <Card className="min-w-0 flex-1">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Now showing</CardTitle>
        {content ? (
          <Badge variant={isSong ? "info" : "brand"}>
            {isSong ? "Song" : "Scripture"}
          </Badge>
        ) : (
          <Badge variant="neutral">Blank</Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-3.5 xl:flex-row xl:gap-5">
        <ScreenPreview content={content} />

        <div className="flex gap-2 xl:flex-1 xl:flex-col">
          <div className="hidden text-xs text-muted-foreground xl:block">
            Bible version
          </div>

          <Select
            value={version}
            onValueChange={(next) => next && onVersionChange(next)}
          >
            <SelectTrigger
              aria-label="Bible version"
              className="w-21 xl:w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                {BIBLE_VERSION_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="flex-1 px-0 xl:h-9 xl:flex-none xl:px-2"
            onClick={onPrevious}
          >
            Previous verse
          </Button>
          <Button
            variant="outline"
            className="flex-1 px-0 xl:h-9 xl:flex-none xl:px-2"
            onClick={onNext}
          >
            Next verse
          </Button>
          <Button
            variant="outline"
            className="flex-1 px-0 xl:h-9 xl:flex-none xl:px-2"
            onClick={onClear}
          >
            <span>
              Clear<span className="hidden xl:inline"> screen</span>
            </span>
          </Button>

          <SegmentedControl
            label="Verse advance mode"
            value={mode}
            onValueChange={onModeChange}
            options={[
              { value: "auto", label: "Auto" },
              { value: "manual", label: "Manual" },
            ]}
            className="h-10 w-37.5 xl:h-9 xl:w-full"
          />
        </div>
      </CardContent>

      <CardContent className="hidden text-xs text-muted-foreground xl:block">
        <bdi>Text verified from the {version} database.</bdi>
      </CardContent>
    </Card>
  )
}

export { NowShowingPanel }
