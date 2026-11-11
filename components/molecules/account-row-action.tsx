import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

/**
 * The brand-coloured text action at the end of a table row ("View", "Edit",
 * "Download", "Remove"). Give it `href` to navigate, `onClick` to act. The
 * visible word is short, so `label` carries the full meaning for screen
 * readers ("Download receipt Nov 7").
 */
function AccountRowAction({
  href,
  onClick,
  label,
  children,
}: {
  href?: string
  onClick?: () => void
  label?: string
  children: React.ReactNode
}) {
  const className =
    "h-10 px-0 text-[13px] text-brand-text hover:no-underline md:h-auto md:py-0.5"

  if (href) {
    return (
      <Button
        variant="link"
        nativeButton={false}
        render={<Link href={href} aria-label={label} />}
        className={className}
      >
        {children}
      </Button>
    )
  }

  return (
    <Button
      variant="link"
      aria-label={label}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  )
}

export { AccountRowAction }
