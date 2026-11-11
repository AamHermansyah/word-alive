import * as React from "react"

import { cn } from "@/lib/utils"

const TONES = {
  /** White band. */
  card: "bg-card",
  /** The warm page background (alternates with the white bands). */
  background: "bg-background",
  /** Dark navy band, the same in light and dark mode. */
  navy: "bg-navy text-navy-foreground",
  /** Maroon call-to-action band. */
  brand: "bg-brand text-brand-foreground",
} as const

type SiteSectionTone = keyof typeof TONES

/**
 * One full-width band of the homepage. The band's colour spans the screen; the
 * content sits in a centred column whose side padding follows the mockups
 * (24px phones, 40px tablets, 80px desktop).
 *
 * `scroll-mt-4` leaves a little air above an anchored section. The site header
 * scrolls away with the page, so there is nothing sticky to clear; if the
 * header ever becomes sticky, raise it here once for every section.
 */
function SiteSection({
  id,
  tone = "card",
  className,
  innerClassName,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "className"> & {
  tone?: SiteSectionTone
  /** Classes for the band itself. */
  className?: string
  /** Classes for the centred content column. */
  innerClassName?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-4", TONES[tone], className)} {...props}>
      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-6 py-14 md:px-10 md:py-16 xl:px-20 xl:py-18",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}

/**
 * Eyebrow, title and one-line description that open every homepage section.
 * From `md` the block keeps a minimum height from the mockup, so a one-line
 * title leaves the same breathing room as the design.
 */
function SiteSectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  className,
}: {
  eyebrow: string
  title: string
  description: string
  /** `dark` for text on the navy band. */
  tone?: "light" | "dark"
  className?: string
}) {
  const dark = tone === "dark"

  return (
    <div className={cn("min-w-0 md:min-h-35 xl:min-h-27.5", className)}>
      <p
        className={cn(
          "mb-2 text-[13px] font-bold tracking-[0.06em] uppercase",
          dark ? "text-[#f2b8bf]" : "text-brand-text"
        )}
      >
        {eyebrow}
      </p>
      <h2 className="text-[26px] leading-[1.2] font-bold wrap-break-word md:text-[30px] xl:text-4xl">
        <bdi>{title}</bdi>
      </h2>
      <p
        className={cn(
          "mt-2.5 text-base leading-6 wrap-break-word",
          dark ? "text-navy-muted" : "text-muted-foreground"
        )}
      >
        <bdi>{description}</bdi>
      </p>
    </div>
  )
}

export { SiteSection, SiteSectionHeading }
