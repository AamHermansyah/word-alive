/**
 * Helpers for the console family: the audience link, its QR-like picture and
 * the text sizing of the projector screens. Plain functions (no "use client"),
 * so server and client components can both import them.
 */

/** Mock public address of the audience screen; the code is the last segment. */
const AUDIENCE_ORIGIN = "https://app.wordalive.app/present"

export const INITIAL_AUDIENCE_CODE = "K7F2-93QA"

/** Unambiguous characters only (no 0/O, 1/I), like a real access code. */
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

export function audienceUrl(code: string) {
  return `${AUDIENCE_ORIGIN}/${code}`
}

/** A fresh "K7F2-93QA" style code. Never equal to `previous`. */
export function createAudienceCode(previous?: string) {
  const pick = () =>
    CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  const group = () => Array.from({ length: 4 }, pick).join("")
  let code = `${group()}-${group()}`
  while (code === previous) code = `${group()}-${group()}`
  return code
}

// ---- QR-like picture ------------------------------------------------------

/** Modules per side (QR version 2). */
export const QR_SIZE = 25

/** 32-bit FNV-1a hash, so the same code always draws the same picture. */
function hashSeed(seed: string) {
  let hash = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

/** Small seeded PRNG (mulberry32). */
function seededRandom(seed: number) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Deterministic QR-looking matrix for a code: three finder squares, timing
 * lines, an alignment square and seeded data modules. It is a stand-in for the
 * real QR encoder (it does not scan); `true` means a dark module.
 */
export function buildQrMatrix(seed: string): boolean[][] {
  const n = QR_SIZE
  const random = seededRandom(hashSeed(seed))
  const grid: boolean[][] = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => random() < 0.5)
  )

  const place = (row: number, col: number, dark: boolean) => {
    grid[row][col] = dark
  }

  // Finder patterns with their one-module separator.
  const finder = (top: number, left: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const row = top + r
        const col = left + c
        if (row < 0 || col < 0 || row >= n || col >= n) continue
        const ring = Math.max(Math.abs(r - 3), Math.abs(c - 3))
        place(row, col, ring !== 2 && ring <= 3)
      }
    }
  }
  finder(0, 0)
  finder(0, n - 7)
  finder(n - 7, 0)

  // Timing patterns.
  for (let i = 8; i < n - 8; i++) {
    place(6, i, i % 2 === 0)
    place(i, 6, i % 2 === 0)
  }

  // Alignment pattern (5x5) bottom right.
  const centre = n - 7
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const ring = Math.max(Math.abs(r), Math.abs(c))
      place(centre + r, centre + c, ring !== 1)
    }
  }

  return grid
}

/** SVG path for every dark module: one `M x y h1 v1 h-1 z` square each. */
export function qrPath(matrix: boolean[][]) {
  let path = ""
  matrix.forEach((line, row) => {
    line.forEach((dark, col) => {
      if (dark) path += `M${col} ${row}h1v1h-1z`
    })
  })
  return path
}

// ---- Projector text sizing --------------------------------------------------

/**
 * Serif stack for scripture and lyrics. Georgia first (the mockup), then
 * serifs that cover other scripts, so a passage in Arabic, Amharic or Hindi
 * does not fall back to a sans font. Pair it with a `lang` attribute.
 */
export const SCRIPTURE_FONT_STACK =
  'Georgia, "Times New Roman", "Noto Serif", "Noto Naskh Arabic", "Noto Serif Ethiopic", "Noto Serif Devanagari", serif'

export type ProjectorTextSize = "base" | "medium" | "long" | "huge"

/**
 * How big the slide text may be for a passage of this many characters. The
 * size itself is a `clamp()` of the screen width in the component; this only
 * picks the step, so a 300-character verse never runs off a 16:9 screen.
 */
export function projectorTextSize(
  length: number,
  steps: readonly [number, number, number]
): ProjectorTextSize {
  if (length <= steps[0]) return "base"
  if (length <= steps[1]) return "medium"
  if (length <= steps[2]) return "long"
  return "huge"
}
