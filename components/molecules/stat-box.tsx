import { cn } from "@/lib/utils"

/** Small tinted tile with a label and a bold value ("Session 00:42:18"). */
function StatBox({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex-1 rounded-lg bg-background px-3 py-2.5 text-start",
        className
      )}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-base font-bold"><bdi>{value}</bdi></div>
    </div>
  )
}

export { StatBox }
