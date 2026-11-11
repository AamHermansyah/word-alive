import { FormField } from "@/components/molecules/form-field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

/** A labelled dropdown over plain string options; it can be disabled. */
function AdminCatalogueSelectField({
  id,
  label,
  value,
  onValueChange,
  options,
  disabled,
  className,
}: {
  id: string
  label: string
  value: string
  onValueChange: (value: string) => void
  options: readonly string[]
  disabled?: boolean
  className?: string
}) {
  return (
    <FormField label={label} htmlFor={id} className={cn("min-w-0", className)}>
      <Select
        // Items let the trigger print the label on the server too.
        items={options.map((option) => ({ value: option, label: option }))}
        value={value}
        disabled={disabled}
        onValueChange={(next) => next && onValueChange(next)}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormField>
  )
}

export { AdminCatalogueSelectField }
