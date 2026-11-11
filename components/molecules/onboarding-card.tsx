import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * The white rounded card every sign-in / trial / payment / device screen sits
 * in. `width` is the card's maximum (it shrinks on small screens, never a
 * fixed box); `padding` follows the mockup (40 / 36 / 28px from `md`, 20px on
 * phones). The content decides the height.
 */
const onboardingCardVariants = cva("w-full min-w-0 gap-0", {
  variants: {
    width: {
      narrow: "max-w-94",
      sm: "max-w-120",
      md: "max-w-140",
      lg: "max-w-150",
      xl: "max-w-180",
      fluid: "",
    },
    padding: {
      roomy:
        "[--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(8)] md:[--card-spacing:--spacing(10)]",
      regular:
        "[--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(7)] md:[--card-spacing:--spacing(9)]",
      compact: "[--card-spacing:--spacing(5)] md:[--card-spacing:--spacing(7)]",
    },
    align: {
      center: "text-center",
      start: "text-start",
    },
  },
  defaultVariants: { width: "sm", padding: "roomy", align: "center" },
})

function OnboardingCard({
  width,
  padding,
  align,
  className,
  contentClassName,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof onboardingCardVariants> & {
    contentClassName?: string
    children: React.ReactNode
  }) {
  return (
    <Card
      className={cn(
        onboardingCardVariants({ width, padding, align }),
        className
      )}
      {...props}
    >
      <CardContent className={cn("flex flex-1 flex-col", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}

export { OnboardingCard }
