import type { Metadata } from "next"

import { PaymentResultTemplate } from "@/components/templates/payment-result-template"
import { firstParam, parseBilling, parsePlanId } from "@/lib/onboarding"

export const metadata: Metadata = { title: "Payment" }

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string | string[]
    plan?: string | string[]
    billing?: string | string[]
  }>
}) {
  const { status, plan, billing } = await searchParams
  return (
    <PaymentResultTemplate
      status={firstParam(status) === "failed" ? "failed" : "success"}
      planId={parsePlanId(firstParam(plan))}
      billing={parseBilling(firstParam(billing))}
    />
  )
}
