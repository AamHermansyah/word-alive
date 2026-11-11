import Link from "next/link"

import { LegalContactBand } from "@/components/molecules/legal-contact-band"
import { LegalToc } from "@/components/organisms/legal-toc"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import type { LegalDocument } from "@/types/site"

/**
 * One template for Privacy Policy, Terms of Service and Refund Policy; the
 * text comes from `lib/data/legal.ts`. A white title band (breadcrumb, title,
 * date, one-line intro) sits above the warm reading area: the "On this page"
 * list (sticky beside the text from `xl`, above it below that) and the numbered
 * sections in one card, then the contact band.
 */
function LegalPageTemplate({ legal }: { legal: LegalDocument }) {
  const entries = legal.sections.map((section, index) => ({
    id: section.id,
    label: `${index + 1}. ${section.heading}`,
  }))

  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="mx-auto w-full max-w-7xl px-6 py-9 md:px-10 md:py-11 xl:px-20 xl:py-14">
          <Breadcrumb className="mb-3">
            <BreadcrumbList className="gap-1 text-[13px] sm:gap-1">
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-muted-foreground">
                  {legal.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-[30px] leading-[1.15] font-bold wrap-break-word md:text-[38px] xl:text-[44px]">
            {legal.title}
          </h1>
          <p className="mt-2 mb-3 text-sm text-muted-foreground">
            <bdi>Last updated {legal.updated}</bdi>
          </p>
          <p className="max-w-160 text-base leading-6 text-sidebar-foreground">
            <bdi>{legal.intro}</bdi>
          </p>
        </div>
      </header>

      <div className="flex-1 bg-background">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-16 xl:px-20 xl:py-14">
          <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start xl:gap-10">
            <div className="xl:sticky xl:top-6 xl:w-70 xl:shrink-0">
              <LegalToc entries={entries} />
            </div>

            <Card className="min-w-0 gap-0 [--card-spacing:--spacing(5)] md:[--card-spacing:--spacing(8)] xl:flex-1 xl:[--card-spacing:--spacing(10)]">
              <CardContent>
                {legal.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-heading`}
                    className="scroll-mt-6 border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0 md:py-8"
                  >
                    <h2
                      id={`${section.id}-heading`}
                      className="text-xl leading-7 font-bold wrap-break-word"
                    >
                      <bdi>
                        {index + 1}. {section.heading}
                      </bdi>
                    </h2>
                    <div className="mt-2.5 flex flex-col gap-3 text-base leading-6 text-sidebar-foreground md:leading-6.5">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="wrap-break-word">
                          <bdi>{paragraph}</bdi>
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </CardContent>
            </Card>
          </div>

          <LegalContactBand />
        </div>
      </div>
    </>
  )
}

export { LegalPageTemplate }
