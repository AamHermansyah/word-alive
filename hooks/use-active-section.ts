"use client"

import * as React from "react"

/**
 * Scroll-spy for a page made of anchored sections: returns the id of the
 * section being read, and `jumpTo` to scroll to one (and mark it active at
 * once, so the list does not flicker through the sections it passes).
 *
 * An IntersectionObserver watches a band near the top of the viewport; the
 * last section touching that band is the active one. At the very bottom of
 * the page the last section wins, since a short final section may never reach
 * the band.
 */
function useActiveSection(ids: readonly string[]) {
  const key = ids.join("|")
  const [active, setActive] = React.useState(ids[0] ?? "")
  const locked = React.useRef(false)
  const unlockTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const list = key ? key.split("|") : []
    const elements = list
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    const visible = new Set<string>()

    function apply() {
      if (locked.current) return
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom && window.scrollY > 0) {
        setActive(list[list.length - 1])
        return
      }
      const current = [...list].reverse().find((id) => visible.has(id))
      if (current) {
        setActive(current)
        return
      }
      // Nothing touches the band (above the first section, or past the last
      // one): use the last section that has already scrolled above it.
      const passed = elements.filter(
        (element) => element.getBoundingClientRect().top <= window.innerHeight * 0.3
      )
      setActive((passed[passed.length - 1] ?? elements[0]).id)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        apply()
      },
      { rootMargin: "-10% 0px -70% 0px" }
    )
    elements.forEach((element) => observer.observe(element))
    window.addEventListener("scroll", apply, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", apply)
    }
  }, [key])

  React.useEffect(
    () => () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current)
    },
    []
  )

  const jumpTo = React.useCallback((id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    setActive(id)
    locked.current = true
    if (unlockTimer.current) clearTimeout(unlockTimer.current)
    unlockTimer.current = setTimeout(() => {
      locked.current = false
    }, 900)

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    })
    window.history.replaceState(null, "", `#${id}`)
  }, [])

  return { active, jumpTo }
}

export { useActiveSection }
