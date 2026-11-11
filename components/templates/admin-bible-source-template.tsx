"use client"

import { Loader2Icon } from "lucide-react"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminBibleConnectionCard } from "@/components/organisms/admin-bible-connection-card"
import {
  AdminBibleReadinessCard,
  AdminBibleUsageCard,
} from "@/components/organisms/admin-bible-status-cards"
import { AdminBibleStorageCard } from "@/components/organisms/admin-bible-storage-card"
import { AdminBibleTestPassagesCard } from "@/components/organisms/admin-bible-test-passages-card"
import { Button } from "@/components/ui/button"
import { useAdminBibleSource } from "@/hooks/use-admin-bible-source"
import { BIBLE_SOURCE_USAGE } from "@/lib/data/admin-catalogue"

/**
 * Bible source (API) for NIV: connection, storage and attribution, the test
 * passages, and on the side the usage and the go-live checklist.
 */
function AdminBibleSourceTemplate() {
  const source = useAdminBibleSource()

  const readiness = [
    { id: "licence", label: "Licence recorded", done: true },
    {
      id: "connection",
      label: "Connection test passed",
      done: source.connectionPassed,
    },
    {
      id: "passages",
      label: "Test passages passed",
      done: source.passagesPassed,
    },
    {
      id: "attribution",
      label: "Attribution set",
      done: source.saved.attribution.trim() !== "",
    },
    { id: "fums", label: "Usage tracking (FUMS) data received", done: true },
  ]

  return (
    <>
      <AdminPageHeader
        title="NIV"
        subtitle={`Served from ${source.saved.provider} · not stored in our database`}
      >
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={source.testingConnection}
          onClick={source.testConnection}
        >
          {source.testingConnection ? (
            <>
              <Loader2Icon className="animate-spin" />
              Testing…
            </>
          ) : (
            "Test connection"
          )}
        </Button>
        <Button
          className="flex-1 sm:flex-none"
          disabled={!source.dirty}
          onClick={source.save}
        >
          Save changes
        </Button>
      </AdminPageHeader>

      <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-4 md:gap-5">
          <AdminBibleConnectionCard
            value={source.draft}
            onChange={source.change}
            errorFor={source.errorFor}
            onTouch={source.touch}
            replacingKey={source.replacingKey}
            newKey={source.newKey}
            onNewKeyChange={source.setNewKey}
            keyError={source.keyError}
            onStartReplacing={source.startReplacingKey}
            onCancelReplacing={source.cancelReplacingKey}
            onSaveKey={source.saveKey}
          />
          <AdminBibleStorageCard
            value={source.draft}
            onChange={source.change}
            errorFor={source.errorFor}
            onTouch={source.touch}
          />
          <AdminBibleTestPassagesCard
            states={source.passages}
            running={source.runningTests}
            onRun={source.runTests}
          />
        </div>

        <div className="grid min-w-0 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-1">
          <AdminBibleUsageCard {...BIBLE_SOURCE_USAGE} />
          <AdminBibleReadinessCard items={readiness} />
        </div>
      </div>
    </>
  )
}

export { AdminBibleSourceTemplate }
