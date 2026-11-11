import { cn } from "@/lib/utils"
import type { DeviceDescription } from "@/types/onboarding"

/** One of the two devices on the switch page; the new one gets the navy outline. */
function DeviceSwitchTile({
  device,
  highlighted,
}: {
  device: DeviceDescription
  highlighted?: boolean
}) {
  return (
    <div
      className={cn(
        "min-w-0 flex-1 rounded-[14px] border border-input p-3.5 text-start",
        highlighted && "border-primary inset-ring-1 inset-ring-primary"
      )}
    >
      <div className="text-xs text-muted-foreground">
        <bdi>{device.label}</bdi>
      </div>
      <div className="mt-0.5 text-[15px] font-bold wrap-break-word">
        <bdi>{device.name}</bdi>
      </div>
      <div className="text-[13px] text-muted-foreground">
        <bdi>{device.detail}</bdi>
      </div>
    </div>
  )
}

export { DeviceSwitchTile }
