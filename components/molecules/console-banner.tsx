"use client"

import Link from "next/link"
import { toast } from "sonner"

import { CONSOLE_BANNER_ICONS } from "@/components/atoms/console-icons"
import { ConsoleToneTile } from "@/components/atoms/console-tone-tile"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ConsoleBannerItem } from "@/types/console"

/**
 * One warning or degraded-mode notice of the live console, built on the
 * shadcn `Alert`. The tone (warning / danger / info) tints the icon tile, and
 * the optional action is a link to a page or a button that confirms with a
 * toast.
 *
 * Layout: icon | text | action on one row from `sm`; on phones the action
 * moves under the text so it keeps a full-size touch target. Title and text
 * wrap, nothing is truncated. Urgent (danger) notices are announced
 * assertively, the rest politely.
 */
function ConsoleBanner({
  banner,
  className,
}: {
  banner: ConsoleBannerItem
  className?: string
}) {
  const Icon = CONSOLE_BANNER_ICONS[banner.icon]
  const { action } = banner

  return (
    <Alert
      role={banner.tone === "danger" ? "alert" : "status"}
      className={cn(
        "grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3.5 gap-y-0 rounded-xl p-4 sm:grid-cols-[auto_minmax(0,1fr)_fit-content(40%)]",
        className
      )}
    >
      <ConsoleToneTile
        tone={banner.tone}
        className="row-span-2 sm:row-span-1"
      >
        <Icon />
      </ConsoleToneTile>

      <div className="col-start-2 min-w-0">
        <AlertTitle className="font-bold wrap-break-word">
          <bdi>{banner.title}</bdi>
        </AlertTitle>
        <AlertDescription className="mt-0.5 text-[13px] leading-5 text-pretty wrap-break-word">
          <bdi>{banner.description}</bdi>
        </AlertDescription>
      </div>

      {action ? (
        <div className="col-start-2 sm:col-start-3 sm:row-start-1">
          <Button
            variant="link"
            className="h-10 px-0 text-[13px] text-brand-text hover:no-underline sm:h-auto"
            {...(action.href
              ? {
                  nativeButton: false,
                  render: <Link href={action.href} />,
                }
              : {
                  onClick: () => toast(action.toast ?? action.label),
                })}
          >
            {action.label}
          </Button>
        </div>
      ) : null}
    </Alert>
  )
}

export { ConsoleBanner }
