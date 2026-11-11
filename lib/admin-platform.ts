/** Small pure helpers for the content / platform admin pages. */

/* ----------------------------- validation ---------------------------------- */

export function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

/** "https://wordalive.app/path" -> "wordalive.app"; empty when it is not a URL. */
export function hostFromUrl(value: string): string {
  try {
    return new URL(value.trim()).host
  } catch {
    return ""
  }
}

/** The brand part of a page title: "WordAlive: your church…" -> "WordAlive". */
export function siteNameFromTitle(title: string): string {
  const [first] = title.split(/\s*[:|–—-]\s+/)
  return first.trim()
}

/** "john.doe@church.org" -> "John Doe". */
export function nameFromEmail(email: string): string {
  const local = email.trim().split("@")[0] ?? ""
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

/* ----------------------------- thresholds ---------------------------------- */

/** 85 -> "0.85" */
export function formatThreshold(percent: number): string {
  return (percent / 100).toFixed(2)
}

/**
 * Reads what an admin typed into a threshold box. "0.85" and "85" both mean
 * 85 %; returns null when it is not a number between 0 and 100 %.
 */
export function parseThreshold(input: string): number | null {
  const text = input.trim().replace(",", ".")
  if (text === "" || Number.isNaN(Number(text))) return null
  const value = Number(text)
  const percent = value <= 1 ? value * 100 : value
  if (percent < 0 || percent > 100) return null
  return Math.round(percent)
}

/* -------------------------------- CSV -------------------------------------- */

function csvCell(value: string): string {
  // A cell that starts with = + - @ would run as a formula in Excel / Sheets.
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe
}

export function toCsv(rows: string[][]): string {
  return rows.map((row) => row.map(csvCell).join(",")).join("\r\n")
}

/** Starts a browser download of a text file. Client only. */
export function downloadTextFile(
  filename: string,
  content: string,
  type = "text/csv;charset=utf-8"
) {
  // The BOM makes Excel read the file as UTF-8 (arrows, accents).
  const blob = new Blob(["﻿", content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

/* -------------------------------- HTML ------------------------------------- */

const ALLOWED_TAGS = new Set([
  "H1",
  "H2",
  "H3",
  "P",
  "DIV",
  "BR",
  "B",
  "STRONG",
  "I",
  "EM",
  "UL",
  "OL",
  "LI",
  "A",
])

/** Parses `html` into a detached element (browser only). */
function parse(html: string): HTMLElement | null {
  if (typeof document === "undefined") return null
  const root = document.createElement("div")
  root.innerHTML = html
  return root
}

/**
 * The browser's own serialisation of `html`, so two strings that mean the
 * same markup compare equal. On the server it returns the text unchanged.
 */
export function canonicalHtml(html: string): string {
  const root = parse(html)
  return root ? root.innerHTML.trim() : html.trim()
}

export function htmlToText(html: string): string {
  const root = parse(html)
  return (root ? root.textContent ?? "" : html.replace(/<[^>]*>/g, "")).trim()
}

/**
 * Keeps only the formatting the editor can produce (headings, paragraphs,
 * lists, bold, italic and http(s)/mailto links) so the preview can render it.
 */
export function sanitizeHtml(html: string): string {
  const root = parse(html)
  if (!root) return ""

  const clean = (node: Element) => {
    for (const child of Array.from(node.children)) {
      if (!ALLOWED_TAGS.has(child.tagName)) {
        // Keep the text of an unknown element, drop the element itself.
        child.replaceWith(document.createTextNode(child.textContent ?? ""))
        continue
      }
      for (const attr of Array.from(child.attributes)) {
        const safeHref =
          child.tagName === "A" &&
          attr.name === "href" &&
          /^(https?:|mailto:)/i.test(attr.value.trim())
        if (!safeHref) child.removeAttribute(attr.name)
      }
      if (child.tagName === "A") {
        child.setAttribute("rel", "noopener noreferrer")
        child.setAttribute("target", "_blank")
      }
      clean(child)
    }
  }

  clean(root)
  return root.innerHTML
}
