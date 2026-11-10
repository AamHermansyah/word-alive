import { cn } from "@/lib/utils"

/** Page title + one-line subtitle used at the start of every top bar. */
function PageHeading({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn("min-w-0 flex-1", className)}>
      <h1 className="text-[26px] font-bold">{title}</h1>
      {subtitle ? (
        <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  )
}

export { PageHeading }
