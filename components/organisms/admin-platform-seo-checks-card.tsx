import { CheckIcon, CircleAlertIcon, TriangleAlertIcon } from "lucide-react"

import { FadeIn } from "@/components/atoms/fade-in"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import type { SeoCheck } from "@/hooks/use-admin-platform-seo"
import { cn } from "@/lib/utils"

const ICON = {
  ok: { Icon: CheckIcon, className: "text-success" },
  warning: { Icon: TriangleAlertIcon, className: "text-warning-soft-foreground" },
  error: { Icon: CircleAlertIcon, className: "text-destructive" },
} as const

/** Quick pass/fail list for the SEO basics; rows re-appear when their result changes. */
function AdminPlatformSeoChecksCard({
  checks,
  className,
}: {
  checks: SeoCheck[]
  className?: string
}) {
  return (
    <AdminPlatformPanel title="Checks" className={className}>
      <ul>
        {checks.map((check) => {
          const { Icon, className: tone } = ICON[check.status]
          return (
            <li key={check.id} className="py-1">
              <FadeIn
                key={check.status}
                className="flex items-center gap-2 text-[13px]"
              >
                <Icon aria-hidden="true" className={cn("size-4 shrink-0", tone)} />
                <span className="min-w-0 wrap-break-word">{check.label}</span>
              </FadeIn>
            </li>
          )
        })}
      </ul>
    </AdminPlatformPanel>
  )
}

export { AdminPlatformSeoChecksCard }
