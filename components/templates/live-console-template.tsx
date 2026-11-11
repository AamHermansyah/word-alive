"use client"

import Link from "next/link"

import { StatusDot } from "@/components/atoms/status-dot"
import { MicPanel } from "@/components/organisms/mic-panel"
import { NowShowingPanel } from "@/components/organisms/now-showing-panel"
import { RecentActivityCard } from "@/components/organisms/recent-activity-card"
import { SongFollowingCard } from "@/components/organisms/song-following-card"
import { SuggestionsCard } from "@/components/organisms/suggestions-card"
import { Topbar } from "@/components/organisms/topbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLiveConsole } from "@/hooks/use-live-console"
import {
  TRIAL_CONSOLE_SUBTITLE,
  TRIAL_HOURS_LEFT,
} from "@/lib/data/console"
import { SONG_FOLLOW } from "@/lib/data/live"

/**
 * Live console layout.
 *   desktop: [mic | now showing] over [suggestions | song | activity]
 *   tablet : mic strip, now showing, then [suggestions | song]
 *
 * `trial` is the same console during the free trial: the subtitle and the
 * "Hours left" figure show the trial allowance, and phones (where the sidebar
 * plan card is not shown) get a "Choose a plan" button in the top bar.
 */
function LiveConsoleTemplate({ trial = false }: { trial?: boolean }) {
  const live = useLiveConsole(trial ? { hoursLeft: TRIAL_HOURS_LEFT } : {})

  return (
    <>
      <Topbar
        title="Live console"
        subtitle={trial ? TRIAL_CONSOLE_SUBTITLE : "Sunday service · English"}
      >
        <Badge
          variant="success"
          className="px-3 py-1.75 text-xs md:px-3.5 md:text-[13px] xl:gap-2"
        >
          <StatusDot className="hidden xl:inline-block" />
          <span className="xl:hidden">Audience connected</span>
          <span className="hidden xl:inline">Audience screen connected</span>
        </Badge>
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          nativeButton={false}
          render={<Link href="/audience-link" />}
        >
          <span className="xl:hidden">Audience screen</span>
          <span className="hidden xl:inline">Open audience screen</span>
        </Button>
        {trial ? (
          <Button
            className="w-full sm:hidden"
            nativeButton={false}
            render={<Link href="/plan" />}
          >
            Choose a plan
          </Button>
        ) : null}
      </Topbar>

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row">
        <MicPanel
          listening={live.listening}
          onToggle={live.toggleListening}
          elapsed={live.elapsed}
          hoursLeft={live.hoursLeft}
        />
        <NowShowingPanel
          content={live.content}
          version={live.version}
          onVersionChange={live.changeVersion}
          mode={live.mode}
          onModeChange={live.setMode}
          onPrevious={live.previousVerse}
          onNext={live.nextVerse}
          onClear={live.clear}
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:gap-5">
        <SuggestionsCard
          suggestions={live.suggestions}
          onShow={live.showSuggestion}
          onDismiss={live.dismissSuggestion}
        />
        <SongFollowingCard
          song={SONG_FOLLOW}
          activeStanzaId={live.activeStanzaId}
          onSelectStanza={live.selectStanza}
        />
        <RecentActivityCard
          items={live.activity}
          onShowAgain={live.showAgain}
        />
      </div>
    </>
  )
}

export { LiveConsoleTemplate }
