import type { Metadata } from "next"

import { ConfirmEmailTemplate } from "@/components/templates/confirm-email-template"
import { AFTER_SETUP } from "@/lib/data/onboarding"
import { firstParam, safeNextPath } from "@/lib/onboarding"

export const metadata: Metadata = { title: "Confirm your email" }

export default async function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>
}) {
  const { next } = await searchParams
  return (
    <ConfirmEmailTemplate next={safeNextPath(firstParam(next), AFTER_SETUP)} />
  )
}
