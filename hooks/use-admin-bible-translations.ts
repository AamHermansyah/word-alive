"use client"

import * as React from "react"
import { toast } from "sonner"

import { bibleTranslationsStore } from "@/lib/admin-catalogue-store"
import { BIBLE_IMPORT_DEFAULT_CODE } from "@/lib/data/admin-catalogue"
import type { AdminBibleTranslation } from "@/types/admin-catalogue"

import { useAdminCatalogueStore } from "./use-admin-catalogue-store"

/** How long the pretend import takes before it reports. */
const IMPORT_MS = 1400

/** Book and verse totals a finished import reports (a full Protestant Bible). */
const IMPORT_TOTALS = { books: 66, verses: 31102 }

const FILE_PATTERN = /\.(usfm|sfm|osis|xml|usx)$/i

function today() {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date())
}

/** "v1 · Oct 14" -> 2; nothing imported yet -> 1. */
function nextVersionNumber(current: AdminBibleTranslation["imported"]) {
  const match = current?.match(/^v(\d+)/)
  return match ? Number(match[1]) + 1 : 1
}

/**
 * Bible translations: the list with its live switches, and the import form
 * (version, file, licence document, a pretend import that reports back).
 */
export function useAdminBibleTranslations() {
  const { versions, lastImport } = useAdminCatalogueStore(
    bibleTranslationsStore
  )

  const [importCode, setImportCode] = React.useState(BIBLE_IMPORT_DEFAULT_CODE)
  const [file, setFile] = React.useState<File | null>(null)
  const [licenceFile, setLicenceFile] = React.useState<File | null>(null)
  const [running, setRunning] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const selected = versions.find((version) => version.code === importCode)
  const licenceRequired = selected?.licence === "missing"

  function setLive(code: string, live: boolean) {
    const version = versions.find((entry) => entry.code === code)
    if (!version || version.licence === "missing" || version.isDefault) return
    bibleTranslationsStore.set((current) => ({
      ...current,
      versions: current.versions.map((entry) =>
        entry.code === code ? { ...entry, live } : entry
      ),
    }))
    if (live) {
      toast.success(`${code} is live`, {
        description: "Churches on a plan that includes it can now choose it.",
      })
    } else {
      toast(`${code} switched off`, {
        description: "Churches no longer see it in their Bible versions.",
      })
    }
  }

  /** Accept a dropped or chosen import file; returns whether it was accepted. */
  function chooseFile(next: File | null) {
    if (next && !FILE_PATTERN.test(next.name)) {
      toast.error("That file type is not supported", {
        description: "Use a USFM, OSIS or USX file.",
      })
      return false
    }
    setFile(next)
    return true
  }

  function runImport() {
    if (running || !selected) return
    if (!file) {
      toast.error("Choose a file to import", {
        description: "Drop a USFM, OSIS or USX file into the box.",
      })
      return
    }
    if (licenceRequired && !licenceFile) {
      toast.error(`${selected.code} needs a licence document`, {
        description: "Attach the licence before importing this version.",
      })
      return
    }

    setRunning(true)
    timer.current = setTimeout(() => {
      const version = `v${nextVersionNumber(selected.imported)}`
      const when = today()
      bibleTranslationsStore.set((current) => ({
        versions: current.versions.map((entry) =>
          entry.code === selected.code
            ? {
                ...entry,
                imported: `${version} · ${when}`,
                source: entry.source === "not-set-up" ? "local" : entry.source,
              }
            : entry
        ),
        lastImport: { code: selected.code, version, when, ...IMPORT_TOTALS },
      }))
      setRunning(false)
      setFile(null)
      toast.success(`${selected.code} ${version} imported`, {
        description: `Passed · ${IMPORT_TOTALS.books} books · ${IMPORT_TOTALS.verses.toLocaleString("en-US")} verses`,
      })
    }, IMPORT_MS)
  }

  return {
    versions,
    lastImport,
    importCode,
    setImportCode: (code: string) => {
      setImportCode(code)
      setLicenceFile(null)
    },
    file,
    chooseFile,
    licenceFile,
    setLicenceFile,
    licenceRequired,
    running,
    setLive,
    runImport,
  }
}
