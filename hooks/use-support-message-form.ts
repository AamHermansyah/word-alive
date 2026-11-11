"use client"

import * as React from "react"
import { toast } from "sonner"

import { isValidEmail } from "@/lib/onboarding"

export type SupportMessageValues = {
  name: string
  email: string
  message: string
}

export type SupportMessageField = keyof SupportMessageValues

type Errors = Partial<Record<SupportMessageField, string>>

const EMPTY: SupportMessageValues = { name: "", email: "", message: "" }

/** Shortest message we accept, so "hi" does not reach support. */
const MIN_MESSAGE_LENGTH = 10

function validate(values: SupportMessageValues): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = "Enter your name."
  if (!values.email.trim()) errors.email = "Enter your email address."
  else if (!isValidEmail(values.email))
    errors.email = "Enter a valid email address, like name@church.org."
  if (values.message.trim().length < MIN_MESSAGE_LENGTH)
    errors.message = `Tell us a little more (at least ${MIN_MESSAGE_LENGTH} characters).`
  return errors
}

/**
 * State of the homepage "Send us a message" form. An error shows once its
 * field has been left, or after the first send attempt; a valid form "sends"
 * (no backend: a short delay, then a toast) and resets. Typing again after a
 * send clears the confirmation.
 */
function useSupportMessageForm() {
  const [values, setValues] = React.useState<SupportMessageValues>(EMPTY)
  const [touched, setTouched] = React.useState<
    Partial<Record<SupportMessageField, boolean>>
  >({})
  const [attempted, setAttempted] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">(
    "idle"
  )
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const errors = validate(values)
  const visibleError = (field: SupportMessageField) =>
    touched[field] || attempted ? errors[field] : undefined

  function setValue(field: SupportMessageField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (status === "sent") setStatus("idle")
  }

  function markTouched(field: SupportMessageField) {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    setAttempted(true)

    const firstInvalid = (["name", "email", "message"] as const).find(
      (field) => errors[field]
    )
    if (firstInvalid) {
      const control = event.currentTarget.elements.namedItem(firstInvalid)
      if (control instanceof HTMLElement) control.focus()
      return
    }

    setStatus("sending")
    timer.current = setTimeout(() => {
      toast.success("Message sent", {
        description: "Thanks, we will reply to your email soon.",
      })
      setValues(EMPTY)
      setTouched({})
      setAttempted(false)
      setStatus("sent")
    }, 700)
  }

  return { values, status, visibleError, setValue, markTouched, submit }
}

export { useSupportMessageForm }
