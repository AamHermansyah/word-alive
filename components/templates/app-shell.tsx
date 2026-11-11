import * as React from "react"

import { AppSidebar } from "@/components/organisms/app-sidebar"
import { PageSwitcher } from "@/components/organisms/page-switcher"

/**
 * Frame shared by every page: sidebar on the start side, page content on the
 * other. Padding follows the mockups (28px desktop, 24px tablet); on phones
 * the sidebar becomes a bottom tab bar, so the content gets 16px padding. The
 * bottom padding is larger than the side padding on purpose: it lets the last
 * block scroll up above the tab bar and the floating page switcher, so neither
 * ever covers a control.
 */
function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      <AppSidebar />
      <main className="flex min-w-0 flex-1 flex-col gap-4 p-4 pb-[calc(9rem+env(safe-area-inset-bottom))] md:gap-5 md:p-6 md:pb-20 xl:p-7 xl:pb-20">
        {children}
      </main>
      <PageSwitcher />
    </div>
  )
}

export { AppShell }
