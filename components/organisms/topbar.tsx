import * as React from "react"

import { PageHeading } from "@/components/molecules/page-heading"
import { UserMenu } from "@/components/molecules/user-menu"

/**
 * Page top bar: heading on the start side, page actions, then the avatar
 * menu (appearance + text direction) on the end side.
 */
function Topbar({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  /** Page-specific actions (status pill, buttons, billing switch…) */
  children?: React.ReactNode
}) {
  return (
    <header className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
      <PageHeading title={title} subtitle={subtitle} />
      {children}
      <UserMenu />
    </header>
  )
}

export { Topbar }
