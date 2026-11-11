"use client"

import * as React from "react"
import { toast } from "sonner"

import { LANGUAGES } from "@/lib/data/admin-platform"
import type { LanguageRow } from "@/types/admin-platform"

/** Gap between one language starting its test and the next one. */
const STAGGER_MS = 220
/** How long a single language test "runs". */
const TEST_MS = 800

/** A language passes when at least one provider lists it. */
function passesTest(row: LanguageRow): boolean {
  return row.gemini === "listed" || row.deepgram === "listed"
}

/**
 * Languages page: the Enabled switches (only usable once the WordAlive test
 * passed), "Run evaluation" and Save.
 */
function useAdminPlatformLanguages(initial: LanguageRow[] = LANGUAGES) {
  const [rows, setRows] = React.useState(initial)
  const [savedEnabled, setSavedEnabled] = React.useState(
    () => new Set(initial.filter((row) => row.enabled).map((row) => row.code))
  )
  const [evaluating, setEvaluating] = React.useState(false)
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])

  React.useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const enabledCodes = rows.filter((row) => row.enabled).map((row) => row.code)
  const dirty =
    enabledCodes.length !== savedEnabled.size ||
    enabledCodes.some((code) => !savedEnabled.has(code))

  const patchRow = React.useCallback((code: string, patch: Partial<LanguageRow>) => {
    setRows((current) =>
      current.map((row) => (row.code === code ? { ...row, ...patch } : row))
    )
  }, [])

  const setEnabled = (code: string, enabled: boolean) => patchRow(code, { enabled })

  function runEvaluation() {
    if (evaluating || rows.length === 0) return
    setEvaluating(true)
    toast("Evaluation started", {
      description: `Testing ${rows.length} languages against the WordAlive test set.`,
    })

    let passed = 0
    rows.forEach((row, index) => {
      const startAt = index * STAGGER_MS
      const isPass = passesTest(row)
      if (isPass) passed += 1

      timers.current.push(
        setTimeout(() => patchRow(row.code, { test: "running" }), startAt),
        setTimeout(() => {
          // A language that fails can no longer stay switched on.
          patchRow(row.code, {
            test: isPass ? "passed" : "failed",
            ...(isPass ? {} : { enabled: false }),
          })
        }, startAt + TEST_MS)
      )
    })

    timers.current.push(
      setTimeout(
        () => {
          setEvaluating(false)
          toast.success("Evaluation finished", {
            description: `${passed} passed, ${rows.length - passed} failed. Turn on the languages you want to offer.`,
          })
        },
        (rows.length - 1) * STAGGER_MS + TEST_MS + 50
      )
    )
  }

  function save() {
    const defaultRow = rows.find((row) => row.isDefault)
    if (defaultRow && !defaultRow.enabled) {
      toast.error("The default language must stay on", {
        description: `Turn ${defaultRow.name} back on before saving.`,
      })
      return
    }
    if (!dirty) {
      toast("Nothing to save", { description: "No language was switched." })
      return
    }
    setSavedEnabled(new Set(enabledCodes))
    toast.success("Language settings saved", {
      description: `${enabledCodes.length} ${enabledCodes.length === 1 ? "language is" : "languages are"} enabled.`,
    })
  }

  return { rows, dirty, evaluating, setEnabled, runEvaluation, save }
}

export { useAdminPlatformLanguages }
