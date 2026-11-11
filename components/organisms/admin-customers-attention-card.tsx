import { AdminCustomersCardHeading } from "@/components/molecules/admin-customers-card-heading"
import { AdminCustomersTextAction } from "@/components/molecules/admin-customers-text-action"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AdminAttentionItem } from "@/types/admin-customers"

/** "Needs attention": things an admin should look at, each with a link. */
function AdminCustomersAttentionCard({
  items,
}: {
  items: AdminAttentionItem[]
}) {
  return (
    <Card className="min-w-0 gap-0 xl:min-h-62.5">
      <CardContent>
        <AdminCustomersCardHeading title="Needs attention" />
        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2.5 border-t border-border md:py-2.25"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    item.severity === "danger" ? "bg-destructive" : "bg-chart-4"
                  )}
                />
                <span className="min-w-0 flex-1 text-[13px] wrap-break-word">
                  <bdi>{item.text}</bdi>
                </span>
                <AdminCustomersTextAction href={item.href} className="md:py-0">
                  {item.action}
                </AdminCustomersTextAction>
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-t border-border py-8 text-center text-sm text-muted-foreground">
            Nothing needs attention right now.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export { AdminCustomersAttentionCard }
