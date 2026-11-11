import { JOHN_3, SONG_FOLLOW } from "@/lib/data/live"
import { TALK_HOURS, TRIAL } from "@/lib/data/plans"
import type {
  ConsoleBannerItem,
  HistorySummary,
  LyricsSlide,
  ScriptureSlide,
  ServiceRecord,
} from "@/types/console"

/** "Free trial · 5 days left · 0.6 of 1 hour left" under the console title. */
export const TRIAL_CONSOLE_SUBTITLE = `Free trial · ${TRIAL.daysLeft} days left · ${TRIAL.hoursLeft} of ${TRIAL.hoursTotal} ${TRIAL.hoursTotal === 1 ? "hour" : "hours"} left`

/** Hours-left figure in the mic panel while on the free trial. */
export const TRIAL_HOURS_LEFT = `${TRIAL.hoursLeft} h`

// ---- Warnings and degraded modes ----------------------------------------
// Order follows the mockup: the tablet shows them top to bottom, the desktop
// puts the first four in the left column and the rest in the right one.

export const CONSOLE_BANNERS: ConsoleBannerItem[] = [
  {
    id: "hours-80",
    tone: "warning",
    icon: "clock",
    title: "80% of your talk hours used",
    description: "2.4 of 3 hours used this cycle.",
    action: { label: "Upgrade", href: "/usage" },
  },
  {
    id: "hours-used-up",
    tone: "danger",
    icon: "alert",
    title: "Talk hours used up",
    description:
      "Your service keeps running. The next session needs an upgrade or the next cycle.",
    action: { label: "Upgrade", href: "/usage" },
  },
  {
    id: "backup-speech",
    tone: "warning",
    icon: "wifi",
    title: "Using the backup speech service",
    description: "The main service is slow. Listening continues.",
  },
  {
    id: "language-unsupported",
    tone: "info",
    icon: "globe",
    title: "Speech is not available for Yoruba yet",
    description: "Manual controls still work. Tap a verse or song to show it.",
  },
  {
    id: "bible-source",
    tone: "warning",
    icon: "book",
    title: "Bible source is unavailable",
    description: "Showing the last verse. You can show it in KJV instead.",
    action: { label: "Show in KJV", toast: "Showing John 3:16 in KJV" },
  },
  {
    id: "offline",
    tone: "danger",
    icon: "wifi",
    title: "You are offline",
    description: "Showing the last content. WordAlive will reconnect by itself.",
  },
  {
    id: "paraphrase-paused",
    tone: "info",
    icon: "chip",
    title: "Paraphrase suggestions are paused",
    description: "References and voice commands still work.",
  },
]

// ---- Service history -----------------------------------------------------

export const HISTORY_SUMMARY: HistorySummary = {
  services: 6,
  itemsShown: 48,
  resetsOn: "Dec 7",
}

/** "Hours this cycle · 2.5 of 12" comes from the same figures as /usage. */
export const HISTORY_HOURS = TALK_HOURS

export const SERVICE_HISTORY: ServiceRecord[] = [
  {
    id: "2025-11-02",
    date: "Sun, Nov 2",
    startTime: "10:02",
    length: "1 h 12 m",
    hours: "1.2 h",
    scriptures: 14,
    songs: 6,
    items: [
      { id: "i1", label: "John 3:16 · KJV", time: "10:08" },
      { id: "i2", label: "Amazing Grace · stanza 1", time: "10:21" },
      { id: "i3", label: "Romans 8:28 · KJV", time: "10:44" },
      { id: "i4", label: "Psalm 23:1 · KJV", time: "10:52" },
    ],
  },
  {
    id: "2025-10-29",
    date: "Wed, Oct 29",
    startTime: "18:30",
    length: "48 m",
    hours: "0.8 h",
    scriptures: 9,
    songs: 4,
    items: [
      { id: "i1", label: "Psalm 46:1 · KJV", time: "18:36" },
      { id: "i2", label: "Be Thou My Vision · stanza 1", time: "18:44" },
      { id: "i3", label: "Isaiah 41:10 · NLT", time: "19:02" },
    ],
  },
  {
    id: "2025-10-26",
    date: "Sun, Oct 26",
    startTime: "10:00",
    length: "1 h 05 m",
    hours: "1.1 h",
    scriptures: 12,
    songs: 5,
    items: [
      { id: "i1", label: "Philippians 4:6 · KJV", time: "10:07" },
      { id: "i2", label: "How Great Thou Art · stanza 2", time: "10:19" },
      { id: "i3", label: "Matthew 11:28 · NLT", time: "10:41" },
      { id: "i4", label: "Psalm 121:1 · KJV", time: "10:48" },
      { id: "i5", label: "Amazing Grace · stanza 3", time: "10:58" },
    ],
  },
  {
    id: "2025-10-22",
    date: "Wed, Oct 22",
    startTime: "18:28",
    length: "41 m",
    hours: "0.7 h",
    scriptures: 7,
    songs: 3,
    items: [
      { id: "i1", label: "Joshua 1:9 · KJV", time: "18:33" },
      { id: "i2", label: "10,000 Reasons · stanza 1", time: "18:40" },
    ],
  },
  {
    id: "2025-10-19",
    date: "Sun, Oct 19",
    startTime: "10:04",
    length: "1 h 18 m",
    hours: "1.3 h",
    scriptures: 15,
    songs: 7,
    items: [
      { id: "i1", label: "Genesis 1:1 · KJV", time: "10:09" },
      { id: "i2", label: "Amazing Grace · stanza 2", time: "10:22" },
      { id: "i3", label: "John 1:1 · KJV", time: "10:37" },
      { id: "i4", label: "Hebrews 11:1 · NIV", time: "10:55" },
    ],
  },
]

// ---- Projector screens ---------------------------------------------------

/** John 3:16, KJV: the slide shown on /present/scripture. */
export const PROJECTOR_SCRIPTURE: ScriptureSlide = {
  reference: "John 3:16",
  versionCode: "KJV",
  versionName: "King James Version",
  rights: "Public domain",
  text: JOHN_3[2].text,
  lang: "en",
}

/** Amazing Grace, stanza 2, typeset with a real apostrophe as on the mockup. */
export const PROJECTOR_LYRICS: LyricsSlide = {
  heading: `${SONG_FOLLOW.title} · Stanza 2`,
  text: SONG_FOLLOW.stanzas[1].text.replaceAll("'", "’"),
  lang: "en",
}

export const PROJECTOR_WAITING = {
  title: "WordAlive",
  message: "Waiting for the service to begin",
  status: "Reconnecting…",
}
