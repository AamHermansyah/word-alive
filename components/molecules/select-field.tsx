import { FormField } from "@/components/molecules/form-field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/** A labelled dropdown over a list of plain string options. */
function SelectField({
  id,
  label,
  value,
  onValueChange,
  options,
  className,
}: {
  id: string
  label: string
  value: string
  onValueChange: (value: string) => void
  options: readonly string[]
  className?: string
}) {
  return (
    <FormField label={label} htmlFor={id} className={className}>
      <Select
        value={value}
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

export { SelectField }
