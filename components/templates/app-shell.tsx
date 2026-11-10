import * as React from "react"

import { AppSidebar } from "@/components/organisms/app-sidebar"

/**
 * Frame shared by every page: sidebar on the start side, page content on the
 * other. Padding follows the mockups (28px desktop, 24px tablet).
 */
function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex min-w-0 flex-1 flex-col gap-5 p-6 xl:p-7">
        {children}
      </main>
    </div>
  )
}

export { AppShell }
