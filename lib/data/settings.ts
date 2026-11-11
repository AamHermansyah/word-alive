import { DEFAULT_BIBLE_VERSION } from "@/lib/data/plans"
import { CURRENT_USER } from "@/lib/data/navigation"
import type { ColourScheme, SettingsValues } from "@/types"

export const INITIAL_SETTINGS: SettingsValues = {
  account: {
    name: CURRENT_USER.name,
    email: "pastor@gracechapel.org",
    city: "Lagos",
    country: "Nigeria",
    licence: "",
  },
  presentation: {
    language: "English",
    bibleVersion: DEFAULT_BIBLE_VERSION,
    scheme: "classic",
  },
  microphone: "Built-in microphone",
}

export const COUNTRIES = [
  "Ghana",
  "Kenya",
  "Nigeria",
  "South Africa",
  "United Kingdom",
  "United States",
]

export const PRESENTATION_LANGUAGES = [
  "English",
  "Yoruba",
  "Spanish",
  "French",
  "Arabic",
]

export const MICROPHONES = [
  "Built-in microphone",
  "USB audio interface",
  "Headset microphone",
]

/** Audience-screen colour schemes; the swatches preview each scheme's slide colours. */
export const COLOUR_SCHEMES: ColourScheme[] = [
  { id: "classic", label: "Classic", swatches: ["#7a1f2b", "#14284b"] },
  { id: "light", label: "Light", swatches: ["#9b3d4b", "#2d4b7f"] },
  { id: "high-contrast", label: "High contrast", swatches: ["#5a1520", "#0a1530"] },
]

/** The device this browser is registered as. */
export const THIS_DEVICE = {
  name: "Chrome on Windows",
  /** When the church may next switch the registered device itself. */
  nextSwitch: "Dec 3",
}
