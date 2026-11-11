import { HomeFeatureCard } from "@/components/molecules/home-feature-card"
import {
  SiteSection,
  SiteSectionHeading,
} from "@/components/molecules/site-section"
import { HOME_FEATURES, HOME_SECTIONS } from "@/lib/data/site-home"

/** "What it does": the two jobs, scriptures and song lyrics. */
function HomeFeaturesSection() {
  const { id, ...copy } = HOME_SECTIONS.features

  return (
    <SiteSection id={id} tone="background">
      <SiteSectionHeading {...copy} className="mb-6 md:mb-8" />
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {HOME_FEATURES.map((feature) => (
          <HomeFeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </SiteSection>
  )
}

export { HomeFeaturesSection }
