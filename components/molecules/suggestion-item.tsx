import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Suggestion } from "@/types"

/**
 * One scripture suggestion. The top suggestion is `expanded` (boxed, with the
 * heard quote and Show / Dismiss); the others are a compact single row.
 */
function SuggestionItem({
  suggestion,
  expanded,
  onShow,
  onDismiss,
}: {
  suggestion: Suggestion
  expanded: boolean
  onShow: () => void
  onDismiss: () => void
}) {
  if (expanded) {
    return (
      <li className="mt-3.5 rounded-lg border border-border p-3 first:mt-3.5">
        <div className="text-[15px] font-bold">{suggestion.reference}</div>
        <div className="mt-0.5 mb-2.5 text-xs text-muted-foreground">
          <bdi>
            {suggestion.match}% match
            {suggestion.quote ? ` · "${suggestion.quote}"` : null}
          </bdi>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="px-4" onClick={onShow}>
            Show
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-4"
            onClick={onDismiss}
          >
            Dismiss
          </Button>
        </div>
      </li>
    )
  }

  return (
    <li className={cn("mt-2.5 flex items-center gap-2")}>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{suggestion.reference}</div>
        <div className="text-xs text-muted-foreground">
          <bdi>{suggestion.match}% match</bdi>
        </div>
      </div>
      <Button variant="outline" size="sm" className="px-4" onClick={onShow}>
        Show
      </Button>
    </li>
  )
}

export { SuggestionItem }
