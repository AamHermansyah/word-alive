import type { ServiceItem } from "@/types/console"

/**
 * What the audience screen showed during one service: each scripture or song
 * with the time it went up. Long names wrap; an empty service says so.
 */
function ServiceItemsList({
  items,
  className,
}: {
  items: ServiceItem[]
  className?: string
}) {
  if (items.length === 0) {
    return (
      <p className="border-t border-border pt-2.5 text-xs text-muted-foreground">
        Nothing was shown during this service.
      </p>
    )
  }

  return (
    <ul className={className}>
      {items.map((item) => (
        <li
          key={item.id}
          className="flex justify-between gap-3 border-t border-border py-2.25 text-[13px]"
        >
          <span className="min-w-0 font-semibold wrap-break-word">
            <bdi>{item.label}</bdi>
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            <bdi>{item.time}</bdi>
          </span>
        </li>
      ))}
    </ul>
  )
}

export { ServiceItemsList }
