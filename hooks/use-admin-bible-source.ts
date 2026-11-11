"use client"

import * as React from "react"
import { toast } from "sonner"

import { bibleSourceStore } from "@/lib/admin-catalogue-store"
import { BIBLE_TEST_PASSAGES } from "@/lib/data/admin-catalogue"
import type {
  AdminBibleSourceSettings,
  AdminPassageState,
} from "@/types/admin-catalogue"

import { useAdminCatalogueStore } from "./use-admin-catalogue-store"

/** How long one test passage shows "Running" before it reports. */
const PASSAGE_RUN_MS = 420
/** Gap between the starts of two test passages: the results arrive one by one. */
const PASSAGE_STEP_MS = 520
const CONNECTION_TEST_MS = 1100
const MIN_KEY_LENGTH = 8

/** Message under each source field that is empty (all three are required). */
function validate(settings: AdminBibleSourceSettings) {
  const errors: Partial<Record<keyof AdminBibleSourceSettings, string>> = {}
  if (!settings.translationId.trim()) errors.translationId = "Required"
  if (!settings.refreshLimit.trim()) errors.refreshLimit = "Required"
  if (!settings.attribution.trim()) {
    errors.attribution = "The licence requires an attribution text"
  }
  return errors
}

/**
 * The "Bible source (API)" page: connection and storage settings with a dirty
 * save, the masked API key and its replacement, the connection test, and the
 * test passages that report one by one.
 */
export function useAdminBibleSource() {
  const source = useAdminCatalogueStore(bibleSourceStore)
  const saved = source.settings

  const [draft, setDraft] = React.useState(saved)
  const [touched, setTouched] = React.useState<ReadonlySet<string>>(new Set())
  const [submitted, setSubmitted] = React.useState(false)

  const [replacingKey, setReplacingKey] = React.useState(false)
  const [newKey, setNewKey] = React.useState("")
  const [keyError, setKeyError] = React.useState<string>()

  const [testingConnection, setTestingConnection] = React.useState(false)
  const [runningTests, setRunningTests] = React.useState(false)
  const [passages, setPassages] = React.useState<AdminPassageState[]>(() =>
    BIBLE_TEST_PASSAGES.map(() =>
      source.passagesPassed ? "passed" : "waiting"
    )
  )

  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])
  const later = (callback: () => void, ms: number) => {
    timers.current.push(setTimeout(callback, ms))
  }
  React.useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const errors = React.useMemo(() => validate(draft), [draft])
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)

  const errorFor = (key: keyof AdminBibleSourceSettings) =>
    submitted || touched.has(key) ? errors[key] : undefined

  const touch = (key: keyof AdminBibleSourceSettings) =>
    setTouched((current) => new Set(current).add(key))

  function change(patch: Partial<AdminBibleSourceSettings>) {
    setDraft((current) => ({ ...current, ...patch }))
  }

  function save() {
    setSubmitted(true)
    const [firstInvalid] = Object.keys(errors)
    if (firstInvalid) {
      toast.error("The source can't be saved yet", {
        description: "Fill in the highlighted fields.",
      })
      document.getElementById(`bible-source-${firstInvalid}`)?.focus()
      return
    }
    bibleSourceStore.set((current) => ({ ...current, settings: draft }))
    setSubmitted(false)
    setTouched(new Set())
    toast.success("Bible source saved", {
      description: "NIV is served with these settings from now on.",
    })
  }

  // ---- API key ----

  function startReplacingKey() {
    setNewKey("")
    setKeyError(undefined)
    setReplacingKey(true)
  }

  function cancelReplacingKey() {
    setReplacingKey(false)
    setNewKey("")
    setKeyError(undefined)
  }

  function saveKey() {
    if (newKey.trim().length < MIN_KEY_LENGTH) {
      setKeyError(`Paste the full key (at least ${MIN_KEY_LENGTH} characters)`)
      return
    }
    setReplacingKey(false)
    setNewKey("")
    setKeyError(undefined)
    // A new key has to prove itself again.
    setPassages(BIBLE_TEST_PASSAGES.map(() => "waiting"))
    bibleSourceStore.set((current) => ({
      ...current,
      connectionPassed: false,
      passagesPassed: false,
    }))
    toast.success("API key replaced", {
      description: "Run “Test connection” to check the new key.",
    })
  }

  // ---- tests ----

  function testConnection() {
    if (testingConnection) return
    if (!draft.translationId.trim()) {
      setTouched((current) => new Set(current).add("translationId"))
      toast.error("Add the translation ID first", {
        description: "The test needs an ID from API.Bible.",
      })
      document.getElementById("bible-source-translationId")?.focus()
      return
    }
    setTestingConnection(true)
    later(() => {
      setTestingConnection(false)
      bibleSourceStore.set((current) => ({
        ...current,
        connectionPassed: true,
      }))
      toast.success("Connection works", {
        description: `${draft.provider} answered in 187 ms.`,
      })
    }, CONNECTION_TEST_MS)
  }

  function runTests() {
    if (runningTests) return
    setRunningTests(true)
    setPassages(BIBLE_TEST_PASSAGES.map(() => "waiting"))
    bibleSourceStore.set((current) => ({ ...current, passagesPassed: false }))

    BIBLE_TEST_PASSAGES.forEach((_, index) => {
      const start = index * PASSAGE_STEP_MS
      const mark = (state: AdminPassageState) =>
        setPassages((current) =>
          current.map((entry, position) => (position === index ? state : entry))
        )
      later(() => mark("running"), start)
      later(() => mark("passed"), start + PASSAGE_RUN_MS)
    })

    later(
      () => {
        setRunningTests(false)
        bibleSourceStore.set((current) => ({
          ...current,
          passagesPassed: true,
        }))
        toast.success(
          `${BIBLE_TEST_PASSAGES.length} of ${BIBLE_TEST_PASSAGES.length} passages passed`
        )
      },
      (BIBLE_TEST_PASSAGES.length - 1) * PASSAGE_STEP_MS + PASSAGE_RUN_MS + 150
    )
  }

  return {
    saved,
    draft,
    dirty,
    errorFor,
    touch,
    change,
    save,
    replacingKey,
    newKey,
    setNewKey: (value: string) => {
      setNewKey(value)
      setKeyError(undefined)
    },
    keyError,
    startReplacingKey,
    cancelReplacingKey,
    saveKey,
    testingConnection,
    testConnection,
    runningTests,
    runTests,
    passages,
    connectionPassed: source.connectionPassed,
    passagesPassed: source.passagesPassed,
  }
}
