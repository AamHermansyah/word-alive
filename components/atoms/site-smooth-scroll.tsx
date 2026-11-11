"use client"

import * as React from "react"

/**
 * Turns on smooth scrolling for the page that renders it, so the header,
 * footer and "On this page" anchor links glide instead of jumping.
 *
 * `scroll-behavior` only affects the page scroll when it is set on the root
 * element, and `globals.css` does not set it, so this sets it while the page
 * is mounted. It is removed in a layout-effect cleanup (before Next scrolls
 * the next page to the top), so moving to another page never animates.
 * `prefers-reduced-motion` is honoured by the global reduced-motion rule.
 */
function SiteSmoothScroll() {
  React.useLayoutEffect(() => {
    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = "smooth"
    return () => {
      root.style.scrollBehavior = previous
    }
  }, [])

  return null
}

export { SiteSmoothScroll }
