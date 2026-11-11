import type { Metadata } from "next"

import { NotFoundTemplate } from "@/components/templates/not-found-template"
import { SiteShell } from "@/components/templates/site-shell"

export const metadata: Metadata = { title: "Page not found" }

/** Rendered for any unknown URL (also reachable from the page switcher). */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundTemplate />
    </SiteShell>
  )
}
