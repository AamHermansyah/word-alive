import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { THIS_DEVICE } from "@/lib/data/settings"

/** The device this browser is registered as, with the self-service switch. */
function DeviceCard() {
  return (
    <Card className="min-w-0 flex-1 gap-0">
      <CardContent className="flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-[15px] font-bold md:text-base">
            This device
          </CardTitle>
          <Badge variant="success">Registered</Badge>
        </div>

        <div className="mt-3 text-sm font-bold wrap-break-word md:text-[15px]">
          {THIS_DEVICE.name}
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          <bdi>Next self-service switch available {THIS_DEVICE.nextSwitch}.</bdi>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/switch-device" />}
          >
            Switch device
          </Button>
          <Button
            variant="link"
            nativeButton={false}
            render={<Link href="/switch-device/unavailable" />}
            className="h-auto px-0 py-2 text-xs text-foreground"
          >
            Lost or broken?
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { DeviceCard }
