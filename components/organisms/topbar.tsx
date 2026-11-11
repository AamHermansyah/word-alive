import * as React from "react"

import { BrandMark } from "@/components/atoms/brand-mark"
import { PageHeading } from "@/components/molecules/page-heading"
import { UserMenu } from "@/components/molecules/user-menu"

/**
 * Page top bar: heading on the start side, page actions, then the avatar
 * menu (appearance + text direction) on the end side.
 *
 * On phones the first row is [logo, heading, avatar] and the page actions sit
 * on their own row underneath; from `sm` everything is one row.
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
    <header className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:flex-nowrap">
      <BrandMark className="size-9 md:hidden" />
      <PageHeading title={title} subtitle={subtitle} />
      {children ? (
        <div className="order-last flex w-full flex-wrap items-center gap-2 sm:order-0 sm:w-auto sm:shrink-0 sm:flex-nowrap sm:gap-3">
          {children}
        </div>
      ) : null}
      <UserMenu />
    </header>
  )
}

export { Topbar }
