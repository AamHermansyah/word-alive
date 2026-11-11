import * as React from "react"

import { BookIcon, MusicIcon } from "@/components/atoms/icons"
import { cn } from "@/lib/utils"
import type { SiteIconName } from "@/types/site"

/**
 * Line icons of the public website, drawn from the mockup's own paths (same
 * 24px grid and 2px stroke as the app icons). `book` and `music` reuse the
 * app icon set; the rest only exist on the website.
 */
function WebsiteGlyph({
  className,
  children,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  )
}

const GLYPHS: Record<
  SiteIconName,
  (props: React.ComponentProps<"svg">) => React.JSX.Element
> = {
  book: BookIcon,
  music: MusicIcon,
  shield: (props) => (
    <WebsiteGlyph {...props}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    </WebsiteGlyph>
  ),
  sliders: (props) => (
    <WebsiteGlyph {...props}>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" />
    </WebsiteGlyph>
  ),
  monitor: (props) => (
    <WebsiteGlyph {...props}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </WebsiteGlyph>
  ),
  mail: (props) => (
    <WebsiteGlyph {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </WebsiteGlyph>
  ),
  help: (props) => (
    <WebsiteGlyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01" />
    </WebsiteGlyph>
  ),
  phone: (props) => (
    <WebsiteGlyph {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </WebsiteGlyph>
  ),
}

function SiteIcon({
  name,
  ...props
}: { name: SiteIconName } & React.ComponentProps<"svg">) {
  const Glyph = GLYPHS[name]
  return <Glyph {...props} />
}

export { SiteIcon }
