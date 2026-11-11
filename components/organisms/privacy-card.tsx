import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

/** The privacy promise and the way to delete the church's data. */
function PrivacyCard({ onDelete }: { onDelete: () => void }) {
  return (
    <Card className="min-w-0 gap-0">
      <CardContent className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <CardTitle className="text-[15px] font-bold md:text-base">
            Privacy
          </CardTitle>
          <div className="mt-1 text-xs text-muted-foreground md:text-[13px]">
            Audio is processed live and is not stored.
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full text-destructive hover:text-destructive sm:w-auto"
          onClick={onDelete}
        >
          Delete my data
        </Button>
      </CardContent>
    </Card>
  )
}

export { PrivacyCard }
