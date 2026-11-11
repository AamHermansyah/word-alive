import { DataDeleteCard } from "@/components/organisms/data-delete-card"
import { DataExportCard } from "@/components/organisms/data-export-card"
import { Topbar } from "@/components/organisms/topbar"
import { DATA_EXPORT } from "@/lib/data/account"
import { INITIAL_SETTINGS } from "@/lib/data/settings"

/**
 * Export and delete the church's data.
 *   desktop: export | delete side by side
 *   tablet and phone: export, then delete
 */
function AccountDataTemplate() {
  const { email } = INITIAL_SETTINGS.account

  return (
    <>
      <Topbar
        title="Your data"
        subtitle="Export or delete your information"
      />

      <div className="flex flex-col gap-4 md:gap-5 xl:flex-row xl:items-start">
        <DataExportCard
          email={email}
          lastExport={DATA_EXPORT}
          className="xl:flex-1"
        />
        <DataDeleteCard email={email} className="xl:flex-1" />
      </div>
    </>
  )
}

export { AccountDataTemplate }
