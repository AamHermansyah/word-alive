import { SetupStepItem } from "@/components/molecules/setup-step-item"
import { SetupVersePreview } from "@/components/molecules/setup-verse-preview"
import { SetupFormCard } from "@/components/organisms/setup-form-card"
import { SETUP_STEPS, SETUP_VERSE } from "@/lib/data/onboarding"

/**
 * Step 1 of 2. On desktop the form card sits beside "What happens next" and a
 * sample slide; on tablets and phones the three steps drop below the form as
 * one short row (stacked on phones).
 */
function SetupTemplate() {
  return (
    <div className="flex w-full flex-col items-center gap-7 xl:max-w-249 xl:flex-row xl:justify-center xl:gap-14">
      <SetupFormCard />

      <aside className="flex w-full max-w-181 min-w-0 flex-col gap-5.5 xl:w-85 xl:max-w-none xl:shrink-0">
        <h2 className="hidden text-base font-bold xl:block">
          What happens next
        </h2>
        <ol className="flex flex-col gap-4 md:flex-row md:gap-5 md:*:flex-1 xl:flex-col xl:gap-5.5 xl:*:flex-none">
          {SETUP_STEPS.map((step, index) => (
            <SetupStepItem key={step.id} step={step} number={index + 1} />
          ))}
        </ol>
        <div className="hidden flex-col gap-5.5 xl:flex">
          <SetupVersePreview
            text={SETUP_VERSE.text}
            reference={SETUP_VERSE.reference}
            version={SETUP_VERSE.version}
          />
          <p className="text-xs text-muted-foreground">
            <bdi>Your audience screen, in your own Bible version.</bdi>
          </p>
        </div>
      </aside>
    </div>
  )
}

export { SetupTemplate }
