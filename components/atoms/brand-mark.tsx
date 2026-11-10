import { cn } from "@/lib/utils"

/** The square "W" logo tile. */
function BrandMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex size-8.5 shrink-0 items-center justify-center rounded-md bg-brand font-bold text-brand-foreground",
        className
      )}
    >
      W
    </div>
  )
}

export { BrandMark }
