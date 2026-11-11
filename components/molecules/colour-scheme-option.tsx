import type { ColourScheme } from "@/types"

/**
 * One audience-screen colour scheme: two sample slide tiles over the scheme's
 * name. A real radio input (visually hidden) sits inside the label, so it is
 * keyboard and screen-reader accessible; the selected card gets a brand outline.
 */
function ColourSchemeOption({
  scheme,
  name,
  checked,
  onSelect,
}: {
  scheme: ColourScheme
  /** Shared by the options of one group so they behave as one radio group. */
  name: string
  checked: boolean
  onSelect: () => void
}) {
  return (
    <label className="flex min-w-0 cursor-pointer flex-col gap-2 rounded-lg border border-input bg-card p-2 transition-colors hover:bg-muted/40 has-checked:border-brand has-checked:ring-1 has-checked:ring-brand has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 md:p-2.5">
      <input
        type="radio"
        name={name}
        value={scheme.id}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span aria-hidden="true" className="flex gap-1.5">
        {scheme.swatches.map((colour) => (
          <span
            key={colour}
            style={{ backgroundColor: colour }}
            className="flex h-7 min-w-0 flex-1 items-center justify-center rounded-md font-serif text-xs font-bold text-white"
          >
            Aa
          </span>
        ))}
      </span>
      <span className="text-xs font-semibold wrap-break-word md:text-[13px]">
        {scheme.label}
      </span>
    </label>
  )
}

export { ColourSchemeOption }
