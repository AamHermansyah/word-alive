"use client"

import * as React from "react"
import { toast } from "sonner"

import { isValidHttpUrl } from "@/lib/admin-platform"

export type RichFormat = "heading" | "bold" | "italic" | "list" | "link"
type ActiveFormats = Record<RichFormat, boolean>

const NONE: ActiveFormats = {
  heading: false,
  bold: false,
  italic: false,
  list: false,
  link: false,
}

/**
 * The browser may leave a list inside the paragraph it was made from
 * (<p><ul>…</ul></p>), which is invalid HTML and re-parses into empty
 * paragraphs. Lifts every list out of its paragraph.
 */
function liftListsOutOfParagraphs(root: HTMLElement) {
  root.querySelectorAll("p > ul, p > ol").forEach((list) => {
    const paragraph = list.parentElement
    if (paragraph) paragraph.replaceWith(...Array.from(paragraph.childNodes))
  })
}

/**
 * Light formatting for a `contentEditable` element (heading, bold, italic,
 * bullet list, link) through the browser's editing commands.
 *
 * The toolbar must not steal the selection: the last range inside the editor
 * is remembered and restored before every command, so it also works from the
 * keyboard and after the link field took focus.
 */
function useAdminPlatformRichText(
  editorRef: React.RefObject<HTMLDivElement | null>,
  onChange: (html: string) => void
) {
  const [active, setActive] = React.useState<ActiveFormats>(NONE)
  const [linkOpen, setLinkOpen] = React.useState(false)
  const rangeRef = React.useRef<Range | null>(null)

  const readFormats = React.useCallback((): ActiveFormats => {
    const selection = document.getSelection()
    const anchor = selection?.anchorNode ?? null
    const element = anchor instanceof Element ? anchor : anchor?.parentElement
    return {
      heading: String(document.queryCommandValue("formatBlock")).toLowerCase() === "h1",
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      list: document.queryCommandState("insertUnorderedList"),
      link: Boolean(element?.closest("a")),
    }
  }, [])

  React.useEffect(() => {
    // New blocks (Enter) should be paragraphs, not <div>s.
    document.execCommand("defaultParagraphSeparator", false, "p")

    function onSelectionChange() {
      const editor = editorRef.current
      const selection = document.getSelection()
      if (!editor || !selection || selection.rangeCount === 0) return
      if (!editor.contains(selection.anchorNode)) return
      rangeRef.current = selection.getRangeAt(0).cloneRange()
      const next = readFormats()
      setActive((current) =>
        JSON.stringify(current) === JSON.stringify(next) ? current : next
      )
    }

    document.addEventListener("selectionchange", onSelectionChange)
    return () => document.removeEventListener("selectionchange", onSelectionChange)
  }, [editorRef, readFormats])

  const emit = React.useCallback(() => {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }, [editorRef, onChange])

  const restoreSelection = React.useCallback(() => {
    const editor = editorRef.current
    if (!editor) return false
    editor.focus()
    const selection = document.getSelection()
    if (selection && rangeRef.current) {
      selection.removeAllRanges()
      selection.addRange(rangeRef.current)
    }
    return true
  }, [editorRef])

  const run = React.useCallback(
    (command: string, value?: string) => {
      if (!restoreSelection()) return
      document.execCommand(command, false, value)
      if (editorRef.current) liftListsOutOfParagraphs(editorRef.current)
      emit()
      setActive(readFormats())
    },
    [editorRef, emit, readFormats, restoreSelection]
  )

  function toggleHeading() {
    run("formatBlock", active.heading ? "p" : "h1")
  }

  function toggleLink() {
    if (active.link) {
      run("unlink")
      toast("Link removed")
      return
    }
    const range = rangeRef.current
    if (!range || range.collapsed) {
      toast("Select some text first", {
        description: "Then press Link to turn it into a link.",
      })
      return
    }
    setLinkOpen((open) => !open)
  }

  /** Returns an error message when the address is not usable. */
  function applyLink(url: string): string | null {
    const address = url.trim()
    if (!isValidHttpUrl(address) && !/^mailto:[^\s@]+@[^\s@]+$/i.test(address)) {
      return "Enter a full address such as https://wordalive.app/privacy."
    }
    run("createLink", address)
    setLinkOpen(false)
    return null
  }

  return {
    active,
    linkOpen,
    closeLink: () => setLinkOpen(false),
    toggleHeading,
    toggleBold: () => run("bold"),
    toggleItalic: () => run("italic"),
    toggleList: () => run("insertUnorderedList"),
    toggleLink,
    applyLink,
    emit,
  }
}

export { useAdminPlatformRichText }
