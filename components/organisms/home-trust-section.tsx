import { HomeTrustItem } from "@/components/molecules/home-trust-item"
import {
  SiteSection,
  SiteSectionHeading,
} from "@/components/molecules/site-section"
import { HOME_SECTIONS, HOME_TRUST_ITEMS } from "@/lib/data/site-home"

/** "Built for live services": three short reassurances. */
function HomeTrustSection() {
  return (
    <SiteSection tone="background">
      <SiteSectionHeading {...HOME_SECTIONS.trust} className="mb-6 md:mb-8" />
      <ul className="grid gap-8 md:grid-cols-3 md:gap-6 xl:gap-10">
        {HOME_TRUST_ITEMS.map((item) => (
          <HomeTrustItem key={item.title} item={item} />
        ))}
      </ul>
    </SiteSection>
  )
}

export { HomeTrustSection }
