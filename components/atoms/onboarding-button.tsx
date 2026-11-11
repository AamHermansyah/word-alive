import * as React from "react"
import Link from "next/link"
import { LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type OnboardingButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "render"
> & {
  /** Renders a link (same look) instead of a button. */
  href?: string
  /** Shows a spinner, switches to `loadingLabel` and blocks further clicks. */
  loading?: boolean
  loadingLabel?: React.ReactNode
}

/**
 * The tall full-width button every sign-in / trial / payment / device card
 * ends with (48px, 12px radius, 15px label). A shadcn Button underneath, so
 * variants, focus rings and disabled styling stay the shared ones.
 */
function OnboardingButton({
  href,
  loading,
  loadingLabel,
  disabled,
  className,
  children,
  ...props
}: OnboardingButtonProps) {
  const classes = cn("h-12 w-full rounded-lg text-[15px]", className)
  const content = loading ? (
    <>
      <LoaderCircleIcon className="animate-spin" aria-hidden="true" />
      {loadingLabel ?? children}
    </>
  ) : (
    children
  )

  if (href) {
    return (
      <Button
        nativeButton={false}
        render={<Link href={href} />}
        className={classes}
        {...props}
      >
        {content}
      </Button>
    )
  }

  return (
    <Button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </Button>
  )
}

export { OnboardingButton }
