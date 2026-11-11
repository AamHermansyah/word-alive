import type { HomeBibleVersion } from "@/types/site"

/**
 * A Bible version tile. Phones show only the code, centred; from `sm` the full
 * name sits under it (and wraps if a long translation name needs it).
 */
function HomeVersionChip({ version }: { version: HomeBibleVersion }) {
  return (
    <li className="flex min-h-14 min-w-0 flex-col items-center justify-center rounded-xl border border-border bg-card px-2 py-3 text-center sm:min-h-18 sm:items-start sm:px-4 sm:py-3 sm:text-start">
      <span className="max-w-full text-lg font-bold wrap-anywhere">{version.code}</span>
      <span className="sr-only max-w-full text-xs text-muted-foreground wrap-anywhere sm:not-sr-only">
        {version.name}
      </span>
    </li>
  )
}

export { HomeVersionChip }
