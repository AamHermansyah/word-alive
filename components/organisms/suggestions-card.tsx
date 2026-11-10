import { SuggestionItem } from "@/components/molecules/suggestion-item"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Suggestion } from "@/types"

function SuggestionsCard({
  suggestions,
  onShow,
  onDismiss,
}: {
  suggestions: Suggestion[]
  onShow: (suggestion: Suggestion) => void
  onDismiss: (id: string) => void
}) {
  return (
    <Card className="h-60 min-w-0 flex-1 gap-0 xl:h-62.5">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Suggestions</CardTitle>
        <Badge variant="secondary">{suggestions.length}</Badge>
      </CardHeader>

      <CardContent>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={suggestion.id}
                suggestion={suggestion}
                expanded={index === 0}
                onShow={() => onShow(suggestion)}
                onDismiss={() => onDismiss(suggestion.id)}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-3.5 text-[13px] text-muted-foreground">
            Listening for scripture references. Matches will appear here.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export { SuggestionsCard }
