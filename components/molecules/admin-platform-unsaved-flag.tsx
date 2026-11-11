import { FadeIn } from "@/components/atoms/fade-in"
import { Badge } from "@/components/ui/badge"

/** "Unsaved changes" pill for the page header; renders nothing while the form is clean. */
function AdminPlatformUnsavedFlag({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <FadeIn role="status" className="w-full sm:w-auto">
      <Badge variant="warning">Unsaved changes</Badge>
    </FadeIn>
  )
}

export { AdminPlatformUnsavedFlag }
