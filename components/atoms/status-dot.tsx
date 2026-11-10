import { cn } from "@/lib/utils"

/** 8px filled dot used inside status pills. */
function StatusDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-2 shrink-0 rounded-full bg-success",
        className
      )}
    />
  )
}

export { StatusDot }
