import { SiteSmoothScroll } from "@/components/atoms/site-smooth-scroll"
import { HomeClosingSection } from "@/components/organisms/home-closing-section"
import { HomeFaqSection } from "@/components/organisms/home-faq-section"
import { HomeFeaturesSection } from "@/components/organisms/home-features-section"
import { HomeHeroSection } from "@/components/organisms/home-hero-section"
import { HomeLibrarySection } from "@/components/organisms/home-library-section"
import { HomePricingSection } from "@/components/organisms/home-pricing-section"
import { HomeStepsSection } from "@/components/organisms/home-steps-section"
import { HomeSupportSection } from "@/components/organisms/home-support-section"
import { HomeTrustSection } from "@/components/organisms/home-trust-section"
import { HomeVersionsSection } from "@/components/organisms/home-versions-section"

/**
 * Public homepage. Bands alternate white / warm background, in the order of
 * the mockup: hero, what it does, how it works, Bible versions, shared song
 * library, pricing, built for live services, FAQ, support, closing call to
 * action. The header and footer come from the website shell.
 */
function HomeTemplate() {
  return (
    <>
      <SiteSmoothScroll />
      <HomeHeroSection />
      <HomeFeaturesSection />
      <HomeStepsSection />
      <HomeVersionsSection />
      <HomeLibrarySection />
      <HomePricingSection />
      <HomeTrustSection />
      <HomeFaqSection />
      <HomeSupportSection />
      <HomeClosingSection />
    </>
  )
}

export { HomeTemplate }
