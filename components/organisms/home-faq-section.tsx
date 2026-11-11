import {
  SiteSection,
  SiteSectionHeading,
} from "@/components/molecules/site-section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HOME_FAQ, HOME_SECTIONS } from "@/lib/data/site-home"

/**
 * FAQ: heading beside the list from `xl`, above it below. Every question is
 * its own rounded card; the first answer starts open, as in the mockup.
 */
function HomeFaqSection() {
  const { id, ...copy } = HOME_SECTIONS.faq

  return (
    <SiteSection id={id} tone="card">
      <div className="flex flex-col gap-6 md:gap-8 xl:flex-row xl:gap-20">
        <SiteSectionHeading
          {...copy}
          className="xl:w-85 xl:shrink-0 xl:min-h-0"
        />
        <Accordion
          defaultValue={[HOME_FAQ[0].id]}
          className="min-w-0 gap-3 overflow-visible rounded-none border-0 xl:flex-1"
        >
          {HOME_FAQ.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="rounded-xl border border-border bg-card data-open:bg-card"
            >
              <AccordionTrigger className="min-h-16 items-center gap-4 rounded-xl px-6 py-3 text-base font-bold hover:no-underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 **:data-[slot=accordion-trigger-icon]:size-5">
                <span className="min-w-0 wrap-break-word">
                  <bdi>{item.question}</bdi>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-5 text-[15px] leading-6 text-sidebar-foreground">
                <bdi>{item.answer}</bdi>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SiteSection>
  )
}

export { HomeFaqSection }
