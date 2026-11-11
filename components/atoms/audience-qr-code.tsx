import { buildQrMatrix, QR_SIZE, qrPath } from "@/lib/console"
import { cn } from "@/lib/utils"

/**
 * QR-style picture of the audience link, drawn as one inline SVG path. It is
 * deterministic (the same code always draws the same picture) and stands in
 * for a real encoder. Always dark on white, whatever the theme, so it keeps
 * the contrast a scanner needs.
 */
function AudienceQrCode({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  const path = qrPath(buildQrMatrix(code))

  return (
    <svg
      role="img"
      aria-label={`QR code for audience link ${code}`}
      viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
      shapeRendering="crispEdges"
      className={cn("block size-full bg-white text-navy", className)}
    >
      <path d={path} fill="currentColor" />
    </svg>
  )
}

export { AudienceQrCode }
