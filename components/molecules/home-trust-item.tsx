import { SiteIcon } from "@/components/atoms/site-icon"
import type { HomeTrustItem as HomeTrustItemData } from "@/types/site"

/** One of the three "Built for live services" points. */
function HomeTrustItem({ item }: { item: HomeTrustItemData }) {
  return (
    <li className="min-w-0">
      <div className="flex size-11 items-center justify-center rounded-lg bg-secondary text-brand-text">
        <SiteIcon name={item.icon} className="size-5.5" />
      </div>
      <h3 className="mt-3 mb-1.5 text-lg font-bold wrap-break-word">
        {item.title}
      </h3>
      <p className="text-sm leading-5.5 text-sidebar-foreground">
        <bdi>{item.description}</bdi>
      </p>
    </li>
  )
}

export { HomeTrustItem }
