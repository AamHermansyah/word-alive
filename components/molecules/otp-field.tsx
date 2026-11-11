"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"

/**
 * Six boxes for the one-time email code (confirm email, switch device, delete
 * data, authenticator). Built on the shadcn InputOTP: paste, backspace and
 * arrow keys all work. The boxes are 6 separate rounded squares like the
 * mockup, and they shrink with the container so six always fit at 320px.
 */
function OtpField({
  value,
  onChange,
  onComplete,
  length = 6,
  invalid,
  disabled,
  autoFocus,
  className,
  groupClassName,
  slotClassName,
  "aria-label": ariaLabel = "6-digit code",
}: {
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  length?: number
  invalid?: boolean
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  /** Overrides for the row of boxes (width, gap) and for each box (height, radius). */
  groupClassName?: string
  slotClassName?: string
  "aria-label"?: string
}) {
  return (
    <InputOTP
      maxLength={length}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
      pattern={REGEXP_ONLY_DIGITS}
      inputMode="numeric"
      autoComplete="one-time-code"
      disabled={disabled}
      autoFocus={autoFocus}
      aria-label={ariaLabel}
      aria-invalid={invalid || undefined}
      containerClassName={cn("w-full justify-center", className)}
    >
      <InputOTPGroup
        className={cn(
          "w-full max-w-90.5 justify-between gap-2 rounded-none has-aria-invalid:border-0 has-aria-invalid:ring-0 sm:gap-2.5",
          groupClassName
        )}
      >
        {Array.from({ length }, (_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            aria-invalid={invalid || undefined}
            className={cn(
              "h-14 min-w-0 flex-1 rounded-lg border bg-card text-xl font-semibold first:rounded-lg last:rounded-lg data-[active=true]:border-success data-[active=true]:ring-success/30 sm:h-16 sm:text-2xl",
              slotClassName
            )}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

export { OtpField }
