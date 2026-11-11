import { HomeStatTile } from "@/components/molecules/home-stat-tile"
import {
  SiteSection,
  SiteSectionHeading,
} from "@/components/molecules/site-section"
import { HOME_LIBRARY_STATS, HOME_SECTIONS } from "@/lib/data/site-home"

/**
 * "Shared song library": navy band. Heading and figures stack below `xl`
 * (figures in a row from `md`) and sit side by side, vertically centred, at
 * `xl`.
 */
function HomeLibrarySection() {
  return (
    <SiteSection tone="navy" innerClassName="xl:flex xl:min-h-96 xl:items-center">
      <div className="flex w-full flex-col gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
        <SiteSectionHeading
          {...HOME_SECTIONS.library}
          tone="dark"
          className="xl:max-w-130 xl:min-w-0"
        />
        <ul className="grid gap-3 md:grid-cols-3 md:gap-4 xl:flex xl:shrink-0">
          {HOME_LIBRARY_STATS.map((stat) => (
            <HomeStatTile key={stat.label} stat={stat} />
          ))}
        </ul>
      </div>
    </SiteSection>
  )
}

export { HomeLibrarySection }
