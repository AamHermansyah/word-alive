import type { SetupStep } from "@/types/onboarding"

/**
 * One numbered step of "What happens next". Phones and tablets get the short
 * line (the steps sit in one compact row), desktop gets the long one.
 */
function SetupStepItem({ step, number }: { step: SetupStep; number: number }) {
  return (
    <li className="flex min-w-0 gap-3.5">
      <span
        aria-hidden="true"
        className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground"
      >
        {number}
      </span>
      <div className="min-w-0">
        <div className="text-[15px] font-bold wrap-break-word">
          <bdi>{step.title}</bdi>
        </div>
        <div className="mt-0.5 text-[13px] wrap-break-word text-muted-foreground">
          <bdi className="xl:hidden">{step.short}</bdi>
          <bdi className="hidden xl:inline">{step.long}</bdi>
        </div>
      </div>
    </li>
  )
}

export { SetupStepItem }
