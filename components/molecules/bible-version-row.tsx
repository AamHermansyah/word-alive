import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RIGHTS_LABEL, RIGHTS_VARIANT } from "@/lib/data/songs"
import type { BibleVersion } from "@/types"

/**
 * Column template shared by the table header and every row (md and up):
 * code tile, name, rights, status. The tile and status columns hold fixed
 * controls; the text columns share the rest.
 */
export const BIBLE_GRID =
  "md:grid md:grid-cols-[3.5rem_minmax(0,1.6fr)_minmax(0,1fr)_6.5rem] md:items-center md:gap-3"

/**
 * One Bible version. Phones get a compact card (code tile, name and rights on
 * the left, status control on the end); from `md` the cells join the shared
 * table columns.
 *
 * Status: the default version shows a "Default" badge; with `lockedAction`
 * (the free trial) every other version is a link to the plan page instead;
 * a version the plan lacks shows its plan, anything else is a switch.
 */
function BibleVersionRow({
  version,
  isDefault,
  checked,
  disabled,
  onCheckedChange,
  lockedAction,
}: {
  version: BibleVersion
  isDefault: boolean
  checked: boolean
  /** The switch cannot be turned on (the plan's limit is reached). */
  disabled: boolean
  onCheckedChange: (checked: boolean) => void
  /** Replaces the switch with a link (e.g. "Choose a plan" during the trial). */
  lockedAction?: { label: string; href: string }
}) {
  return (
    <li
      className={`${BIBLE_GRID} grid grid-cols-[auto_minmax(0,1fr)_fit-content(40%)] items-center gap-x-3 gap-y-1.5 border-t border-border py-3 first:border-t-0 md:py-2.5 md:first:border-t`}
    >
      <div
        aria-hidden="true"
        className="row-span-2 flex h-9 w-14 items-center justify-center rounded-md bg-secondary px-2 text-xs font-bold md:row-auto md:w-full"
      >
        {version.code}
      </div>

      <div className="min-w-0">
        <div className="text-[13px] font-bold wrap-break-word md:text-sm">
          {version.name}
        </div>
        <div className="text-xs text-muted-foreground">{version.language}</div>
      </div>

      <div className="col-start-2 row-start-2 md:col-auto md:row-auto md:justify-self-center">
        <Badge variant={RIGHTS_VARIANT[version.rights]}>
          {RIGHTS_LABEL[version.rights]}
        </Badge>
      </div>

      <div className="col-start-3 row-span-2 row-start-1 flex justify-end md:col-auto md:row-auto md:row-start-auto">
        {isDefault ? (
          <Badge variant="brand">Default</Badge>
        ) : lockedAction ? (
          <Badge
            variant="neutral"
            render={<Link href={lockedAction.href} />}
            className="min-h-10 max-w-20 text-center wrap-anywhere outline-none hover:text-foreground sm:max-w-none md:min-h-0"
          >
            {lockedAction.label}
          </Badge>
        ) : version.requiresPlan ? (
          <Badge variant="neutral" className="wrap-anywhere">
            {version.requiresPlan} plan
          </Badge>
        ) : (
          <Switch
            size="lg"
            aria-label={`Use ${version.name}`}
            checked={checked}
            disabled={disabled}
            onCheckedChange={onCheckedChange}
            className="data-checked:bg-success!"
          />
        )}
      </div>
    </li>
  )
}

export { BibleVersionRow }
