/**
 * Browser-side file downloads for the admin console (CSV exports, recovery
 * codes). Client only: call it from event handlers, never during render.
 */

/** Quote a cell and neutralise spreadsheet formulas ("=", "+", "-", "@"). */
function csvCell(value: string | number) {
  let text = String(value)
  if (/^[=+\-@]/.test(text)) text = `'${text}`
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(header: string[], rows: (string | number)[][]) {
  return [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n")
}

/** Hand `content` to the browser as a downloaded file. */
export function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  // Give the browser a moment to start the download before freeing the blob.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadCsv(
  filename: string,
  header: string[],
  rows: (string | number)[][]
) {
  // The BOM makes Excel read the file as UTF-8.
  downloadFile(filename, `﻿${toCsv(header, rows)}`, "text/csv;charset=utf-8")
}
