"use client"

import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminPlatformUnsavedFlag } from "@/components/molecules/admin-platform-unsaved-flag"
import { AdminPlatformAiProviderCard } from "@/components/organisms/admin-platform-ai-provider-card"
import {
  AdminPlatformThresholdsCard,
  AdminPlatformUsageCard,
} from "@/components/organisms/admin-platform-ai-side-cards"
import { AdminPlatformConnectionTest } from "@/components/organisms/admin-platform-connection-test"
import { Button } from "@/components/ui/button"
import { useAdminPlatformAi } from "@/hooks/use-admin-platform-ai"
import {
  REASONING_PROVIDERS,
  SPEECH_PROVIDERS,
} from "@/lib/data/admin-platform"

/** AI providers: the two services on the start side, thresholds and usage beside them. */
function AdminPlatformAiTemplate() {
  const ai = useAdminPlatformAi()
  const testing = ai.test.status === "testing"

  return (
    <>
      <AdminPageHeader
        title="AI providers"
        subtitle="Model IDs are configuration, checked against each provider’s docs"
      >
        <AdminPlatformUnsavedFlag show={ai.dirty} />
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={testing}
          onClick={ai.runTest}
        >
          {testing ? "Testing…" : "Test connection"}
        </Button>
        <Button className="flex-1 sm:flex-none" onClick={ai.save}>
          Save changes
        </Button>
      </AdminPageHeader>

      <AdminPlatformConnectionTest test={ai.test} onDismiss={ai.dismissTest} />

      <div className="grid gap-4 md:gap-5 lg:grid-cols-[600fr_356fr] lg:items-start">
        <div className="flex min-w-0 flex-col gap-4 md:gap-5">
          <AdminPlatformAiProviderCard
            idPrefix="ai-speech"
            title="Speech recognition"
            providers={SPEECH_PROVIDERS}
            config={ai.values.speech}
            testing={testing}
            modelError={ai.errors.speechModel}
            fallbackError={ai.errors.speechFallback}
            apiKey={{
              secret: ai.values.speechKey,
              error: ai.errors.speechKey,
              onReplace: ai.startKeyReplacement,
              onChange: ai.setKeyValue,
              onCancel: ai.cancelKeyReplacement,
            }}
            onChange={ai.patchSpeech}
          />
          <AdminPlatformAiProviderCard
            idPrefix="ai-reasoning"
            title="Reasoning and extraction"
            providers={REASONING_PROVIDERS}
            config={ai.values.reasoning}
            testing={testing}
            modelError={ai.errors.reasoningModel}
            fallbackError={ai.errors.reasoningFallback}
            onChange={ai.patchReasoning}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-1">
          <AdminPlatformThresholdsCard
            thresholds={ai.values.thresholds}
            error={ai.errors.thresholds}
            onChange={ai.setThreshold}
          />
          <AdminPlatformUsageCard />
        </div>
      </div>
    </>
  )
}

export { AdminPlatformAiTemplate }
