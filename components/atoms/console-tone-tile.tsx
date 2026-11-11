import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Soft tinted tile that holds a status icon: the 40px rounded square of a
 * console banner, or the 56px circle of a first-run step. The tones use the
 * soft status tokens, so they follow light / dark mode.
 *
 * `danger` uses the brand-soft pair: it is the closest token to the mockup's
 * red tile and has a dark-mode counterpart.
 */
const toneTileVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    tone: {
      warning: "bg-warning-soft text-warning-soft-foreground",
      danger: "bg-brand-soft text-brand-soft-foreground",
      info: "bg-info-soft text-info-soft-foreground",
      success: "bg-success-soft text-success-soft-foreground",
    },
    shape: {
      /** Banner icon: 40px tile, 20px icon */
      square: "size-10 rounded-lg [&>svg]:size-5",
      /** First-run step icon: 56px circle, 26px icon */
      round: "size-14 rounded-full [&>svg]:size-6.5",
    },
  },
  defaultVariants: { tone: "info", shape: "square" },
})

function ConsoleToneTile({
  tone,
  shape,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof toneTileVariants>) {
  return (
    <div
      className={cn(toneTileVariants({ tone, shape }), className)}
      {...props}
    />
  )
}

export { ConsoleToneTile }
