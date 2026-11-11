import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/** Search box with a leading magnifier, for the top row of an admin page. */
function AdminCatalogueSearchField({
  label,
  value,
  onValueChange,
  placeholder,
  className,
}: {
  /** Accessible name; there is no visible label. */
  label: string
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cn("relative min-w-0", className)}>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        aria-label={label}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        className="ps-9"
        onChange={(event) => onValueChange(event.target.value)}
      />
    </div>
  )
}

export { AdminCatalogueSearchField }
