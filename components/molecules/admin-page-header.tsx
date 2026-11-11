import * as React from "react"

import { PageHeading } from "@/components/molecules/page-heading"

/**
 * Title row of every admin page: heading + one-line subtitle on the start
 * side, page actions (Export CSV, Save changes, a period filter…) on the end
 * side. On phones the actions wrap onto their own full-width row below the
 * title, like the customer top bar.
 */
function AdminPageHeader({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  /** Buttons / filters shown at the end of the row. */
  children?: React.ReactNode
}) {
  return (
    <header className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:flex-nowrap">
      <PageHeading title={title} subtitle={subtitle} />
      {children ? (
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0 sm:justify-end sm:gap-3">
          {children}
        </div>
      ) : null}
    </header>
  )
}

export { AdminPageHeader }
