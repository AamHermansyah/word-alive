import { AudioBars } from "@/components/atoms/audio-bars"
import { MicIcon } from "@/components/atoms/icons"
import { StatBox } from "@/components/molecules/stat-box"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * "Speak now" panel. Vertical card on desktop, a horizontal strip on tablet;
 * the same DOM serves both through responsive classes.
 */
function MicPanel({
  listening,
  onToggle,
  elapsed,
  hoursLeft,
}: {
  listening: boolean
  onToggle: () => void
  elapsed: string
  hoursLeft: string
}) {
  const stats = (
    <>
      <StatBox label="Session" value={elapsed} />
      <StatBox label="Hours left" value={hoursLeft} />
    </>
  )

  return (
    <Card className="gap-0 xl:w-80 xl:shrink-0">
      <CardContent className="flex min-h-0 flex-1 flex-col items-center gap-0 text-center md:flex-row md:gap-7 md:text-start xl:flex-col xl:gap-0 xl:text-center">
        <div className="hidden self-start text-sm font-semibold xl:block">
          Speak now
        </div>

        <div
          className={cn(
            "box-content flex size-28 shrink-0 items-center justify-center rounded-full border-2 md:size-37 xl:mt-3.5 xl:size-42",
            listening ? "border-success/30" : "border-border"
          )}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={listening}
            className={cn(
              "flex size-22 flex-col items-center justify-center gap-1 rounded-full text-success-foreground outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 md:size-30 xl:size-34 xl:gap-1.5",
              listening ? "bg-success" : "bg-muted-foreground"
            )}
          >
            <MicIcon className="size-7 md:size-9 xl:size-10" />
            <span className="text-[11px] font-semibold md:text-xs xl:text-[13px]">
              {listening ? "Tap to stop" : "Tap to start"}
            </span>
          </button>
        </div>

        <div className="mt-3 flex w-full flex-1 flex-col items-center md:mt-0 md:w-auto md:items-start xl:contents">
          <div className="text-base font-bold md:text-lg xl:mt-3.5">
            {listening ? "Listening" : "Paused"}
          </div>
          <div className="text-xs text-muted-foreground md:text-[13px]">
            {listening ? "English · transcribing" : "English · microphone off"}
          </div>
          <AudioBars active={listening} className="mt-3 xl:my-4" />
          <div className="mt-3 flex w-full gap-2 md:gap-3 xl:hidden">{stats}</div>
        </div>

        <div className="mt-auto hidden w-full gap-3 pt-2 xl:flex">{stats}</div>
      </CardContent>
    </Card>
  )
}

export { MicPanel }
