"use client"

import { toast } from "sonner"

import { useAdminPlatformDraft } from "@/hooks/use-admin-platform-draft"
import { isValidHttpUrl } from "@/lib/admin-platform"
import {
  SEO_DEFAULTS,
  SEO_DESCRIPTION_LIMIT,
  SEO_DESCRIPTION_MIN,
  SEO_SHARE_IMAGES,
  SEO_TITLE_LIMIT,
  SEO_TITLE_MIN,
} from "@/lib/data/admin-platform"
import type { SeoSettings } from "@/types/admin-platform"

export type SeoErrors = Partial<
  Record<"title" | "description" | "canonicalUrl", string>
>

export type SeoCheck = {
  id: string
  status: "ok" | "warning" | "error"
  label: string
}

function lengthCheck(
  id: string,
  noun: "Title" | "Description",
  length: number,
  min: number,
  max: number
): SeoCheck {
  if (length > max) return { id, status: "error", label: `${noun} is too long` }
  if (length < min) return { id, status: "warning", label: `${noun} is too short` }
  return { id, status: "ok", label: `${noun} length is good` }
}

export function validateSeo(values: SeoSettings): SeoErrors {
  const errors: SeoErrors = {}
  const title = values.title.trim()
  const description = values.description.trim()

  if (!title) errors.title = "Add a page title."
  else if (title.length > SEO_TITLE_LIMIT)
    errors.title = `Keep the title to ${SEO_TITLE_LIMIT} characters or search engines cut it off.`

  if (!description) errors.description = "Add a meta description."
  else if (description.length > SEO_DESCRIPTION_LIMIT)
    errors.description = `Keep the description to ${SEO_DESCRIPTION_LIMIT} characters or search engines cut it off.`

  if (!isValidHttpUrl(values.canonicalUrl))
    errors.canonicalUrl = "Enter a full address such as https://wordalive.app/."

  return errors
}

/** Landing SEO form: values, live validation, the checks list and Save. */
function useAdminPlatformSeo() {
  const { values, dirty, patch, commit } = useAdminPlatformDraft(SEO_DEFAULTS)

  const errors = validateSeo(values)
  const hasErrors = Object.keys(errors).length > 0

  const checks: SeoCheck[] = [
    lengthCheck(
      "title",
      "Title",
      values.title.trim().length,
      SEO_TITLE_MIN,
      SEO_TITLE_LIMIT
    ),
    lengthCheck(
      "description",
      "Description",
      values.description.trim().length,
      SEO_DESCRIPTION_MIN,
      SEO_DESCRIPTION_LIMIT
    ),
    { id: "image", status: "ok", label: "Share image is set" },
    values.indexable
      ? { id: "sitemap", status: "ok", label: "Sitemap is published" }
      : {
          id: "sitemap",
          status: "warning",
          label: "Search engines are told not to index this page",
        },
  ]

  function replaceImage() {
    patch({ shareImage: (values.shareImage + 1) % SEO_SHARE_IMAGES.length })
    toast.success("Share image replaced", {
      description: "1200 × 630 · save to publish it.",
    })
  }

  function save() {
    if (hasErrors) {
      toast.error("Fix the highlighted fields first", {
        description: Object.values(errors)[0],
      })
      return
    }
    if (!dirty) {
      toast("Nothing to save", {
        description: "Landing SEO has no unsaved changes.",
      })
      return
    }
    commit()
    toast.success("Landing SEO saved", {
      description: "Search results and social previews update within a day.",
    })
  }

  return { values, dirty, errors, checks, patch, replaceImage, save }
}

export { useAdminPlatformSeo }
