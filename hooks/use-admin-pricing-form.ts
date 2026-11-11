"use client"

import * as React from "react"
import { toast } from "sonner"

import { pricingStore } from "@/lib/admin-catalogue-store"
import {
  describePricing,
  pricingFieldId,
  pricingHistoryEntry,
} from "@/lib/admin-catalogue-pricing"
import { validateAdminNumber } from "@/lib/admin-catalogue-validation"
import { CURRENT_ADMIN } from "@/lib/data/navigation"
import type {
  AdminBillingSettings,
  AdminDeviceSettings,
  AdminPlanId,
  AdminPricingTier,
  AdminPricingValues,
  AdminTrialSettings,
} from "@/types/admin-catalogue"

import { useAdminCatalogueStore } from "./use-admin-catalogue-store"

/**
 * State of the "Plans and pricing" form: an editable draft over the saved
 * values, number validation, dirty tracking and the save + history flow.
 *
 * Errors are shown once a field has been left (or after a save attempt), not
 * while the admin is still typing the first character.
 */
export function useAdminPricingForm() {
  const { values: saved, history } = useAdminCatalogueStore(pricingStore)
  const [draft, setDraft] = React.useState<AdminPricingValues>(saved)
  const [touched, setTouched] = React.useState<ReadonlySet<string>>(new Set())
  const [submitted, setSubmitted] = React.useState(false)

  const errors = React.useMemo(() => {
    const found: Record<string, string> = {}
    for (const field of describePricing(draft)) {
      if (!field.enabled || !field.rule || typeof field.value !== "string")
        continue
      const message = validateAdminNumber(field.value, field.rule)
      if (message) found[field.path] = message
    }
    return found
  }, [draft])

  const dirty = React.useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(saved),
    [draft, saved]
  )

  /** The error to print under a field, if it should be visible yet. */
  const errorFor = (path: string) =>
    submitted || touched.has(path) ? errors[path] : undefined

  const touch = (path: string) =>
    setTouched((current) => new Set(current).add(path))

  function setTier(id: AdminPlanId, patch: Partial<AdminPricingTier>) {
    setDraft((current) => ({
      ...current,
      tiers: { ...current.tiers, [id]: { ...current.tiers[id], ...patch } },
    }))
  }

  function setBilling(patch: Partial<AdminBillingSettings>) {
    setDraft((current) => ({
      ...current,
      billing: { ...current.billing, ...patch },
    }))
  }

  function setDevices(patch: Partial<AdminDeviceSettings>) {
    setDraft((current) => ({
      ...current,
      devices: { ...current.devices, ...patch },
    }))
  }

  function setTrial(patch: Partial<AdminTrialSettings>) {
    setDraft((current) => ({
      ...current,
      trial: { ...current.trial, ...patch },
    }))
  }

  function save() {
    setSubmitted(true)
    const [firstInvalid, ...rest] = Object.keys(errors)

    if (firstInvalid) {
      const count = rest.length + 1
      toast.error("Some values need fixing", {
        description: `${count} ${count === 1 ? "field is" : "fields are"} empty or not a valid number.`,
      })
      document.getElementById(pricingFieldId(firstInvalid))?.focus()
      return
    }

    const entry = pricingHistoryEntry(CURRENT_ADMIN.name, saved, draft)
    pricingStore.set((current) => ({
      values: draft,
      history: entry ? [entry, ...current.history] : current.history,
    }))
    setSubmitted(false)
    setTouched(new Set())
    toast.success("Pricing saved", {
      description: "New subscriptions and the landing page use these values.",
    })
  }

  return {
    draft,
    dirty,
    history,
    errorFor,
    touch,
    setTier,
    setBilling,
    setDevices,
    setTrial,
    save,
  }
}
