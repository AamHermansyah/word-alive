import { SiteFooter } from "@/components/organisms/site-footer"
import { SiteHeader } from "@/components/organisms/site-header"

/**
 * Frame for the public website (homepage, legal pages, 404): header on top,
 * page content in the middle (grows to push the footer to the bottom edge),
 * dark footer. Content width is decided by each page, so the homepage can use
 * full-bleed sections while legal pages stay in a reading column.
 */
function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background animate-in fade-in-0 duration-300 motion-reduce:animate-none">
      <SiteHeader />
      <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  )
}

export { SiteShell }
