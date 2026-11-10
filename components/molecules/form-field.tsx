import * as React from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

/** Small muted label stacked over a control (shadcn Field + FieldLabel). */
function FormField({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string
  htmlFor: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Field className={cn("gap-1", className)}>
      <FieldLabel
        htmlFor={htmlFor}
        className="text-xs font-normal text-muted-foreground"
      >
        {label}
      </FieldLabel>
      {children}
    </Field>
  )
}

export { FormField }
