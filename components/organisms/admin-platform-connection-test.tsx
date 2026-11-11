"use client"

import { CircleCheckIcon, Loader2Icon, XIcon } from "lucide-react"

import { FadeIn } from "@/components/atoms/fade-in"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { AiTest } from "@/hooks/use-admin-platform-ai"

/**
 * Result of "Test connection": a progress bar while the providers are being
 * called, then the response time of each one. Hidden until a test is started.
 */
function AdminPlatformConnectionTest({
  test,
  onDismiss,
}: {
  test: AiTest
  onDismiss: () => void
}) {
  if (test.status === "idle") return null

  const testing = test.status === "testing"
  const stepIndex = Math.min(
    test.steps.length - 1,
    Math.floor((test.progress / 100) * test.steps.length)
  )
  const results = [
    test.speechMs !== null ? `Speech ${test.speechMs} ms` : null,
    test.reasoningMs !== null ? `Reasoning ${test.reasoningMs} ms` : null,
  ].filter(Boolean)

  return (
    <FadeIn key={test.status} role="status" aria-live="polite">
      <Card className="min-w-0 gap-0">
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            {testing ? (
              <Loader2Icon aria-hidden="true" className="size-4 shrink-0 animate-spin text-muted-foreground" />
            ) : (
              <CircleCheckIcon aria-hidden="true" className="size-4 shrink-0 text-success" />
            )}
            <p className="min-w-0 flex-1 text-[13px] font-semibold wrap-break-word">
              {testing ? test.steps[stepIndex] : "Connection healthy"}
              {!testing ? (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  · <bdi>{results.join(" · ")}</bdi>
                </span>
              ) : null}
            </p>
            {!testing ? (
              <Button variant="ghost" size="icon-sm" aria-label="Dismiss result" onClick={onDismiss}>
                <XIcon />
              </Button>
            ) : null}
          </div>
          <Progress
            value={test.progress}
            aria-label="Connection test progress"
            trackClassName="h-1.5"
          />
        </CardContent>
      </Card>
    </FadeIn>
  )
}

export { AdminPlatformConnectionTest }
