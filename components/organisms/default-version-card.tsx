import { ScreenPreview } from "@/components/molecules/screen-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { JOHN_3 } from "@/lib/data/live"
import { cn } from "@/lib/utils"
import type { BibleVersion } from "@/types"

/**
 * The version shown on the audience screen by default: its code, a sample
 * verse on the audience slide, and a menu to pick another of the versions in use.
 */
function DefaultVersionCard({
  version,
  options,
  onChange,
  className,
}: {
  version: BibleVersion
  /** Versions the church can pick from (those in use). */
  options: BibleVersion[]
  onChange: (code: string) => void
  className?: string
}) {
  return (
    <Card className={cn("min-w-0 gap-0", className)}>
      <CardContent className="flex flex-col">
        <CardTitle>Default version</CardTitle>
        <div className="mt-2 text-2xl font-bold md:text-[28px]">
          <bdi>{version.code}</bdi>
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {version.name}
        </div>

        <ScreenPreview
          className="mt-3.5"
          content={{
            kind: "scripture",
            title: "John 3:16",
            version: version.code,
            text: JOHN_3[2].text,
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="mt-3.5 h-10 w-full md:h-9" />
            }
          >
            Change default
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-56">
            <DropdownMenuRadioGroup
              value={version.code}
              onValueChange={onChange}
            >
              {options.map((option) => (
                <DropdownMenuRadioItem key={option.code} value={option.code}>
                  <bdi className="font-semibold">{option.code}</bdi>
                  <span className="min-w-0 flex-1 text-xs wrap-break-word text-muted-foreground">
                    {option.name}
                  </span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

export { DefaultVersionCard }
