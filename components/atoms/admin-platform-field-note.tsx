import { cn } from "@/lib/utils"

/** Inline validation message under a field (announced when it appears). */
function AdminPlatformFieldNote({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <p
      id={id}
      role="alert"
      className={cn("min-w-0 text-xs text-destructive wrap-break-word", className)}
    >
      {children}
    </p>
  )
}

export { AdminPlatformFieldNote }
