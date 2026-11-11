import { SiteIcon } from "@/components/atoms/site-icon"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { HomeFeature } from "@/types/site"

const TONES = {
  brand: "bg-brand text-brand-foreground",
  info: "bg-info text-info-foreground",
} as const

/**
 * "What it does" card: icon, title, description and, pinned to the bottom, a
 * small sample of the slide the audience would see. Cards in a row stretch to
 * the tallest one, so the samples line up whatever the text length.
 */
function HomeFeatureCard({ feature }: { feature: HomeFeature }) {
  const tone = TONES[feature.tone]

  return (
    <Card className="min-w-0 gap-0 [--card-spacing:--spacing(7)]">
      <CardContent className="flex flex-1 flex-col">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-lg",
            tone
          )}
        >
          <SiteIcon name={feature.icon} className="size-5.5" />
        </div>
        <h3 className="mt-4 mb-2 text-[22px] font-bold wrap-break-word">
          {feature.title}
        </h3>
        <p className="mb-4 text-[15px] leading-5.5 text-sidebar-foreground">
          <bdi>{feature.description}</bdi>
        </p>
        <div
          className={cn(
            "mt-auto flex min-h-22.5 items-center justify-between gap-3 rounded-lg px-5 py-3 md:min-h-24",
            tone
          )}
        >
          <span className="min-w-0 font-serif text-lg wrap-break-word">
            <bdi>{feature.sample.label}</bdi>
          </span>
          <span className="min-w-0 text-end text-[13px] font-semibold wrap-break-word">
            <bdi>{feature.sample.meta}</bdi>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export { HomeFeatureCard }
