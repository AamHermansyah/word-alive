import { HomeContactMethod } from "@/components/molecules/home-contact-method"
import {
  SiteSection,
  SiteSectionHeading,
} from "@/components/molecules/site-section"
import { HomeContactForm } from "@/components/organisms/home-contact-form"
import { HOME_CONTACT_METHODS, HOME_SECTIONS } from "@/lib/data/site-home"

/**
 * Support: contact details and the message form. Side by side from `xl`
 * (details stacked on the start side); below that the details become a row of
 * three from `md` and a stack on phones, with the form underneath.
 */
function HomeSupportSection() {
  const { id, ...copy } = HOME_SECTIONS.support

  return (
    <SiteSection id={id} tone="background">
      <div className="flex flex-col gap-6 md:gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
        <div className="min-w-0 xl:max-w-110 xl:flex-1">
          <SiteSectionHeading {...copy} className="mb-6 md:mb-6" />
          <ul className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
            {HOME_CONTACT_METHODS.map((method) => (
              <HomeContactMethod key={method.label} method={method} />
            ))}
          </ul>
        </div>
        <div className="min-w-0 xl:max-w-150 xl:flex-1">
          <HomeContactForm />
        </div>
      </div>
    </SiteSection>
  )
}

export { HomeSupportSection }
