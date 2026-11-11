"use client"

import * as React from "react"

import { AudioBars } from "@/components/atoms/audio-bars"
import { SelectField } from "@/components/molecules/select-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { MICROPHONES } from "@/lib/data/settings"

/** Pick the input device and try it: the waveform moves while a test runs. */
function MicrophoneCard({
  value,
  onChange,
}: {
  value: string
  onChange: (device: string) => void
}) {
  const [testing, setTesting] = React.useState(false)

  return (
    <Card className="min-w-0 flex-1 gap-0">
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="text-[15px] font-bold md:text-base">
          Microphone
        </CardTitle>

        <SelectField
          id="microphone-device"
          label="Input device"
          value={value}
          onValueChange={onChange}
          options={MICROPHONES}
        />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Button
            variant="outline"
            aria-pressed={testing}
            onClick={() => setTesting((current) => !current)}
          >
            {testing ? "Stop test" : "Test microphone"}
          </Button>
          <AudioBars active={testing} />
        </div>
      </CardContent>
    </Card>
  )
}

export { MicrophoneCard }
