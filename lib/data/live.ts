import type {
  ActivityItem,
  ScreenContent,
  SongFollow,
  Suggestion,
} from "@/types"

export const BIBLE_VERSION_OPTIONS = [
  "KJV",
  "NLT",
  "ESV",
  "NIV",
  "NKJV",
] as const

/** KJV text for the verses the console can step through (John 3:14-18). */
export const JOHN_3 = [
  {
    verse: 14,
    text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:",
  },
  {
    verse: 15,
    text: "That whosoever believeth in him should not perish, but have eternal life.",
  },
  {
    verse: 16,
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  },
  {
    verse: 17,
    text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
  },
  {
    verse: 18,
    text: "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.",
  },
] as const

export const PSALM_23_1 = "The LORD is my shepherd; I shall not want."

export const ROMANS_8_28 =
  "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."

export const INITIAL_CONTENT: ScreenContent = {
  kind: "scripture",
  title: "John 3:16",
  version: "KJV",
  text: JOHN_3[2].text,
}

export const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: "ps-23-1",
    reference: "Psalm 23:1",
    match: 82,
    quote: "The Lord is my shepherd",
  },
  { id: "rom-8-28", reference: "Romans 8:28", match: 71 },
]

export const SUGGESTION_TEXT: Record<string, string> = {
  "ps-23-1": PSALM_23_1,
  "rom-8-28": ROMANS_8_28,
}

export const SONG_FOLLOW: SongFollow = {
  title: "Amazing Grace",
  author: "John Newton",
  rights: "Public domain",
  match: 94,
  stanzas: [
    {
      id: "s1",
      number: 1,
      firstLine: "Amazing grace, how sweet the sound",
      text: "Amazing grace! how sweet the sound,\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.",
    },
    {
      id: "s2",
      number: 2,
      firstLine: "'Twas grace that taught my heart to fear",
      text: "'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed.",
    },
    {
      id: "s3",
      number: 3,
      firstLine: "Through many dangers, toils and snares",
      text: "Through many dangers, toils and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home.",
    },
  ],
}

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    title: "John 3:16 · KJV",
    kind: "scripture",
    time: "10:42",
    content: INITIAL_CONTENT,
  },
  {
    id: "a2",
    title: "Amazing Grace · stanza 1",
    kind: "song",
    time: "10:31",
    content: {
      kind: "song",
      title: "Amazing Grace · stanza 1",
      text: SONG_FOLLOW.stanzas[0].text,
    },
  },
  {
    id: "a3",
    title: "Romans 8:28 · NLT",
    kind: "scripture",
    time: "10:18",
    content: {
      kind: "scripture",
      title: "Romans 8:28",
      version: "NLT",
      text: ROMANS_8_28,
    },
  },
]
