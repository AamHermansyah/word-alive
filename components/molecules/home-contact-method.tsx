import { SiteIcon } from "@/components/atoms/site-icon"
import type { HomeContactMethod as HomeContactMethodData } from "@/types/site"

/** "Email us / Help centre / Call us" row on the support section. */
function HomeContactMethod({ method }: { method: HomeContactMethodData }) {
  return (
    <li className="flex min-h-14 min-w-0 items-center gap-3.5 rounded-[14px] border border-border bg-card px-4 py-2">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-brand-text">
        <SiteIcon name={method.icon} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold">{method.label}</span>
        <span className="block text-xs wrap-break-word text-muted-foreground">
          <bdi>{method.value}</bdi>
        </span>
      </span>
    </li>
  )
}

export { HomeContactMethod }
