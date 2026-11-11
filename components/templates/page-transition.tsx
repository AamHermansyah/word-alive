"use client"

import { ViewTransition } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

/**
 * Soft enter/exit for a whole page. Used by every route group's
 * `template.tsx`. The transition is keyed by the pathname: a `template.tsx`
 * only re-mounts when its direct child segment changes (so /admin to
 * /admin/users would not animate), the key makes every page change play the
 * old page out and the new one in, and leaves query-string updates alone.
 * The keyframes live in `globals.css` (`.page-in`, `.page-out`) and are
 * switched off by `prefers-reduced-motion`.
 *
 * The wrapper is a plain flex column so it can replace the content area of
 * any shell; pass the shell's gap/padding through `className`.
 */
function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()

  return (
    <ViewTransition
      key={pathname}
      enter="page-in"
      exit="page-out"
      default="none"
    >
      <div className={cn("flex min-w-0 flex-1 flex-col", className)}>
        {children}
      </div>
    </ViewTransition>
  )
}

export { PageTransition }
