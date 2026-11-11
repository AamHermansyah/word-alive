import type { Metadata, Viewport } from "next"
import { cookies } from "next/headers"
import { Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import { AppProviders } from "@/components/providers/app-providers"
import { DIRECTION_COOKIE, type Direction } from "@/lib/direction"
import { cn } from "@/lib/utils"

/** Same family + weights the mockup loads (400/500/600/700). */
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext", "vietnamese", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

/** Plus Jakarta Sans has no Arabic glyphs; this is the RTL fallback. */
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "WordAlive",
    template: "%s · WordAlive",
  },
  description:
    "Live scripture and song display for churches. Listen, follow, and show the right words on screen.",
}

export const viewport: Viewport = {
  // `cover` lets the mobile tab bar use the safe-area insets (notch, home bar).
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1322" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const direction: Direction =
    cookieStore.get(DIRECTION_COOKIE)?.value === "rtl" ? "rtl" : "ltr"

  return (
    <html
      lang="en"
      dir={direction}
      suppressHydrationWarning
      className={cn(
        plusJakartaSans.variable,
        notoSansArabic.variable,
        "font-sans antialiased"
      )}
    >
      <body>
        <AppProviders initialDirection={direction}>{children}</AppProviders>
      </body>
    </html>
  )
}
