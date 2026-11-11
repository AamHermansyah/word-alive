import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/** Search box of the admin list pages: full width on phones, 300px from `sm`. */
function AdminCustomersSearch({
  value,
  onValueChange,
  placeholder,
  className,
}: {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  className?: string
}) {
  return (
    <Input
      type="text"
      role="searchbox"
      inputMode="search"
      autoComplete="off"
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className={cn("w-full sm:w-75", className)}
    />
  )
}

export { AdminCustomersSearch }
