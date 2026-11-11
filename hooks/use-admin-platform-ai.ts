"use client"

import * as React from "react"
import { toast } from "sonner"

import { useAdminPlatformDraft } from "@/hooks/use-admin-platform-draft"
import {
  AI_DEFAULTS,
  MIN_API_KEY_LENGTH,
  NO_FALLBACK,
} from "@/lib/data/admin-platform"
import type {
  AiProviderConfig,
  AiSettings,
} from "@/types/admin-platform"

export type AiErrors = {
  speechModel?: string
  speechFallback?: string
  speechKey?: string
  reasoningModel?: string
  reasoningFallback?: string
  thresholds?: string
}

export type AiTest = {
  status: "idle" | "testing" | "done"
  /** 0-100 */
  progress: number
  /** What is being tested, in order. */
  steps: string[]
  speechMs: number | null
  reasoningMs: number | null
}

const IDLE_TEST: AiTest = {
  status: "idle",
  progress: 0,
  steps: [],
  speechMs: null,
  reasoningMs: null,
}

const TEST_DURATION_MS = 1800
const TEST_TICK_MS = 90

function providerErrors(config: AiProviderConfig) {
  const model = config.modelId.trim() ? undefined : "Add a model ID."
  const fallback =
    config.fallback !== NO_FALLBACK && config.fallback === config.primary
      ? "Choose a fallback that differs from the primary provider."
      : undefined
  return { model, fallback }
}

export function validateAi(values: AiSettings, attempted: boolean): AiErrors {
  const errors: AiErrors = {}

  if (values.speech.enabled) {
    const { model, fallback } = providerErrors(values.speech)
    errors.speechModel = model
    errors.speechFallback = fallback
  }
  if (values.reasoning.enabled) {
    const { model, fallback } = providerErrors(values.reasoning)
    errors.reasoningModel = model
    errors.reasoningFallback = fallback
  }

  const key = values.speechKey
  if (key.replacing) {
    const length = key.value.trim().length
    if (length === 0) {
      if (attempted) errors.speechKey = "Paste the new key, or cancel to keep the current one."
    } else if (length < MIN_API_KEY_LENGTH) {
      errors.speechKey = "That does not look like a full API key."
    }
  }

  const { show, suggest } = values.thresholds
  if (show <= suggest) {
    errors.thresholds = `"Show scripture automatically" (${(show / 100).toFixed(2)}) must be higher than "Suggest scripture to the operator" (${(suggest / 100).toFixed(2)}).`
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message))
  ) as AiErrors
}

/** AI providers page: form state, validation, "Test connection" and Save. */
function useAdminPlatformAi() {
  const { values, dirty, setValues, patch, commit } =
    useAdminPlatformDraft(AI_DEFAULTS)
  const [attempted, setAttempted] = React.useState(false)
  const [test, setTest] = React.useState<AiTest>(IDLE_TEST)
  const timer = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current)
    },
    []
  )

  const errors = validateAi(values, attempted)

  const patchSpeech = (next: Partial<AiProviderConfig>) =>
    patch({ speech: { ...values.speech, ...next } })
  const patchReasoning = (next: Partial<AiProviderConfig>) =>
    patch({ reasoning: { ...values.reasoning, ...next } })

  const setThreshold = (key: keyof AiSettings["thresholds"], percent: number) =>
    patch({ thresholds: { ...values.thresholds, [key]: percent } })

  const startKeyReplacement = () =>
    patch({ speechKey: { replacing: true, value: "" } })
  const setKeyValue = (value: string) =>
    patch({ speechKey: { replacing: true, value } })
  const cancelKeyReplacement = () => {
    setAttempted(false)
    patch({ speechKey: { replacing: false, value: "" } })
  }

  function runTest() {
    if (test.status === "testing") return

    const steps = [
      values.speech.enabled ? "Testing speech recognition…" : null,
      values.reasoning.enabled ? "Testing reasoning and extraction…" : null,
    ].filter((step): step is string => step !== null)

    if (steps.length === 0) {
      toast.error("Nothing to test", {
        description: "Turn on at least one provider first.",
      })
      return
    }

    setTest({ ...IDLE_TEST, status: "testing", steps })
    let elapsed = 0
    timer.current = setInterval(() => {
      elapsed += TEST_TICK_MS
      const progress = Math.min(100, Math.round((elapsed / TEST_DURATION_MS) * 100))
      if (progress < 100) {
        setTest((current) => ({ ...current, progress }))
        return
      }
      if (timer.current) clearInterval(timer.current)
      const speechMs = values.speech.enabled ? 312 : null
      const reasoningMs = values.reasoning.enabled ? 541 : null
      setTest({ status: "done", progress: 100, steps, speechMs, reasoningMs })
      toast.success("Connection healthy", {
        description: [
          speechMs !== null ? `Speech ${speechMs} ms` : null,
          reasoningMs !== null ? `Reasoning ${reasoningMs} ms` : null,
        ]
          .filter(Boolean)
          .join(" · "),
      })
    }, TEST_TICK_MS)
  }

  function dismissTest() {
    if (test.status === "done") setTest(IDLE_TEST)
  }

  function save() {
    // A pasted-key field left empty only counts as an error once Save was tried.
    const problem = Object.values(validateAi(values, true))[0]
    if (problem) {
      setAttempted(true)
      toast.error("Fix the highlighted fields first", { description: problem })
      return
    }
    if (!dirty) {
      toast("Nothing to save", {
        description: "AI provider settings have no unsaved changes.",
      })
      return
    }
    const replaced = values.speechKey.replacing && values.speechKey.value.trim() !== ""
    commit({ ...values, speechKey: { replacing: false, value: "" } })
    setAttempted(false)
    toast.success("AI provider settings saved", {
      description: replaced ? "The speech API key was replaced." : undefined,
    })
  }

  return {
    values,
    dirty,
    errors,
    test,
    setValues,
    patchSpeech,
    patchReasoning,
    setThreshold,
    startKeyReplacement,
    setKeyValue,
    cancelKeyReplacement,
    runTest,
    dismissTest,
    save,
  }
}

export { useAdminPlatformAi }
