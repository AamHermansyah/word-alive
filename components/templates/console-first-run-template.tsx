import { MicFirstRunBoard } from "@/components/organisms/mic-first-run-board"
import { Topbar } from "@/components/organisms/topbar"

/** First run of the live console: allow the microphone, keep the tab open. */
function ConsoleFirstRunTemplate() {
  return (
    <>
      <Topbar title="Live console" subtitle="First run and microphone" />
      <MicFirstRunBoard />
    </>
  )
}

export { ConsoleFirstRunTemplate }
