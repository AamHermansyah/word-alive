"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import {
  AdminPlatformLegalDiscardDialog,
  AdminPlatformLegalPreviewDialog,
} from "@/components/organisms/admin-platform-legal-dialogs"
import { AdminPlatformLegalEditorCard } from "@/components/organisms/admin-platform-legal-editor-card"
import {
  AdminPlatformLegalProvidersNote,
  AdminPlatformLegalPublishCard,
  AdminPlatformLegalVersionsCard,
} from "@/components/organisms/admin-platform-legal-side-cards"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminPlatformLegal } from "@/hooks/use-admin-platform-legal"
import { LEGAL_TABS } from "@/lib/data/admin-platform"
import type { LegalDocId } from "@/types/admin-platform"

/** Legal pages: one tab per document, the editor beside versions and publish options. */
function AdminPlatformLegalTemplate() {
  const legal = useAdminPlatformLegal()
  const { doc } = legal
  const pendingLabel =
    LEGAL_TABS.find((tab) => tab.id === legal.pendingId)?.label ?? ""
  const activeLabel =
    LEGAL_TABS.find((tab) => tab.id === legal.activeId)?.label ?? ""

  return (
    <>
      <AdminPageHeader
        title="Legal pages"
        subtitle="Edit what visitors and customers see"
      />

      <Tabs
        value={legal.activeId}
        onValueChange={(value) => legal.selectTab(value as LegalDocId)}
        className="gap-4 md:gap-5"
      >
        <TabsList
          variant="line"
          className="h-auto w-full flex-wrap justify-start gap-x-0.5 border-b border-border p-0 group-data-horizontal/tabs:h-auto sm:gap-x-1.5"
        >
          {LEGAL_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="h-auto flex-none rounded-none px-2.5 py-2.5 text-[13px] font-semibold whitespace-normal text-muted-foreground after:bg-brand group-data-horizontal/tabs:after:-bottom-px group-data-horizontal/tabs:after:h-0.75 hover:text-foreground sm:px-3.5 sm:text-sm data-active:text-foreground"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value={legal.activeId}
          className="grid gap-4 md:gap-5 lg:grid-cols-[640fr_316fr] lg:items-start"
        >
          <AdminPlatformLegalEditorCard
            docKey={`${doc.id}-${doc.revision}`}
            title={doc.title}
            initialHtml={doc.html}
            draftVersion={legal.draftVersion}
            onTitleChange={(title) => legal.patchActive({ title })}
            onHtmlChange={(html) => legal.patchActive({ html })}
          />

          <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-1">
            <AdminPlatformLegalVersionsCard
              published={doc.published}
              history={doc.history}
              draftVersion={legal.draftVersion}
              draftState={legal.draftState}
            />
            <AdminPlatformLegalPublishCard
              docId={doc.id}
              emailUsers={doc.emailUsers}
              askToAccept={doc.askToAccept}
              effectiveDate={doc.effectiveDate}
              effectiveError={legal.effectiveError}
              onEmailUsersChange={(emailUsers) =>
                legal.patchActive({ emailUsers })
              }
              onAskToAcceptChange={(askToAccept) =>
                legal.patchActive({ askToAccept })
              }
              onEffectiveDateChange={legal.setEffectiveDate}
            />
            <div className="md:col-span-2 lg:col-span-1">
              <AdminPlatformLegalProvidersNote />
            </div>
            <div className="grid grid-cols-2 gap-2 md:col-span-2 md:grid-cols-3 lg:col-span-1 lg:grid-cols-2">
              <Button variant="outline" onClick={legal.saveDraft}>
                Save draft
              </Button>
              <Button
                variant="outline"
                onClick={() => legal.setPreviewOpen(true)}
              >
                Preview
              </Button>
              <Button
                className="col-span-2 h-11.5 md:col-span-1 lg:col-span-2"
                disabled={!legal.canPublish}
                onClick={legal.publish}
              >
                Publish v{legal.draftVersion}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <AdminPlatformLegalDiscardDialog
        open={legal.pendingId !== null}
        from={activeLabel}
        to={pendingLabel}
        onKeepEditing={legal.keepEditing}
        onDiscard={legal.discardAndSwitch}
      />
      <AdminPlatformLegalPreviewDialog
        open={legal.previewOpen}
        onOpenChange={legal.setPreviewOpen}
        title={doc.title}
        html={doc.html}
        draftVersion={legal.draftVersion}
      />
    </>
  )
}

export { AdminPlatformLegalTemplate }
