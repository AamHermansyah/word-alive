import Link from "next/link"

import { BrandMark } from "@/components/atoms/brand-mark"
import { FOOTER_COLUMNS, SITE_PLACEHOLDERS } from "@/lib/data/site"

/** Dark footer: brand blurb on the start side, three link columns on the end. */
function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-muted">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 md:px-10 md:py-12 xl:px-20 xl:flex-row xl:justify-between">
        <div className="flex min-w-0 flex-col gap-4 xl:max-w-sm">
          <div className="flex items-center gap-2.5">
            <BrandMark />
            <span className="text-lg font-bold text-navy-foreground">
              WordAlive
            </span>
          </div>
          <p className="text-sm">
            Bible scriptures and worship lyrics on your church screen,
            automatically.
          </p>
          <span className="text-sm wrap-break-word text-navy-foreground">
            {SITE_PLACEHOLDERS.supportEmail}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 xl:gap-x-12">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-3 text-sm font-bold text-navy-foreground">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm no-underline hover:text-navy-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl border-t border-white/12 px-4 py-6 pb-24 text-[13px] sm:px-6 md:px-10 md:pb-20 xl:px-20">
        © 2026 {SITE_PLACEHOLDERS.company}. All rights reserved.
      </div>
    </footer>
  )
}

export { SiteFooter }
