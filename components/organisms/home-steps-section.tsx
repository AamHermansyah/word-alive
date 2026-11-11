import { HomeStepCard } from "@/components/molecules/home-step-card"
import {
  SiteSection,
  SiteSectionHeading,
} from "@/components/molecules/site-section"
import { HOME_SECTIONS, HOME_STEPS } from "@/lib/data/site-home"

/** "How it works": three numbered steps. */
function HomeStepsSection() {
  const { id, ...copy } = HOME_SECTIONS.steps

  return (
    <SiteSection id={id} tone="card">
      <SiteSectionHeading {...copy} className="mb-6 md:mb-8" />
      <ol className="grid gap-3 md:grid-cols-3 md:gap-6">
        {HOME_STEPS.map((step, index) => (
          <li key={step.title} className="min-w-0">
            <HomeStepCard step={step} number={index + 1} />
          </li>
        ))}
      </ol>
    </SiteSection>
  )
}

export { HomeStepsSection }
