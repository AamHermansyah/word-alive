import { TermsUpdateDialog } from "@/components/organisms/terms-update-dialog"
import { Card } from "@/components/ui/card"
import { TERMS_UPDATE } from "@/lib/data/account"

/**
 * The app frame dimmed behind the terms gate. The two empty cards stand for
 * the page the church was heading to (the mockup draws them blank); the gate
 * itself is the dialog.
 */
function TermsUpdateTemplate() {
  return (
    <>
      <div aria-hidden="true" className="flex flex-col gap-4 md:gap-5">
        <Card className="min-h-50" />
        <Card className="min-h-65" />
      </div>
      <TermsUpdateDialog terms={TERMS_UPDATE} />
    </>
  )
}

export { TermsUpdateTemplate }
