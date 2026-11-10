import { cn } from "@/lib/utils"

/** Resting heights (px) taken from the mockup waveform. */
const BAR_HEIGHTS = [10, 18, 28, 14, 34, 22, 12, 26, 10, 20, 30, 16, 8]

/**
 * Decorative waveform. At rest it is pixel-identical to the mockup; while
 * `active` the bars breathe (disabled for reduced-motion users).
 */
function AudioBars({
  active = true,
  className,
}: {
  active?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex h-9 items-center gap-1", className)}
    >
      {BAR_HEIGHTS.map((height, index) => (
        <span
          key={index}
          style={{
            height,
            animationDelay: `${(index % 5) * -0.18}s`,
            animationDuration: `${0.9 + (index % 4) * 0.15}s`,
          }}
          className={cn(
            "w-1.25 rounded-[3px] bg-success",
            active
              ? "motion-safe:animate-[wa-bar_1s_ease-in-out_infinite]"
              : "opacity-40"
          )}
        />
      ))}
    </div>
  )
}

export { AudioBars }
