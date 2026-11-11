"use client"

import { FormField } from "@/components/molecules/form-field"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"

type LegalTocEntry = { id: string; label: string }

/**
 * "On this page" list of a legal page. The entry for the section being read is
 * highlighted as the page scrolls, and every entry scrolls to its section.
 * Phones get a dropdown (as in the mockup), tablets a two-column list and
 * desktop a single column (the template makes the card sticky from `xl`).
 */
function LegalToc({ entries }: { entries: readonly LegalTocEntry[] }) {
  const { active, jumpTo } = useActiveSection(entries.map((entry) => entry.id))
  const activeEntry = entries.find((entry) => entry.id === active) ?? entries[0]

  return (
    <Card className="min-w-0 gap-0 py-4 md:py-5">
      <CardContent>
        <div className="md:hidden">
          <FormField label="On this page" htmlFor="legal-toc">
            <Select
              value={activeEntry?.id ?? ""}
              onValueChange={(id) => id && jumpTo(id)}
            >
              <SelectTrigger id="legal-toc" className="w-full">
                <SelectValue>
                  {(id: string) => (
                    <bdi>{entries.find((entry) => entry.id === id)?.label}</bdi>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  {entries.map((entry) => (
                    <SelectItem key={entry.id} value={entry.id}>
                      <bdi>{entry.label}</bdi>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <nav aria-label="On this page" className="hidden md:block">
          <p className="mb-2 text-sm font-bold">On this page</p>
          <ol className="grid gap-x-6 md:grid-cols-2 xl:grid-cols-1">
            {entries.map((entry) => {
              const isActive = entry.id === active
              return (
                <li key={entry.id} className="min-w-0">
                  <a
                    href={`#${entry.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      jumpTo(entry.id)
                    }}
                    className={cn(
                      "flex min-h-9 items-center py-1 text-sm wrap-break-word no-underline",
                      isActive
                        ? "font-bold text-brand-text"
                        : "text-sidebar-foreground hover:text-foreground"
                    )}
                  >
                    <bdi>{entry.label}</bdi>
                  </a>
                </li>
              )
            })}
          </ol>
        </nav>
      </CardContent>
    </Card>
  )
}

export { LegalToc }
export type { LegalTocEntry }
