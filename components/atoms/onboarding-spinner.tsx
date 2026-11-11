import { cn } from "@/lib/utils"

/** The ring that spins while a payment is being confirmed. */
function OnboardingSpinner({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mx-auto size-14 shrink-0 animate-spin rounded-full border-5 border-border border-t-success motion-reduce:animate-none",
        className
      )}
    />
  )
}

export { OnboardingSpinner }
