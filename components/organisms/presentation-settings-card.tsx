import { ColourSchemeOption } from "@/components/molecules/colour-scheme-option"
import { SelectField } from "@/components/molecules/select-field"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { COLOUR_SCHEMES, PRESENTATION_LANGUAGES } from "@/lib/data/settings"
import type { PresentationSettings } from "@/types"

/** How the audience sees things: language, default Bible version, screen colours. */
function PresentationSettingsCard({
  value,
  bibleVersionOptions,
  onChange,
}: {
  value: PresentationSettings
  /** Codes the default Bible version can be chosen from (the versions in use). */
  bibleVersionOptions: readonly string[]
  onChange: (patch: Partial<PresentationSettings>) => void
}) {
  return (
    <Card className="min-w-0 gap-0">
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="text-[15px] font-bold md:text-base">
          Presentation
        </CardTitle>

        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          <SelectField
            id="presentation-language"
            label="Presentation language"
            value={value.language}
            onValueChange={(language) => onChange({ language })}
            options={PRESENTATION_LANGUAGES}
          />
          <SelectField
            id="presentation-bible-version"
            label="Default Bible version"
            value={value.bibleVersion}
            onValueChange={(bibleVersion) => onChange({ bibleVersion })}
            options={bibleVersionOptions}
          />
        </div>

        <fieldset className="flex min-w-0 flex-col gap-1">
          <legend className="mb-1 text-xs text-muted-foreground">
            Audience screen colours
          </legend>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {COLOUR_SCHEMES.map((scheme) => (
              <ColourSchemeOption
                key={scheme.id}
                scheme={scheme}
                name="audience-colours"
                checked={value.scheme === scheme.id}
                onSelect={() => onChange({ scheme: scheme.id })}
              />
            ))}
          </div>
        </fieldset>
      </CardContent>
    </Card>
  )
}

export { PresentationSettingsCard }
