import Link from "next/link"

import { SiteSection } from "@/components/molecules/site-section"
import { Button } from "@/components/ui/button"
import { HOME_CLOSING } from "@/lib/data/site-home"

/** Final maroon call to action. */
function HomeClosingSection() {
  return (
    <SiteSection tone="brand" innerClassName="text-center">
      <h2 className="text-[28px] leading-[1.2] font-bold wrap-break-word md:text-[34px] xl:text-[40px]">
        <bdi>{HOME_CLOSING.title}</bdi>
      </h2>
      <p className="mt-3 mb-6 text-base text-[#f2d5d9]">
        <bdi>{HOME_CLOSING.description}</bdi>
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/setup" />}
        size="lg"
        className="h-13 rounded-lg border-navy-foreground bg-navy-foreground px-6 text-[15px] text-navy hover:bg-navy-foreground/90"
      >
        {HOME_CLOSING.cta}
      </Button>
    </SiteSection>
  )
}

export { HomeClosingSection }
