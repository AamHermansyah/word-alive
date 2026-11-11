import { ConfirmEmailCard } from "@/components/organisms/confirm-email-card"

/** Step 2 of 2: the emailed code. `next` is where a confirmed code leads. */
function ConfirmEmailTemplate({ next }: { next: string }) {
  return <ConfirmEmailCard next={next} />
}

export { ConfirmEmailTemplate }
