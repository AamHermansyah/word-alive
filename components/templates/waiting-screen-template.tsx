import { cn } from "@/lib/utils"

/**
 * Audience screen before the service starts: logo, name and a line of text,
 * with a "Reconnecting…" pill that breathes at the bottom end (steady under
 * reduced motion). Sizes are `cqw` clamps of the screen width, like the other
 * projector screens.
 */
function WaitingScreenTemplate({
  title,
  message,
  status,
}: {
  title: string
  message: string
  status: string
}) {
  return (
    <main className="@container flex flex-1 flex-col bg-navy text-navy-foreground">
      <div className="grid flex-1 grid-rows-[1fr_auto_1fr] gap-4 px-[clamp(1rem,2.5cqw,4rem)]">
        <div aria-hidden="true" />

        <div className="flex flex-col items-center py-8 text-center">
          <div
            aria-hidden="true"
            className="flex size-[clamp(4rem,6.5625cqw,10rem)] items-center justify-center rounded-3xl bg-brand text-[clamp(2rem,3.4375cqw,5.5rem)] font-bold text-brand-foreground"
          >
            W
          </div>
          <h1 className="mt-[clamp(1rem,1.5625cqw,2.5rem)] text-[clamp(1.75rem,3.125cqw,5rem)] font-bold wrap-break-word">
            {title}
          </h1>
          <p className="mt-[clamp(0.5rem,0.78cqw,1.25rem)] text-[clamp(1rem,1.5625cqw,2.5rem)] text-navy-muted wrap-break-word">
            {message}
          </p>
        </div>

        <p
          role="status"
          className={cn(
            "mb-20 self-end justify-self-end rounded-full bg-warning-soft px-[1em] py-[0.57em] text-[clamp(0.8125rem,1.09375cqw,1.75rem)] font-semibold text-warning-soft-foreground",
            "motion-safe:animate-pulse motion-safe:[animation-duration:2.4s]"
          )}
        >
          {status}
        </p>
      </div>
    </main>
  )
}

export { WaitingScreenTemplate }
