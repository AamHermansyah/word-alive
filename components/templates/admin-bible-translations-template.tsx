"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminBibleImportCard } from "@/components/organisms/admin-bible-import-card"
import { AdminBibleTranslationsCard } from "@/components/organisms/admin-bible-translations-card"
import { useAdminBibleTranslations } from "@/hooks/use-admin-bible-translations"

/** Bible translations: the list of versions beside the import form. */
function AdminBibleTranslationsTemplate() {
  const bible = useAdminBibleTranslations()

  return (
    <>
      <AdminPageHeader
        title="Bible translations"
        subtitle="A version goes live only with a recorded licence"
      />

      <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <AdminBibleTranslationsCard
          versions={bible.versions}
          onLiveChange={bible.setLive}
        />
        <AdminBibleImportCard
          codes={bible.versions.map((version) => version.code)}
          code={bible.importCode}
          onCodeChange={bible.setImportCode}
          file={bible.file}
          onFileChange={bible.chooseFile}
          licenceFile={bible.licenceFile}
          onLicenceFileChange={bible.setLicenceFile}
          licenceRequired={bible.licenceRequired}
          running={bible.running}
          onRunImport={bible.runImport}
          lastImport={bible.lastImport}
        />
      </div>
    </>
  )
}

export { AdminBibleTranslationsTemplate }
