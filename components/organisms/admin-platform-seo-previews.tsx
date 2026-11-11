import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import { Button } from "@/components/ui/button"
import { SEO_SHARE_IMAGES } from "@/lib/data/admin-platform"
import { cn } from "@/lib/utils"

/** How the page looks as a search result; follows the form as you type. */
function AdminPlatformSearchPreviewCard({
  host,
  title,
  description,
}: {
  host: string
  title: string
  description: string
}) {
  return (
    <AdminPlatformPanel title="Search result preview">
      <div className="text-xs wrap-break-word text-muted-foreground">
        <bdi>{host || "your-domain"}</bdi>
      </div>
      <div className="mt-0.5 mb-1 text-base wrap-break-word text-[#1a4da8] md:text-lg dark:text-[#8ab4f8]">
        {title.trim() || "Untitled page"}
      </div>
      <p className="text-[13px] leading-normal wrap-break-word text-foreground/80">
        {description.trim() || "No description yet. Search engines will pick a snippet themselves."}
      </p>
    </AdminPlatformPanel>
  )
}

/** The link card shown when the page is shared; the artwork can be replaced. */
function AdminPlatformSocialPreviewCard({
  host,
  siteName,
  imageIndex,
  onReplaceImage,
}: {
  host: string
  siteName: string
  imageIndex: number
  onReplaceImage: () => void
}) {
  const image = SEO_SHARE_IMAGES[imageIndex % SEO_SHARE_IMAGES.length]

  return (
    <AdminPlatformPanel title="Social share preview">
      <div className="rounded-xl border border-border">
        <div
          key={image.id}
          className={cn(
            "flex min-h-32.5 animate-in items-center justify-center rounded-t-[11px] px-4 py-4 text-center font-serif text-lg font-bold duration-300 fade-in-0 motion-reduce:animate-none md:text-[22px]",
            image.className
          )}
        >
          Your church presentation, automatically.
        </div>
        <div className="p-3">
          <div className="text-xs wrap-break-word text-muted-foreground">
            <bdi>{host || "your-domain"}</bdi>
          </div>
          <div className="text-sm font-bold wrap-break-word">
            {siteName || "Untitled page"}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <Button variant="outline" size="sm" onClick={onReplaceImage}>
          Replace image
        </Button>
        <span className="text-xs text-muted-foreground">
          <bdi>1200 × 630</bdi>
        </span>
      </div>
    </AdminPlatformPanel>
  )
}

export { AdminPlatformSearchPreviewCard, AdminPlatformSocialPreviewCard }
