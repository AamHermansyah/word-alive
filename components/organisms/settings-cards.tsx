"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { FormField } from "@/components/molecules/form-field"
import { SegmentedControl } from "@/components/molecules/segmented-control"
import {
  useDirection,
  type Direction,
} from "@/components/providers/direction-provider"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CURRENT_USER } from "@/lib/data/navigation"

const LANGUAGES = ["English", "Yoruba", "Spanish", "French", "Arabic"]

function ServiceSettingsCard() {
  const [name, setName] = React.useState(CURRENT_USER.name)
  const [language, setLanguage] = React.useState("English")

  return (
    <Card className="min-w-0 flex-1 gap-0">
      <CardContent className="flex flex-col gap-3">
        <div>
          <CardTitle className="text-base font-bold">Service</CardTitle>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Shown on your audience screen and in the song library.
          </div>
        </div>

        <FormField label="Church name" htmlFor="church-name">
          <Input
            id="church-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormField>

        <FormField label="Service language" htmlFor="service-language">
          <Select
            value={language}
            onValueChange={(next) => next && setLanguage(next)}
          >
            <SelectTrigger id="service-language" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                {LANGUAGES.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormField>
      </CardContent>
    </Card>
  )
}

const subscribeNoop = () => () => {}

type ThemeChoice = "light" | "dark" | "system"

function AppearanceCard() {
  const { theme, setTheme } = useTheme()
  const { direction, setDirection } = useDirection()
  // next-themes only knows the theme on the client.
  const mounted = React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )

  return (
    <Card className="min-w-0 flex-1 gap-0">
      <CardContent className="flex flex-col gap-4">
        <div>
          <CardTitle className="text-base font-bold">Appearance</CardTitle>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Also available from the avatar menu at the top of every page.
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="text-xs text-muted-foreground">Theme</div>
          <SegmentedControl<ThemeChoice>
            label="Theme"
            value={mounted ? ((theme as ThemeChoice) ?? "system") : "system"}
            onValueChange={setTheme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="text-xs text-muted-foreground">Text direction</div>
          <SegmentedControl<Direction>
            label="Text direction"
            value={direction}
            onValueChange={setDirection}
            options={[
              { value: "ltr", label: "Left to right" },
              { value: "rtl", label: "Right to left" },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

const DISPLAY_OPTIONS = [
  {
    id: "show-version",
    label: "Show the Bible version on the slide",
    description: "Adds the version next to the reference.",
    defaultChecked: true,
  },
  {
    id: "auto-advance",
    label: "Follow songs automatically",
    description: "Move to the next stanza as the congregation sings.",
    defaultChecked: true,
  },
  {
    id: "dim-screen",
    label: "Dim the audience screen when nothing is shown",
    description: "Keeps the room calm between items.",
    defaultChecked: false,
  },
]

function AudienceScreenCard() {
  return (
    <Card className="min-w-0 gap-0">
      <CardContent className="flex flex-col">
        <CardTitle className="mb-1.5 text-base font-bold">
          Audience screen
        </CardTitle>

        {DISPLAY_OPTIONS.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-4 border-t border-border py-3"
          >
            <Label htmlFor={option.id} className="flex-1 flex-col items-start gap-0.5">
              <span className="text-sm font-semibold">{option.label}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {option.description}
              </span>
            </Label>
            <Switch id={option.id} defaultChecked={option.defaultChecked} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export { AppearanceCard, AudienceScreenCard, ServiceSettingsCard }
