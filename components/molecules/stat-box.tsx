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
        "min-w-0 flex-1 rounded-lg bg-background px-3 py-2 text-start md:py-2.5",
        className
      )}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-bold md:text-base">
        <bdi>{value}</bdi>
      </div>
    </div>
  )
}

export { StatBox }
