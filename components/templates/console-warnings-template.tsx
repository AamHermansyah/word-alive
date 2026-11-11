import { ConsoleBanner } from "@/components/molecules/console-banner"
import { Topbar } from "@/components/organisms/topbar"
import { CONSOLE_BANNERS } from "@/lib/data/console"

/**
 * Every warning and degraded-mode notice of the live console. One column on
 * phones and tablet; on desktop the list splits in two columns (first half on
 * the start side), each as tall as its own banners.
 */
function ConsoleWarningsTemplate() {
  const split = Math.ceil(CONSOLE_BANNERS.length / 2)
  const columns = [
    CONSOLE_BANNERS.slice(0, split),
    CONSOLE_BANNERS.slice(split),
  ]

  return (
    <>
      <Topbar title="Live console" subtitle="Warnings and degraded modes" />
      <div className="grid gap-3 md:gap-3.5 xl:grid-cols-2 xl:items-start xl:gap-5">
        {columns.map((banners, index) => (
          <div key={index} className="flex min-w-0 flex-col gap-3 md:gap-3.5">
            {banners.map((banner) => (
              <ConsoleBanner key={banner.id} banner={banner} />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export { ConsoleWarningsTemplate }
