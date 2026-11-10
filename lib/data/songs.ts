import type { Song, SongRights } from "@/types"

export const SONG_COUNT_LABEL = "48,200 songs shared by churches"

export const SONGS: Song[] = [
  {
    id: "amazing-grace",
    title: "Amazing Grace",
    author: "John Newton",
    language: "English",
    rights: "public-domain",
    usedBy: "1,204 churches",
    inSet: true,
  },
  {
    id: "great-is-thy-faithfulness",
    title: "Great Is Thy Faithfulness",
    author: "Thomas Chisholm",
    language: "English",
    rights: "licensed",
    usedBy: "982 churches",
  },
  {
    id: "how-great-thou-art",
    title: "How Great Thou Art",
    author: "Stuart K. Hine",
    language: "English",
    rights: "licensed",
    usedBy: "1,010 churches",
  },
  {
    id: "olorun-oba",
    title: "Ọlọ́run Ọba",
    author: "Yoruba worship",
    language: "Yoruba",
    rights: "community",
    usedBy: "38 churches",
  },
  {
    id: "nothing-but-the-blood",
    title: "Nothing but the Blood",
    author: "Your upload",
    language: "English",
    rights: "in-review",
    usedBy: "Only you",
  },
  {
    id: "abide-with-me",
    title: "Abide with Me",
    author: "Henry F. Lyte",
    language: "English",
    rights: "public-domain",
    usedBy: "874 churches",
  },
]

export const RIGHTS_LABEL: Record<SongRights, string> = {
  "public-domain": "Public domain",
  licensed: "Licensed",
  community: "Community",
  "in-review": "In review",
}

export const RIGHTS_VARIANT: Record<
  SongRights,
  "success" | "info" | "warning" | "neutral"
> = {
  "public-domain": "success",
  licensed: "info",
  community: "warning",
  "in-review": "neutral",
}

export type SongFilter = "all" | "public-domain" | "licensed" | "community"

export const SONG_FILTERS: { value: SongFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "public-domain", label: "Public domain" },
  { value: "licensed", label: "Licensed" },
  { value: "community", label: "Community" },
]

export const NEW_SONG_DEFAULTS = {
  title: "Nothing but the Blood",
  language: "English",
  lyrics: "What can wash away my sin?\nNothing but the blood of Jesus",
}
