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
    <Card className="h-47.5 gap-0 xl:h-auto xl:w-[320px]">
      <CardContent className="flex min-h-0 flex-1 items-center gap-7 xl:flex-col xl:gap-0 xl:text-center">
        <div className="hidden self-start text-sm font-semibold xl:block">
          Speak now
        </div>

        <div
          className={cn(
            "box-content flex size-37 shrink-0 items-center justify-center rounded-full border-2 xl:mt-3.5 xl:size-42 xl:shrink-0",
            listening ? "border-success/30" : "border-border"
          )}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={listening}
            className={cn(
              "flex size-30 flex-col items-center justify-center gap-1 rounded-full text-success-foreground outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 xl:size-34 xl:gap-1.5",
              listening ? "bg-success" : "bg-muted-foreground"
            )}
          >
            <MicIcon className="size-9 xl:size-10" />
            <span className="text-xs font-semibold xl:text-[13px]">
              {listening ? "Tap to stop" : "Tap to start"}
            </span>
          </button>
        </div>

        <div className="flex flex-1 flex-col items-start xl:contents">
          <div className="text-lg font-bold xl:mt-3.5">
            {listening ? "Listening" : "Paused"}
          </div>
          <div className="text-[13px] text-muted-foreground">
            {listening ? "English · transcribing" : "English · microphone off"}
          </div>
          <AudioBars active={listening} className="mt-3 xl:my-4" />
          <div className="mt-3 flex w-full gap-3 xl:hidden">{stats}</div>
        </div>

        <div className="mt-2 hidden w-full gap-3 xl:flex">{stats}</div>
      </CardContent>
    </Card>
  )
}

export { MicPanel }
