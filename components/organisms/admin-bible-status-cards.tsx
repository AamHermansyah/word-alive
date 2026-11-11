import { FadeIn } from "@/components/atoms/fade-in"
import { AdminCatalogueCard } from "@/components/molecules/admin-catalogue-card"
import { AdminCatalogueCheckItem } from "@/components/molecules/admin-catalogue-check-item"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

/** Calls used against the provider's daily limit, with the alert threshold. */
function AdminBibleUsageCard({
  used,
  limit,
  alertAt,
}: {
  used: number
  limit: number
  /** Percent of the limit at which an alert is sent. */
  alertAt: number
}) {
  const percent = Math.min(100, Math.round((used / limit) * 100))

  return (
    <AdminCatalogueCard title="Usage this month">
      <div className="text-2xl font-bold md:text-[26px]">
        <bdi>{used.toLocaleString("en-US")}</bdi>{" "}
        <span className="text-sm font-medium text-muted-foreground">
          <bdi>of {limit.toLocaleString("en-US")} daily calls at peak</bdi>
        </span>
      </div>
      <Progress
        value={percent}
        aria-label="Daily calls at peak"
        className="my-2.5"
        trackClassName="h-2"
        indicatorClassName={
          percent >= alertAt ? "bg-destructive" : "bg-chart-4"
        }
      />
      <p className="text-[13px] text-muted-foreground">
        <bdi>Alert at {alertAt}% of the limit.</bdi>
      </p>
    </AdminCatalogueCard>
  )
}

export type BibleReadinessItem = { id: string; label: string; done: boolean }

/** The go-live checklist; the badge says whether the version can be offered in Coverage. */
function AdminBibleReadinessCard({ items }: { items: BibleReadinessItem[] }) {
  const ready = items.every((item) => item.done)

  return (
    <AdminCatalogueCard title="Ready to go live">
      <ul>
        {items.map((item) => (
          <AdminCatalogueCheckItem
            key={item.id}
            state={item.done ? "done" : "pending"}
            className="py-1.25"
          >
            {item.label}
          </AdminCatalogueCheckItem>
        ))}
      </ul>
      <FadeIn key={String(ready)} className="mt-3">
        <Badge variant={ready ? "success" : "warning"} role="status">
          {ready ? "Eligible in Coverage" : "Not yet eligible"}
        </Badge>
      </FadeIn>
    </AdminCatalogueCard>
  )
}

export { AdminBibleReadinessCard, AdminBibleUsageCard }
