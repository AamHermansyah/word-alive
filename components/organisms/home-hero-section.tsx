import Link from "next/link"

import { FadeIn } from "@/components/atoms/fade-in"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HOME_HERO } from "@/lib/data/site-home"

/**
 * Homepage hero. Phones keep the text on the start side with full-width
 * buttons, tablets centre everything over the preview, and from `xl` the text
 * and the preview sit side by side.
 *
 * The preview is a small collage of what the audience sees: the scripture
 * slide, a "Listening" pill, and the matched song stanza overlapping the
 * slide's corner. All three share one grid cell, so nothing is positioned
 * with fixed offsets: the slide and the stanza card grow with their text and
 * the collage grows with them.
 */
function HomeHeroSection() {
  const hero = HOME_HERO

  return (
    <section className="bg-card">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-6 py-14 text-start md:items-center md:gap-10 md:px-10 md:text-center xl:flex-row xl:justify-between xl:px-20 xl:py-26 xl:text-start">
        <div className="flex w-full min-w-0 flex-col items-start md:max-w-165 md:items-center xl:max-w-130 xl:items-start">
          <Badge
            variant="brand"
            className="px-3.5 py-1.5 text-[13px] whitespace-normal"
          >
            <bdi>{hero.badge}</bdi>
          </Badge>
          <h1 className="mt-4.5 mb-4 text-[34px] leading-[1.1] font-bold wrap-break-word md:text-[46px] xl:text-[56px]">
            <bdi>
              {hero.titleLead}{" "}
              <span className="text-brand-text">{hero.titleAccent}</span>
            </bdi>
          </h1>
          <p className="text-base leading-[1.6] text-sidebar-foreground xl:text-lg">
            <bdi>{hero.lead}</bdi>
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:mt-7">
            <Button
              nativeButton={false}
              render={<Link href="/setup" />}
              size="lg"
              className="h-13 rounded-lg px-6 text-[15px]"
            >
              {hero.primaryCta}
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/#how-it-works" />}
              variant="outline"
              size="lg"
              className="h-13 rounded-lg px-6 text-[15px]"
            >
              {hero.secondaryCta}
            </Button>
          </div>
          <p className="mt-4 text-[13px] text-muted-foreground">
            <bdi>{hero.note}</bdi>
          </p>
        </div>

        <FadeIn className="w-full min-w-0 delay-150 md:max-w-175 xl:max-w-135">
          <HomeHeroPreview />
        </FadeIn>
      </div>
    </section>
  )
}

function HomeHeroPreview() {
  const { verse, stanza } = HOME_HERO

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[auto_2.375rem_auto] md:grid-rows-[auto_3.75rem_auto] xl:grid-rows-[auto_4.125rem_auto]">
      <span className="z-10 col-start-1 row-start-1 ms-6 flex items-center gap-2 self-start justify-self-start rounded-full bg-success px-3.5 py-1.75 text-[13px] font-semibold text-success-foreground">
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-success-foreground"
        />
        Listening
      </span>

      {/* Slide: rows 1-2. The middle row is the overlap band, so the stanza
          card always covers the same strip of the slide however much text
          either one holds. On phones the stanza card reaches far across the
          slide, so the slide's bottom padding keeps its reference clear of
          that strip; from md the reference sits beside the stanza card. */}
      <div className="col-start-1 row-start-1 row-end-3 mt-7 flex min-h-47.5 w-[94%] flex-col justify-between gap-4 rounded-2xl bg-brand p-5 pb-12.5 text-brand-foreground md:mt-7.5 md:min-h-67.5 md:w-4/5 md:p-7 xl:mt-9 xl:min-h-75 xl:w-[96%]">
        <p className="font-serif text-[15px] leading-[1.45] wrap-break-word md:text-xl xl:text-[22px]">
          <bdi>{verse.text}</bdi>
        </p>
        <p className="text-sm font-semibold wrap-break-word">
          <bdi>{verse.reference}</bdi>
        </p>
      </div>

      {/* Stanza card: rows 2-3, anchored to the slide's end corner. */}
      <div className="col-start-1 row-start-2 row-end-4 flex min-h-30 w-2/3 flex-col justify-between gap-3 justify-self-end rounded-xl bg-info p-3.5 text-info-foreground ring-6 ring-card md:min-h-35 md:w-[39%] md:p-5 xl:min-h-42.5 xl:w-[56%]">
        <p className="text-xs text-navy-muted wrap-break-word">
          <bdi>{stanza.caption}</bdi>
        </p>
        <p className="font-serif text-sm leading-[1.4] wrap-break-word md:text-base xl:text-lg">
          <bdi>{stanza.line}</bdi>
        </p>
      </div>
    </div>
  )
}

export { HomeHeroSection }
