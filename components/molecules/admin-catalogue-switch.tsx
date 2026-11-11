import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

/** The green on/off switch of the admin lists (same look as the Bible version rows). */
function AdminCatalogueSwitch({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Switch>, "size">) {
  return (
    <Switch
      size="lg"
      className={cn("data-checked:bg-success", className)}
      {...props}
    />
  )
}

export { AdminCatalogueSwitch }
