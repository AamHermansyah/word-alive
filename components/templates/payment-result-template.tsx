import {
  PaymentResultCard,
  type PaymentStatus,
} from "@/components/organisms/payment-result-card"
import type { BillingPeriod, PlanId } from "@/types/onboarding"

/** One centred card that moves from "Confirming" to the payment's outcome. */
function PaymentResultTemplate({
  status,
  planId,
  billing,
}: {
  status: PaymentStatus
  planId: PlanId
  billing: BillingPeriod
}) {
  return <PaymentResultCard status={status} planId={planId} billing={billing} />
}

export { PaymentResultTemplate }
