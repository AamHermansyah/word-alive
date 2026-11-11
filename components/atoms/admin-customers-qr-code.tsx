import { cn } from "@/lib/utils"

/**
 * Decorative QR pattern for the authenticator set-up screen, drawn as one SVG
 * path (no library). It has the real anatomy of a version 2 symbol (three
 * finder squares, timing lines, an alignment square) and a fixed pseudo-random
 * body, so it is identical on the server and the client. It is a stand-in
 * for the code a real backend would issue.
 */
const SIZE = 25

function finder(x: number, y: number) {
  // Distance from the centre of a 7x7 finder: ring 3 dark, 2 light, 0-1 dark.
  const ring = Math.max(Math.abs(x - 3), Math.abs(y - 3))
  return ring !== 2
}

function alignment(x: number, y: number) {
  const ring = Math.max(Math.abs(x - 2), Math.abs(y - 2))
  return ring !== 1
}

function buildModules() {
  let seed = 0x5eed1234
  const next = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const dark: boolean[][] = []
  for (let y = 0; y < SIZE; y++) {
    const row: boolean[] = []
    for (let x = 0; x < SIZE; x++) {
      const inTopLeft = x < 8 && y < 8
      const inTopRight = x >= SIZE - 8 && y < 8
      const inBottomLeft = x < 8 && y >= SIZE - 8
      if (inTopLeft) row.push(x < 7 && y < 7 ? finder(x, y) : false)
      else if (inTopRight)
        row.push(x > SIZE - 8 && y < 7 ? finder(x - (SIZE - 7), y) : false)
      else if (inBottomLeft)
        row.push(x < 7 && y > SIZE - 8 ? finder(x, y - (SIZE - 7)) : false)
      else if (x >= 16 && x <= 20 && y >= 16 && y <= 20)
        row.push(alignment(x - 16, y - 16))
      else if (y === 6) row.push(x % 2 === 0)
      else if (x === 6) row.push(y % 2 === 0)
      else row.push(next() > 0.5)
    }
    dark.push(row)
  }
  return dark
}

const PATH = buildModules()
  .flatMap((row, y) =>
    row.map((isDark, x) => (isDark ? `M${x} ${y}h1v1h-1z` : ""))
  )
  .join("")

function AdminCustomersQrCode({
  className,
  label = "QR code for your authenticator app",
}: {
  className?: string
  label?: string
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="-2 -2 29 29"
      shapeRendering="crispEdges"
      // Always a white tile with dark modules, in both themes, so it stays scannable.
      className={cn("rounded-lg bg-navy-foreground text-navy", className)}
    >
      <path d={PATH} fill="currentColor" />
    </svg>
  )
}

export { AdminCustomersQrCode }
