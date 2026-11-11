"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { CheckMarkIcon } from "@/components/atoms/icons"
import {
  ClockIcon,
  CrossIcon,
  LockIcon,
} from "@/components/atoms/console-icons"
import { FadeIn } from "@/components/atoms/fade-in"
import { FirstRunStepCard } from "@/components/molecules/first-run-step-card"
import { Button } from "@/components/ui/button"
import { useMicPermission } from "@/hooks/use-mic-permission"
import { cn } from "@/lib/utils"

/** Where the first-run flow leads once the microphone is sorted out. */
const NEXT_HREF = "/live/trial"

/** Pause on the "allowed" state before moving on by itself. */
const AUTO_CONTINUE_MS = 1600

const ACTION_CLASS = "h-12 w-full rounded-lg text-[15px]"

/**
 * The first-run cards. The microphone card follows the browser's answer:
 *
 *   ask -> requesting -> allowed (moves on to the console)
 *                     -> blocked (adds the "how to unblock" card)
 *
 * The "Keep this tab open" note is always there. The cards stack on tablet
 * and phones and sit side by side from `xl`.
 */
function MicFirstRunBoard() {
  const router = useRouter()
  const { permission, noDevice, grantedNow, request } = useMicPermission()
  const blocked = permission === "blocked"
  const requesting = permission === "requesting"
  const allowed = permission === "allowed"

  // Moves on by itself only when the person just allowed it on this page.
  React.useEffect(() => {
    if (!allowed || !grantedNow) return
    const timer = window.setTimeout(
      () => router.push(NEXT_HREF),
      AUTO_CONTINUE_MS
    )
    return () => window.clearTimeout(timer)
  }, [allowed, grantedNow, router])

  return (
    <>
      <p role="status" className="sr-only">
        {allowed
          ? "Microphone allowed."
          : blocked
            ? "Microphone is blocked."
            : ""}
      </p>

      <div
        className={cn(
          "grid gap-4 md:gap-5",
          blocked ? "xl:grid-cols-3" : "xl:grid-cols-2"
        )}
      >
        {allowed ? (
          <FadeIn key="allowed" className="flex">
            <FirstRunStepCard
              tone="success"
              icon={<CheckMarkIcon />}
              title="Microphone allowed"
              action={
                <Button
                  className={ACTION_CLASS}
                  nativeButton={false}
                  render={<Link href={NEXT_HREF} />}
                >
                  Open the live console
                </Button>
              }
            >
              <bdi>You are all set. Opening the live console…</bdi>
            </FirstRunStepCard>
          </FadeIn>
        ) : (
          <FirstRunStepCard
            tone="info"
            icon={<LockIcon />}
            title="Allow the microphone"
            action={
              <Button
                className={ACTION_CLASS}
                onClick={request}
                disabled={requesting}
              >
                {requesting ? "Waiting for your browser…" : "Allow microphone"}
              </Button>
            }
          >
            <bdi>
              WordAlive listens only after you tap Speak now. We do not keep
              recordings.
            </bdi>
          </FirstRunStepCard>
        )}

        {blocked ? (
          <FadeIn key="blocked" className="flex">
            <FirstRunStepCard
              tone="danger"
              icon={<CrossIcon />}
              title="Microphone is blocked"
              action={
                <Button
                  variant="outline"
                  className={ACTION_CLASS}
                  onClick={request}
                >
                  Try again
                </Button>
              }
            >
              {noDevice ? (
                <p className="mb-2 text-start font-semibold text-foreground">
                  <bdi>No microphone was found on this device.</bdi>
                </p>
              ) : null}
              <ol className="list-inside list-decimal text-start">
                <li>
                  <bdi>Click the lock icon in the address bar.</bdi>
                </li>
                <li>
                  <bdi>Set Microphone to Allow.</bdi>
                </li>
                <li>
                  <bdi>Reload this page.</bdi>
                </li>
              </ol>
            </FirstRunStepCard>
          </FadeIn>
        ) : null}

        <FirstRunStepCard
          tone="warning"
          icon={<ClockIcon />}
          title="Keep this tab open"
          action={
            <Button
              variant="outline"
              className={ACTION_CLASS}
              nativeButton={false}
              render={<Link href={NEXT_HREF} />}
            >
              Got it
            </Button>
          }
        >
          <bdi>
            WordAlive stops listening if the tab sleeps or the device locks. We
            keep the screen awake while you listen.
          </bdi>
        </FirstRunStepCard>
      </div>
    </>
  )
}

export { MicFirstRunBoard }
