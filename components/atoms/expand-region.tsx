import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Height + fade transition for content that opens and closes in place. The
 * grid row animates between `0fr` and `1fr`, so the height follows the content
 * (no fixed height anywhere). The inner box clips only while the row is
 * shorter than its content. Closed content is `inert`, so it cannot be tabbed
 * to or read out. Off under reduced motion.
 */
function ExpandRegion({
  open,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { open: boolean }) {
  return (
    <div
      data-state={open ? "open" : "closed"}
      inert={!open}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}

export { ExpandRegion }
