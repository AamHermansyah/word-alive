import { HomeVersionChip } from "@/components/molecules/home-version-chip"
import {
  SiteSection,
  SiteSectionHeading,
} from "@/components/molecules/site-section"
import {
  HOME_BIBLE_VERSIONS,
  HOME_SECTIONS,
  HOME_VERSIONS_NOTE,
} from "@/lib/data/site-home"

/** "Bible versions": a grid of version tiles and the licensing note. */
function HomeVersionsSection() {
  const { id, ...copy } = HOME_SECTIONS.versions

  return (
    <SiteSection id={id} tone="background">
      <SiteSectionHeading {...copy} className="mb-6 md:mb-8" />
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 xl:grid-cols-6">
        {HOME_BIBLE_VERSIONS.map((version) => (
          <HomeVersionChip key={version.code} version={version} />
        ))}
      </ul>
      <p className="mt-5 text-[13px] text-muted-foreground">
        <bdi>{HOME_VERSIONS_NOTE}</bdi>
      </p>
    </SiteSection>
  )
}

export { HomeVersionsSection }
