import * as React from "react"

import { FormField } from "@/components/molecules/form-field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/**
 * A labelled text input with an inline error line underneath. The error is
 * announced (`role="alert"`) and wired to the input with `aria-describedby`,
 * so a screen reader reads "Can't be negative" when the field is focused.
 */
function AdminCatalogueField({
  id,
  label,
  error,
  className,
  inputClassName,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "id"> & {
  id: string
  label: string
  /** Message to show under the field; the field is marked invalid with it. */
  error?: string
  /** Extra classes for the wrapper (grid spans…). */
  className?: string
  inputClassName?: string
}) {
  const errorId = `${id}-error`

  return (
    <FormField label={label} htmlFor={id} className={cn("min-w-0", className)}>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          <bdi>{error}</bdi>
        </p>
      ) : null}
    </FormField>
  )
}

export { AdminCatalogueField }
