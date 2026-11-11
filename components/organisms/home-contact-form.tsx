"use client"

import { FadeIn } from "@/components/atoms/fade-in"
import { CheckMarkIcon } from "@/components/atoms/icons"
import { FormField } from "@/components/molecules/form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  useSupportMessageForm,
  type SupportMessageField,
} from "@/hooks/use-support-message-form"

/** Inline error under a field; renders nothing (and no empty alert) when valid. */
function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <FieldError id={id}>
      <bdi>{message}</bdi>
    </FieldError>
  )
}

/**
 * "Send us a message" form of the support section. Fields validate when left
 * and again on send; a good send shows a toast and a short confirmation.
 */
function HomeContactForm() {
  const form = useSupportMessageForm()

  /** Props that wire one control to its value and its error text. */
  function bind(field: SupportMessageField) {
    const id = `support-${field}`
    const error = form.visibleError(field)
    return {
      id,
      error,
      props: {
        id,
        name: field,
        value: form.values[field],
        onChange: (
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => form.setValue(field, event.target.value),
        onBlur: () => form.markTouched(field),
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${id}-error` : undefined,
      },
    }
  }

  const name = bind("name")
  const email = bind("email")
  const message = bind("message")

  return (
    <Card className="min-w-0 gap-0 [--card-spacing:--spacing(7)]">
      <CardContent>
        <form
          noValidate
          onSubmit={form.submit}
          aria-labelledby="support-form-title"
        >
          <h3 id="support-form-title" className="mb-3.5 text-lg font-bold">
            Send us a message
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5">
            <FormField label="Name" htmlFor={name.id}>
              <Input {...name.props} type="text" autoComplete="name" />
              <ErrorText id={`${name.id}-error`} message={name.error} />
            </FormField>
            <FormField label="Email" htmlFor={email.id}>
              <Input {...email.props} type="email" autoComplete="email" />
              <ErrorText id={`${email.id}-error`} message={email.error} />
            </FormField>
          </div>

          <FormField label="Message" htmlFor={message.id} className="mt-3">
            <Textarea {...message.props} className="min-h-27.5" />
            <ErrorText id={`${message.id}-error`} message={message.error} />
          </FormField>

          <Button
            type="submit"
            size="lg"
            disabled={form.status === "sending"}
            className="mt-4 h-12 w-full text-[15px]"
          >
            {form.status === "sending" ? "Sending…" : "Send message"}
          </Button>

          <div role="status" aria-live="polite">
            {form.status === "sent" ? (
              <FadeIn className="mt-3 flex items-center gap-2 text-sm font-semibold text-success">
                <CheckMarkIcon className="size-4.5" />
                <bdi>Thanks! Your message is on its way.</bdi>
              </FadeIn>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export { HomeContactForm }
