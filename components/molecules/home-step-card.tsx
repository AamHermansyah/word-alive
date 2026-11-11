import { Card, CardContent } from "@/components/ui/card"
import type { HomeStep } from "@/types/site"

/**
 * One of the "How it works" steps. On phones the number sits beside the text;
 * from `md` it sits above it.
 */
function HomeStepCard({ step, number }: { step: HomeStep; number: number }) {
  return (
    <Card className="h-full min-w-0 gap-0 md:min-h-47.5">
      <CardContent className="flex gap-3.5 md:flex-col md:gap-3">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground"
        >
          {number}
        </span>
        <div className="min-w-0">
          <h3 className="mb-1 text-lg font-bold wrap-break-word md:mb-1.5">
            {step.title}
          </h3>
          <p className="text-sm leading-5.5 text-sidebar-foreground">
            <bdi>{step.description}</bdi>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export { HomeStepCard }
