"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminPlatformUnsavedFlag } from "@/components/molecules/admin-platform-unsaved-flag"
import { AdminPlatformLanguagesCard } from "@/components/organisms/admin-platform-languages-card"
import { Button } from "@/components/ui/button"
import { useAdminPlatformLanguages } from "@/hooks/use-admin-platform-languages"

/** Languages: provider support, the WordAlive test and the Enabled switches. */
function AdminPlatformLanguagesTemplate() {
  const languages = useAdminPlatformLanguages()

  return (
    <>
      <AdminPageHeader
        title="Languages"
        subtitle="A language goes live only when a provider lists it and it passes the WordAlive test"
      >
        <AdminPlatformUnsavedFlag show={languages.dirty} />
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={languages.evaluating}
          onClick={languages.runEvaluation}
        >
          {languages.evaluating ? "Running…" : "Run evaluation"}
        </Button>
        <Button className="flex-1 sm:flex-none" onClick={languages.save}>
          Save changes
        </Button>
      </AdminPageHeader>

      <AdminPlatformLanguagesCard
        rows={languages.rows}
        evaluating={languages.evaluating}
        onToggle={languages.setEnabled}
      />
    </>
  )
}

export { AdminPlatformLanguagesTemplate }
