import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * The brand-coloured text action used at the end of admin rows and card
 * headings ("View", "View all", "Review"). A link when `href` is given,
 * otherwise a button. 40px tall on phones, text height from `md`.
 */
function AdminCustomersTextAction({
  href,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "render"> & {
  href?: string
}) {
  const classes = cn(
    "h-10 px-0 text-[13px] font-semibold text-brand-text hover:no-underline md:h-auto md:py-2",
    className
  )

  if (href) {
    return (
      <Button
        variant="link"
        nativeButton={false}
        render={<Link href={href} />}
        role="link"
        className={classes}
        {...props}
      >
        <bdi>{children}</bdi>
      </Button>
    )
  }

  return (
    <Button variant="link" className={classes} {...props}>
      <bdi>{children}</bdi>
    </Button>
  )
}

export { AdminCustomersTextAction }
