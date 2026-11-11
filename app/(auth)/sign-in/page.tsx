import type { Metadata } from "next"

import { SignInTemplate } from "@/components/templates/sign-in-template"

export const metadata: Metadata = { title: "Sign in" }

export default function SignInPage() {
  return <SignInTemplate />
}
