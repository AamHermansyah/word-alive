"use client"

import * as React from "react"

import { FadeIn } from "@/components/atoms/fade-in"
import { AdminPlatformFieldNote } from "@/components/atoms/admin-platform-field-note"
import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdminPlatformRichText } from "@/hooks/use-admin-platform-rich-text"
import { cn } from "@/lib/utils"

/**
 * The document body. The browser owns the DOM while you type (React only
 * seeds it once, which keeps the caret where it is); the parent remounts it
 * with a new `key` whenever the text has to be reloaded from state.
 */
function AdminPlatformEditable({
  ref,
  initialHtml,
  label,
  onHtmlChange,
}: {
  ref: React.Ref<HTMLDivElement>
  initialHtml: string
  label: string
  onHtmlChange: (html: string) => void
}) {
  const [seed] = React.useState(initialHtml)

  return (
    <div
      ref={ref}
      role="textbox"
      aria-multiline="true"
      aria-label={label}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      dangerouslySetInnerHTML={{ __html: seed }}
      onInput={(event) => onHtmlChange(event.currentTarget.innerHTML)}
      onPaste={(event) => {
        // Paste as plain text so no foreign markup gets into a legal document.
        event.preventDefault()
        document.execCommand(
          "insertText",
          false,
          event.clipboardData.getData("text/plain")
        )
      }}
      className={cn(
        "min-h-40 text-sm leading-[1.6] wrap-break-word outline-none",
        "[&_a]:text-brand-text [&_a]:underline [&_a]:underline-offset-2",
        "[&_h1]:mb-1.5 [&_h1]:text-xl [&_h1]:font-bold md:[&_h1]:text-[22px]",
        "[&_h2]:font-bold [&_h3]:font-bold",
        "[&_p]:mb-3 [&_p:last-child]:mb-0",
        "[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:ps-5"
      )}
    />
  )
}

const TOOL_BUTTON =
  "px-3 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"

/** Legal document editor: formatting toolbar, title, "Draft vN" label and the body. */
function AdminPlatformLegalEditorCard({
  docKey,
  title,
  initialHtml,
  draftVersion,
  onTitleChange,
  onHtmlChange,
}: {
  /** Changes when the document (or its saved text) is reloaded. */
  docKey: string
  title: string
  initialHtml: string
  draftVersion: number
  onTitleChange: (title: string) => void
  onHtmlChange: (html: string) => void
}) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const rich = useAdminPlatformRichText(editorRef, onHtmlChange)
  const [linkUrl, setLinkUrl] = React.useState("")
  const [linkError, setLinkError] = React.useState<string | null>(null)

  function submitLink(event: React.FormEvent) {
    event.preventDefault()
    const error = rich.applyLink(linkUrl)
    setLinkError(error)
    if (!error) setLinkUrl("")
  }

  return (
    <AdminPlatformPanel className="lg:min-h-140">
      {/* Keep the text selection while a toolbar button is pressed. */}
      <div
        role="toolbar"
        aria-label="Formatting"
        className="mb-3.5 flex flex-wrap gap-2"
        onMouseDown={(event) => event.preventDefault()}
      >
        <Button
          variant="outline"
          size="sm"
          aria-label="Heading"
          aria-pressed={rich.active.heading}
          className={TOOL_BUTTON}
          onClick={rich.toggleHeading}
        >
          H1
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label="Bold"
          aria-pressed={rich.active.bold}
          className={TOOL_BUTTON}
          onClick={rich.toggleBold}
        >
          B
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label="Italic"
          aria-pressed={rich.active.italic}
          className={TOOL_BUTTON}
          onClick={rich.toggleItalic}
        >
          I
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label="Bulleted list"
          aria-pressed={rich.active.list}
          className={TOOL_BUTTON}
          onClick={rich.toggleList}
        >
          List
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label={rich.active.link ? "Remove link" : "Link"}
          aria-pressed={rich.active.link}
          className={TOOL_BUTTON}
          onClick={rich.toggleLink}
        >
          Link
        </Button>
      </div>

      {rich.linkOpen ? (
        <FadeIn className="mb-3.5">
          <form onSubmit={submitLink} noValidate className="flex flex-wrap items-start gap-2">
            <div className="flex min-w-0 flex-1 basis-56 flex-col gap-1">
              <Input
                autoFocus
                type="url"
                inputMode="url"
                placeholder="https://wordalive.app/privacy"
                aria-label="Link address"
                aria-invalid={Boolean(linkError)}
                value={linkUrl}
                onChange={(event) => {
                  setLinkUrl(event.target.value)
                  setLinkError(null)
                }}
              />
              {linkError ? <AdminPlatformFieldNote>{linkError}</AdminPlatformFieldNote> : null}
            </div>
            <Button type="submit">Add link</Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                rich.closeLink()
                setLinkError(null)
              }}
            >
              Cancel
            </Button>
          </form>
        </FadeIn>
      ) : null}

      <div className="min-w-0 rounded-xl border border-border p-4 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 md:min-h-110 md:p-5">
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          aria-label="Document title"
          placeholder="Document title"
          className="w-full min-w-0 bg-transparent text-xl font-bold outline-none placeholder:text-muted-foreground md:text-[22px]"
        />
        <div className="mt-1.5 mb-3.5 text-xs text-muted-foreground">
          Draft v{draftVersion}
        </div>
        <AdminPlatformEditable
          key={docKey}
          ref={editorRef}
          initialHtml={initialHtml}
          label="Document text"
          onHtmlChange={onHtmlChange}
        />
      </div>
    </AdminPlatformPanel>
  )
}

export { AdminPlatformLegalEditorCard }
