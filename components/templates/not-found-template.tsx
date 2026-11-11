import Link from "next/link"

import { Button } from "@/components/ui/button"

/**
 * "404 · This page could not be found", centred in the website frame. The
 * band keeps the mockup's height as a minimum and grows with the viewport.
 */
function NotFoundTemplate() {
  return (
    <section className="flex min-h-130 flex-1 flex-col items-center justify-center px-6 py-14 text-center md:min-h-140 md:px-10 md:py-16 xl:min-h-130 xl:px-20 xl:py-18">
      <p className="text-7xl leading-none font-bold text-brand-text xl:text-[88px]">
        404
      </p>
      <h1 className="mt-3 mb-2 text-[26px] font-bold wrap-break-word">
        <bdi>This page could not be found</bdi>
      </h1>
      <p className="mb-6 text-base wrap-break-word text-sidebar-foreground">
        <bdi>The link may be old, or the page may have moved.</bdi>
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/" />}
        size="lg"
        className="h-13 rounded-lg px-6 text-[15px]"
      >
        Back to the homepage
      </Button>
    </section>
  )
}

export { NotFoundTemplate }
