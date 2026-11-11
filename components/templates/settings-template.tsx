"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { AccountSettingsCard } from "@/components/organisms/account-settings-card"
import { DeviceCard } from "@/components/organisms/device-card"
import { MicrophoneCard } from "@/components/organisms/microphone-card"
import { PresentationSettingsCard } from "@/components/organisms/presentation-settings-card"
import { PrivacyCard } from "@/components/organisms/privacy-card"
import { Topbar } from "@/components/organisms/topbar"
import { Button } from "@/components/ui/button"
import { BIBLE_VERSIONS } from "@/lib/data/plans"
import { INITIAL_SETTINGS } from "@/lib/data/settings"
import type { SettingsValues } from "@/types"

/** How long the "Saved" confirmation stays on the save button. */
const SAVED_MS = 2000

/**
 * Settings: account details, audience presentation, microphone, this device
 * and privacy, stacked. All fields are edited locally; "Save changes"
 * confirms (there is no backend).
 */
function SettingsTemplate() {
  const [values, setValues] = React.useState<SettingsValues>(INITIAL_SETTINGS)
  const [saved, setSaved] = React.useState(false)

  React.useEffect(() => {
    if (!saved) return
    const timer = setTimeout(() => setSaved(false), SAVED_MS)
    return () => clearTimeout(timer)
  }, [saved])

  const bibleVersionOptions = BIBLE_VERSIONS.filter(
    (version) => version.inUse
  ).map((version) => version.code)

  /** Merge a change into one of the two grouped sections. */
  function patchSection<K extends "account" | "presentation">(
    key: K,
    change: Partial<SettingsValues[K]>
  ) {
    setSaved(false)
    setValues((current) => ({
      ...current,
      [key]: { ...current[key], ...change },
    }))
  }

  function setMicrophone(device: string) {
    setSaved(false)
    setValues((current) => ({ ...current, microphone: device }))
  }

  return (
    <>
      <Topbar
        title="Settings"
        subtitle="Account, presentation and this device"
      >
        <Button
          className="flex-1 sm:flex-none"
          onClick={() => setSaved(true)}
        >
          {saved ? (
            <>
              <CheckIcon />
              Saved
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </Topbar>

      <AccountSettingsCard
        value={values.account}
        onChange={(change) => patchSection("account", change)}
      />

      <PresentationSettingsCard
        value={values.presentation}
        bibleVersionOptions={bibleVersionOptions}
        onChange={(change) => patchSection("presentation", change)}
      />

      <div className="flex flex-col gap-4 md:flex-row md:gap-5">
        <MicrophoneCard
          value={values.microphone}
          onChange={setMicrophone}
        />
        <DeviceCard />
      </div>

      <PrivacyCard onDelete={() => undefined} />
    </>
  )
}

export { SettingsTemplate }
