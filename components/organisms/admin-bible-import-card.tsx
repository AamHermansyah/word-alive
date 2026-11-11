"use client"

import * as React from "react"
import { FileTextIcon, Loader2Icon } from "lucide-react"

import { FadeIn } from "@/components/atoms/fade-in"
import { AdminCatalogueCheckItem } from "@/components/molecules/admin-catalogue-check-item"
import { AdminCatalogueSelectField } from "@/components/molecules/admin-catalogue-select-field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BIBLE_IMPORT_ACCEPT } from "@/lib/data/admin-catalogue"
import { cn } from "@/lib/utils"
import type { AdminBibleImportReport } from "@/types/admin-catalogue"

/**
 * "Import a version": pick the version, drop its USFM / OSIS / USX file, attach
 * the licence document when the licence is not recorded yet, then run the
 * import. The last import and its report sit underneath.
 */
function AdminBibleImportCard({
  codes,
  code,
  onCodeChange,
  file,
  onFileChange,
  licenceFile,
  onLicenceFileChange,
  licenceRequired,
  running,
  onRunImport,
  lastImport,
}: {
  codes: string[]
  code: string
  onCodeChange: (code: string) => void
  file: File | null
  /** Returns whether the file was accepted. */
  onFileChange: (file: File | null) => boolean
  licenceFile: File | null
  onLicenceFileChange: (file: File | null) => void
  licenceRequired: boolean
  running: boolean
  onRunImport: () => void
  lastImport: AdminBibleImportReport
}) {
  const [dragging, setDragging] = React.useState(false)
  const [reportOpen, setReportOpen] = React.useState(false)
  const licenceInput = React.useRef<HTMLInputElement>(null)

  const licenceBadge = licenceFile
    ? { variant: "success", label: "Added" }
    : licenceRequired
      ? { variant: "warning", label: "Required" }
      : { variant: "success", label: "On file" }

  return (
    <Card className="min-w-0 gap-0">
      <CardContent className="flex flex-col">
        <h2 className="mb-3.5 text-sm font-bold md:text-[15px]">
          Import a version
        </h2>

        <AdminCatalogueSelectField
          id="bible-import-version"
          label="Version"
          value={code}
          options={codes}
          onValueChange={onCodeChange}
        />

        <label
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            onFileChange(event.dataTransfer.files[0] ?? null)
          }}
          className={cn(
            "my-3 flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border-[1.5px] border-dashed border-input px-3 py-5.5 text-center text-[13px] transition-colors has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50",
            dragging ? "border-brand bg-brand-soft/40" : "hover:bg-muted/60"
          )}
        >
          <input
            type="file"
            accept={BIBLE_IMPORT_ACCEPT}
            className="sr-only"
            onChange={(event) => {
              const accepted = onFileChange(event.target.files?.[0] ?? null)
              if (!accepted) event.target.value = ""
            }}
          />
          {file ? (
            <FadeIn
              key={file.name}
              className="flex flex-col items-center gap-0.5"
            >
              <span className="flex max-w-full items-center gap-1.5 font-semibold">
                <FileTextIcon aria-hidden="true" className="size-4 shrink-0" />
                <span className="min-w-0 wrap-break-word">
                  <bdi>{file.name}</bdi>
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                or choose a different file
              </span>
            </FadeIn>
          ) : (
            <>
              <span className="font-semibold">
                Drop a USFM, OSIS or USX file
              </span>
              <span className="text-xs text-muted-foreground">
                or choose a file
              </span>
            </>
          )}
        </label>

        <input
          ref={licenceInput}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          aria-label="Licence document"
          className="sr-only"
          onChange={(event) =>
            onLicenceFileChange(event.target.files?.[0] ?? null)
          }
        />
        <button
          type="button"
          onClick={() => licenceInput.current?.click()}
          className="mb-3.5 flex w-full items-center gap-2 rounded-md py-1 text-start text-[13px] outline-none hover:text-brand-text focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span className="min-w-0 flex-1 wrap-break-word">
            Licence document
            {licenceFile ? (
              <span className="block text-xs text-muted-foreground">
                <bdi>{licenceFile.name}</bdi>
              </span>
            ) : null}
          </span>
          <Badge
            key={licenceBadge.label}
            variant={licenceBadge.variant as "success" | "warning"}
            role="status"
          >
            {licenceBadge.label}
          </Badge>
        </button>

        <Button className="w-full" disabled={running} onClick={onRunImport}>
          {running ? (
            <>
              <Loader2Icon className="animate-spin" />
              Importing…
            </>
          ) : (
            "Run import"
          )}
        </Button>

        <FadeIn
          key={`${lastImport.code}-${lastImport.version}-${lastImport.when}`}
          className="mt-4 border-t border-border pt-3"
        >
          <div className="text-[13px] font-semibold">
            Last import:{" "}
            <bdi>
              {lastImport.code} {lastImport.version}
            </bdi>
          </div>
          <div className="mt-0.5 mb-1.5 text-xs text-muted-foreground">
            <bdi>
              Passed · {lastImport.books} books ·{" "}
              {lastImport.verses.toLocaleString("en-US")} verses
            </bdi>
          </div>
          <Button
            variant="link"
            className="h-auto px-0 py-2 text-[13px] text-brand-text hover:no-underline"
            onClick={() => setReportOpen(true)}
          >
            View report
          </Button>
        </FadeIn>
      </CardContent>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Import report:{" "}
              <bdi>
                {lastImport.code} {lastImport.version}
              </bdi>
            </DialogTitle>
            <DialogDescription>
              Imported on <bdi>{lastImport.when}</bdi>. Every check passed.
            </DialogDescription>
          </DialogHeader>
          <ul>
            <AdminCatalogueCheckItem state="done">
              <bdi>{lastImport.books}</bdi> books found, names match the canon
            </AdminCatalogueCheckItem>
            <AdminCatalogueCheckItem state="done">
              <bdi>{lastImport.verses.toLocaleString("en-US")}</bdi> verses,
              numbering is continuous
            </AdminCatalogueCheckItem>
            <AdminCatalogueCheckItem state="done">
              No empty or duplicated verses
            </AdminCatalogueCheckItem>
            <AdminCatalogueCheckItem state="done">
              Test passages match the reference text
            </AdminCatalogueCheckItem>
          </ul>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export { AdminBibleImportCard }
