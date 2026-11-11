"use client"

import Link from "next/link"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminPlatformUnsavedFlag } from "@/components/molecules/admin-platform-unsaved-flag"
import { AdminPlatformSeoChecksCard } from "@/components/organisms/admin-platform-seo-checks-card"
import { AdminPlatformSeoFormCard } from "@/components/organisms/admin-platform-seo-form-card"
import {
  AdminPlatformSearchPreviewCard,
  AdminPlatformSocialPreviewCard,
} from "@/components/organisms/admin-platform-seo-previews"
import { Button } from "@/components/ui/button"
import { useAdminPlatformSeo } from "@/hooks/use-admin-platform-seo"
import { hostFromUrl, siteNameFromTitle } from "@/lib/admin-platform"

/** Landing SEO: the form on the start side, live previews and checks beside it. */
function AdminPlatformSeoTemplate() {
  const seo = useAdminPlatformSeo()
  const host = hostFromUrl(seo.values.canonicalUrl)

  return (
    <>
      <AdminPageHeader
        title="Landing SEO"
        subtitle="How the landing page appears in search and when shared"
      >
        <AdminPlatformUnsavedFlag show={seo.dirty} />
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          nativeButton={false}
          render={<Link href="/" target="_blank" />}
        >
          View landing page
        </Button>
        <Button className="flex-1 sm:flex-none" onClick={seo.save}>
          Save changes
        </Button>
      </AdminPageHeader>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-[600fr_356fr] lg:items-start">
        <AdminPlatformSeoFormCard
          values={seo.values}
          errors={seo.errors}
          onChange={seo.patch}
        />
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-1">
          <AdminPlatformSearchPreviewCard
            host={host}
            title={seo.values.title}
            description={seo.values.description}
          />
          <AdminPlatformSocialPreviewCard
            host={host}
            siteName={siteNameFromTitle(seo.values.title)}
            imageIndex={seo.values.shareImage}
            onReplaceImage={seo.replaceImage}
          />
          <AdminPlatformSeoChecksCard
            checks={seo.checks}
            className="md:col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </>
  )
}

export { AdminPlatformSeoTemplate }
