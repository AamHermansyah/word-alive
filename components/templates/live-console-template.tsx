"use client"

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
import { SONG_FOLLOW } from "@/lib/data/live"

/**
 * Live console layout.
 *   desktop: [mic | now showing] over [suggestions | song | activity]
 *   tablet : mic strip, now showing, then [suggestions | song]
 */
function LiveConsoleTemplate() {
  const live = useLiveConsole()

  return (
    <>
      <Topbar title="Live console" subtitle="Sunday service · English">
        <Badge
          variant="success"
          className="px-3 py-1.75 text-xs md:px-3.5 md:text-[13px] xl:gap-2"
        >
          <StatusDot className="hidden xl:inline-block" />
          <span className="xl:hidden">Audience connected</span>
          <span className="hidden xl:inline">Audience screen connected</span>
        </Badge>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <span className="xl:hidden">Audience screen</span>
          <span className="hidden xl:inline">Open audience screen</span>
        </Button>
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
