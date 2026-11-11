import { BrandMark } from "@/components/atoms/brand-mark"
import { AdminCustomersLoginCard } from "@/components/organisms/admin-customers-login-card"

/**
 * Admin sign-in, a split screen with no console chrome. A brand-coloured
 * panel on the start side (a compact header on phones) with the "Admin
 * console" blurb pinned to its bottom; the sign-in card centred on the rest.
 */
function AdminLoginTemplate() {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <section className="flex flex-col gap-6 bg-brand p-5 text-brand-foreground md:w-80 md:shrink-0 md:gap-8 md:p-8 xl:w-130 xl:p-12">
        <div className="flex items-center gap-2.5">
          <BrandMark className="bg-brand-foreground text-brand" />
          <span className="text-lg font-bold">WordAlive</span>
        </div>

        <div className="md:mt-auto">
          <p className="text-2xl font-bold md:text-3xl xl:text-4xl xl:leading-[1.2]">
            <bdi>Admin console</bdi>
          </p>
          <p className="mt-2 max-w-95 text-sm leading-normal md:mt-3 xl:text-[15px] xl:leading-normal">
            <bdi>
              Manage customers, pricing, content and the AI services behind
              every live service.
            </bdi>
          </p>
        </div>
      </section>

      <main className="flex min-w-0 flex-1 items-center justify-center p-4 pb-24 md:p-8">
        <AdminCustomersLoginCard />
      </main>
    </div>
  )
}

export { AdminLoginTemplate }
